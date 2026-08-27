import { getRtVehiclePositionsData } from "../gtfs/gtfs";
import { importRtVehiclePositionsDataToDatabase } from "../database/Actions";

export default async function cronJobGetRtVehiclePositionsDataAndStoreInDatabase() {
	await getRtVehiclePositionsData()
		.then((data) => {
			importRtVehiclePositionsDataToDatabase(data);
		})
		.catch((error) => {
			console.error("getRtVehiclePositionsDataAndStoreInDatabase() > error = ", error);
		});
}