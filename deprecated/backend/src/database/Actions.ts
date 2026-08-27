import { filterRtVehiclePositionsFromRtVehicleDataData } from "../gtfs/gtfs";
import { RtVehicleData } from "../gtfs/RtVehicleData";
import {
	Routes,
	RtVehiclePositions,
	RtVehiclePositionsBatches,
	Stops,
	Tables
} from "./database.types";
import { databaseClient, TABLE_NAME, prisma } from "./database";
import { QueryData } from "@supabase/supabase-js";
import { ControlledTransaction, Kysely } from "kysely";

async function importRtVehiclePositionsDataToDatabase(data: RtVehicleData) {
	console.log("database > importRtVehiclePositionsDataToDatabase() > Starting to insert data");

	await insertRtVehiclePositions(filterRtVehiclePositionsFromRtVehicleDataData(data));

	console.log("database > importRtVehiclePositionsDataToDatabase() > Finished inserting the `data`");
}

/* Stops */

// async function getAllStops(): Promise<Stops[]> {
// 	console.log("\nDatabase > getAllStops() > \n");

// 	return await database
// 		.selectFrom("stops")
// 		.selectAll()
// 		.execute();
// }
/* Queries & Types */
const queryGetAllRoutes = databaseClient
	.from(TABLE_NAME.ROUTES)
	.select();
	
type QueryGetAllRoutes = QueryData<typeof queryGetAllRoutes>;

const queryGetLastBatchId = databaseClient
	.from(TABLE_NAME.VEHICLE_POSITIONS_BATCHES)
	.select("batch_id")
	.order("batch_id", { ascending: false })
	.limit(1)

type QueryGetLastBatchId = QueryData<typeof queryGetLastBatchId>;


/* Routes */
async function getAllRoutes(): Promise<QueryGetAllRoutes> {
	console.log("\nDatabase > getAllRoutes() > \n");

	prisma.

	const { data, error } = await queryGetAllRoutes;
	
	if (error) throw error;

	return data;
}

/* RtVehiclePositions */

async function getLastBatchOfRtVehiclePositions(): Promise<RtVehiclePositions[]> {
	console.log("\nDatabase > getLastBatchOfRtVehiclePositions() > ");

	const queryGetLastBatchOfVehiclePositions = databaseClient
	.from(TABLE_NAME.VEHICLE_POSITIONS)
	.select()
	.eq("batch_id", await queryGetLastBatchId)

	// const lastBatchIdRow = await database
	// 	.selectFrom("rt_vehicle_positions_batches")
	// 	.select("batch_id")
	// 	.orderBy("batch_id", "desc")
	// 	.limit(1)
	// 	.execute();

	// console.log("lastBatchIdRow = ", lastBatchIdRow);

	// return await database
	// 	.selectFrom("rt_vehicle_positions")
	// 	.where("batch_id", "==", lastBatchIdRow as unknown as number)
	// 	.selectAll()
	// 	.execute();
}

type AllBatchesForDate = {
	date: number;
	batches: RtVehiclePositionsBatches[]
};

async function getAllBatchesOfRtPositionsForDate(date: Date): Promise<AllBatchesForDate> {
	const unixTimestampPreviousDayStart = new Date(date).setUTCHours(0, 0, 0, 0);

    const unixTimestampPreviousDayEnd = new Date(date).setUTCHours(23, 59, 59, 999);

	const batches = await database
		.selectFrom("rt_vehicle_positions_batches")
		.where("timestamp", '>=', unixTimestampPreviousDayStart)
		.where("timestamp", '<', unixTimestampPreviousDayEnd)
		.selectAll()
		.execute();

	const returnedAllBatchesForDate: AllBatchesForDate = {
		date: date.getTime(),
		batches
	};

	return returnedAllBatchesForDate;
}

async function insertRtVehiclePositions(rtVehiclePositions: RtVehiclePositions[] = []) {
	console.log("\n insertRtVehiclePositions() > rtVehiclePositions.length = ", rtVehiclePositions.length);

	// console.log("\n insertRtVehiclePositions() > rtVehiclePositions.length = ", rtVehiclePositions.length);
	// console.log("\n insertRtVehiclePositions() > rtVehiclePositions = ", rtVehiclePositions);

	// TODO: This should not be needed
	let filteredRtVehiclePositions = rtVehiclePositions.filter((item) => {
		return (
			!Number.isNaN(item.vehicle_id) &&
			!Number.isNaN(item.route_id)
		);
	});

	// console.log("filteredRtVehiclePositions.length = ", filteredRtVehiclePositions.length);

	// 1. We start a transaction
	const transaction = await database.startTransaction().execute();

	try {
		// 2. Count the existing batch rows, to know the `batch_id` of the one that will be created
		// const count = await countTotalOfRtVehiclePositionsBatches();
		const count = await countTotalOfRtVehiclePositionsBatches(transaction);

		// const { count } = await transaction
		// 	.selectFrom("rt_vehicle_positions_batches")
		// 	.select(db.fn.countAll().as("count"))
		// 	.executeTakeFirstOrThrow();

		// 3. Create the new `batch` row
		await transaction
		.insertInto("rt_vehicle_positions_batches")
		.values({
			batch_id: count,
			timestamp: Date.now()
		})
		.executeTakeFirstOrThrow();

		// 4. Add the *correct* `batch_id` to each `RtVehiclePositions`
		let filteredRtVehiclePositionsWithBatchId: RtVehiclePositions[] = [];

		filteredRtVehiclePositions.forEach(rtVehiclePositions => {
			filteredRtVehiclePositionsWithBatchId.push({
				...rtVehiclePositions,
				batch_id: count
			});
		});

		// 5. Insert the new rows
		await transaction
			.insertInto("rt_vehicle_positions")
			.values(filteredRtVehiclePositionsWithBatchId)
			.returning("vehicle_id")
			.executeTakeFirstOrThrow();

		// 6. Commit the transaction
		transaction.commit().execute();
	} catch (error) {
		console.log("\n insertRtVehiclePositions() > transaction commit failed | error = ", error);

		await transaction.rollback().execute();
	}
}

async function countTotalOfRtVehiclePositionsBatches(databaseOrTransaction: ControlledTransaction<DB, []> | Kysely<DB>): Promise<number> {
	const { count } = await databaseOrTransaction
		.selectFrom("rt_vehicle_positions_batches")
		.select(databaseOrTransaction.fn.countAll().as("count"))
		.executeTakeFirstOrThrow();

	return count as number;
}

export {
	getAllStops,

	getAllRoutes,

	getAllBatchesOfRtPositionsForDate,
	getLastBatchOfRtVehiclePositions,
	insertRtVehiclePositions,

	countTotalOfRtVehiclePositionsBatches,

	importRtVehiclePositionsDataToDatabase
};