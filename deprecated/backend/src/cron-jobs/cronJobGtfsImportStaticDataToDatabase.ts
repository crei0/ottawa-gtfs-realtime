import { GtfsImportStaticDataToDatabase } from "../gtfs/gtfs";

async function cronJobGtfsImportStaticDataToDatabase() {
	GtfsImportStaticDataToDatabase();
}

export default cronJobGtfsImportStaticDataToDatabase;