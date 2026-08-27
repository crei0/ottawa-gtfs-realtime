import cron from "node-cron";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

import {
	cronJobDownloadGtfsStaticFileThenUnzip,
	cronJobGtfsImportStaticDataToDatabase,
	cronJobGetRtVehiclePositionsDataAndStoreInDatabase,
	cronJobGenerateMapdStaticDataAndSaveItAsJsonFile,
	cronJobGeneratePreviousDayTimelineOfRtVehiclePositions
} from "./cronJobs"

async function initalizeApp() {
	dotenvExpand.expand(dotenv.config());

	try {
		await cronJobGenerateMapdStaticDataAndSaveItAsJsonFile();

		await cronJobGetRtVehiclePositionsDataAndStoreInDatabase();
	} catch (error) {
		throw error;
	}

	await cron.schedule(
		process.env.CRON_STATIC_GTFS_RETRIEVAL,
		async () => {
			console.info("initalizeApp() > Cron schedule starting > getting static GTFS file, unzipping, importing");
			await cronJobDownloadGtfsStaticFileThenUnzip();

			await cronJobGtfsImportStaticDataToDatabase();

			await cronJobGenerateMapdStaticDataAndSaveItAsJsonFile(); 

			await cronJobGeneratePreviousDayTimelineOfRtVehiclePositions();
		},
		{
			noOverlap: true
		}
	);

	await cron.schedule(
		process.env.CRON_RT_VEHICLE_POSITIONS_RETRIEVAL,
		async () => {
			console.info("\n initalizeApp() > Cron schedule starting > cronJobGetRtVehiclePositionsDataAndStoreInDatabase()");
			await cronJobGetRtVehiclePositionsDataAndStoreInDatabase();
		},
		{
			noOverlap: true
		}
	);
}

export default initalizeApp;