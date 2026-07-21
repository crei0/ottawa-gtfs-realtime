import https from 'node:https';
import { importGtfs, Config } from 'gtfs';

const gtfsConfig: Config = {
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

// Get GTFS-RT Vehicle positions file
function getRtVehiclePositionsData() {
	return new Promise((resolve, reject) => {
		// https://nextrip-public-api.azure-api.net/octranspo/gtfs-rt-vp/beta/v1/VehiclePositions?format=json
		// const url: String = `${process.env.OC_TRANSPO_BASE_URL}/gtfs-rt-vp/beta/v1/VehiclePositions?format=json`;

		const options = {
			hostname: process.env.OC_TRANSPO_DOMAIN,
			path: '/octranspo/gtfs-rt-vp/beta/v1/VehiclePositions?format=json',
			method: 'GET',
			headers: {
				'Ocp-Apim-Subscription-Key': process.env.OC_TRANSPO_DEV_PRIMARY_KEY,
				'Content-Type': 'application/json',
			},
		};

		https.get(options, (res) => {
			console.log('getRtVehiclePositionsData > statusCode:', res.statusCode);
			console.log('getRtVehiclePositionsData > headers:', res.headers);

			let responseBody = '';

			res.on('data', function (chunk) {
				responseBody = responseBody + chunk;
			});

			res.on('end', function () {
				if (res.statusCode == 200) {
					// console.log("Body :" + responseBody);
					console.log('getRtVehiclePositionsData > on end: 40');

					resolve(responseBody);
				}
			});

			res.on('error', (e) => {
				console.log('getRtVehiclePositionsData > on error:', e);

				reject(e);
			});
		});
	});
}

function importStaticData() {
	return importGtfs(gtfsConfig);
}

export {
	importStaticData,
	getRtVehiclePositionsData
};
