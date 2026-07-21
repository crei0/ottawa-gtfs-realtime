import {
    getRtVehiclePositionsData,
    importStaticData
} from "../gtfs/gtfs";

export async function getDataAndStoreInDatabase() {
	const rt_data = await getRtVehiclePositionsData();

	importStaticData();
}

