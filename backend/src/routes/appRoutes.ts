import express from "express";
import cron from 'node-cron';

import { testDatabaseConnection } from "../gtfs/database"
import {
	getRtVehiclePositionsData,
	importStaticData
} from "../gtfs/gtfs";
import { getDataAndStoreInDatabase } from "../cron-jobs/getDataAndSaveToDatabase";

function appRoutes() {
	const port = process.env.PORT;
	const app = express();

	cron.schedule(
		'*/5 * * * *', // Every 5 minutes (https://crontab.guru/every-5-minutes)
		async () => {
			console.log("appRoutes > Cron schedule starting");
			await getDataAndStoreInDatabase();
		},
		{
			noOverlap: true
		}
	);
	getDataAndStoreInDatabase();

	if (import.meta.env.PROD) {
		app.listen(port);
	}

	app.listen(port, () => {
		console.log(`Listening on port ${port}`);
	});

	app.get('/', (req, res) => {
		res.send('ottawa-gtfs-realtime-backend is running');
	});

	app.get('/data/', async (req, res) => {
		//res.send('doing getRtVehiclePositionsData()');

		var data = await getRtVehiclePositionsData();
		console.log('/gtfs 25 > data =', data);

		if (data) {
			console.log('/gtfs 27 ');
			res.json(data);
		} else {
			res.send('failed request'); // TODO: Fix me
		}
	});

	app.get('/gtfs/import-static-data', async (req, res) => {
		console.log('gtfs > import-static-data > start');
		
		importStaticData().then((data) => {
			console.log('gtfs > import-static-data > data >');
			console.log(data);
			res.send('gtfs > import-static-data > OK');
		}).catch((error) => {
			console.error(error);

			res.send('gtfs > import-static-data > ERROR');
		});

		console.log('gtfs > import-static-data > end');
	});

	app.get('/gtfs/test-database-connection', async (req, res) => {
		try {
			testDatabaseConnection();
			res.send("/gtfs/test-database-connection | OK");
		} catch(error) {
			res.json(error);
			// res.send('/gtfs/test-database-connection | failed');
		}
	});

	app.get('/gtfs/test', async (req, res) => {
		try {
			await getDataAndStoreInDatabase();

			res.send("/gtfs/test | OK");
		} catch(error) {
			res.json(error);
			// res.send('/gtfs/test failed');
		}
	});

	return app;
}

export default appRoutes;