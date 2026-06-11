import path from 'node:path';
import https from 'node:https';
import { importGtfs } from 'gtfs';
import { readFile } from 'fs/promises';

const config = JSON.parse(
	await readFile(path.join(import.meta.dirname, 'gtfs-config.json'), 'utf8')
);

// Get GTFS-RT Vehicle positions file
function getRtVehiclePositionsData(): Object {
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
			if (res.statusCode !== 200) {
				console.error("Api call failed with response code " + res.statusCode);
			} else {
				console.log("Body :" + responseBody);


			}
		});

		res.on('error', (e) => {
			console.log('getRtVehiclePositionsData > on error:', e);

			console.error(e);
		});
	});

	return {};
}

export default getRtVehiclePositionsData;

// try {
// 	await importGtfs(config);
// } catch (error) {
// 	console.error(error);
// }