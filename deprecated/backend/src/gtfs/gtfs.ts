import https from 'node:https';
import { importGtfs, Config } from 'gtfs';

import { RtVehicleData } from './RtVehicleData';
import { RtVehiclePositions } from "../database/Database";

function getGtfsConfig(): Config {
	return {
		"agencies": [
			{
				"path": "/home/andreguedes/repositories/web/ottawa-gtfs-realtime/backend/oc_transpo",
				"exclude": [
					"shapes",
					"stop_times",
					"trips"
				]
			}
		],
		"sqlitePath": process.env.DATABASE_URL,
		"exportPath": "/backend/database/exports"
	}
}

function GtfsImportStaticDataToDatabase() {
	return importGtfs(getGtfsConfig());
}

// Get GTFS-RT Vehicle positions data
function getRtVehiclePositionsData(): Promise<RtVehicleData> {
	return new Promise((resolve, reject) => {
		const options = {
			hostname: process.env.OC_TRANSPO_DOMAIN,
			path: '/octranspo/gtfs-rt-vp/beta/v1/VehiclePositions?format=json',
			method: 'GET',
			headers: {
				'Ocp-Apim-Subscription-Key': process.env.OC_TRANSPO_DEV_PRIMARY_KEY,
				'Content-Type': 'application/json',
			},
		};

		console.info("gtfs > getRtVehiclePositionsData() > Starting to download `VehiclePositions`");

		const request = https.request(options, (response) => {
			let data = '';

			response.on('data', (chunk) => {
				data = data + chunk.toString();
			});

			response.on('end', () => {
				try {
					console.info("gtfs > getRtVehiclePositionsData() > Finished downloading `VehiclePositions`");
					
					const responseBody: RtVehicleData = JSON.parse(data);

					resolve(responseBody);
				} catch (error) {
					reject(error);
				}
			});
		});

		request.on("error", (error) => {
			reject(error);
		});

		request.end();
	});
}

function filterRtVehiclePositionsFromRtVehicleDataData(data: RtVehicleData): RtVehiclePositions[] {
	let returnedData: RtVehiclePositions[] = [];

	data.Entity.forEach(item => {
		if (!item.IsDeleted) {
			const vehicleId = parseInt(item.Vehicle.Vehicle.Id);
			const routeId = parseInt(item.Vehicle.Trip?.RouteId || "0");

			if (
				vehicleId &&
				!Number.isNaN(vehicleId) &&
				routeId &&
				!Number.isNaN(routeId)
			) {
				let current: RtVehiclePositions = {
					vehicle_id: vehicleId,
					latitude: item.Vehicle.Position.Latitude,
					longitude: item.Vehicle.Position.Longitude,
					speed: item.Vehicle.Position.Speed,
					bearing: item.Vehicle.Position.Bearing,
					timestamp: item.Vehicle.Timestamp,
					route_id: routeId,
					batch_id: -1
				}

				returnedData.push(current);
			}
		}
	});

	return returnedData;
}

export {
	GtfsImportStaticDataToDatabase,
	getRtVehiclePositionsData,
	filterRtVehiclePositionsFromRtVehicleDataData
};
