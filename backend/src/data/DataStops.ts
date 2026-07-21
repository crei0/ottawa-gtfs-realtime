import { db } from "../database/database";

export async function findAllStops() {
	return await db
		.selectFrom('stops')
		.select(["stop_id", "stop_lat", "stop_lon"])
		.execute()
}
