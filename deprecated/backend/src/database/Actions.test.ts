import {
	describe,
	test,
	before,
	after,
	afterEach,
	MockFunctionCall
} from "node:test";
import assert from "node:assert";
import dotenv from "dotenv";

import { database, initializeDatabase } from "./database";
import {
	countTotalOfRtVehiclePositionsBatches,
	getAllRoutes,
	getLastBatchOfRtVehiclePositions,
	getAllStops,
	insertRtVehiclePositions
} from "./Actions";
import { Routes, RtVehiclePositions, Stops } from "./Database";

async function emptyTable(tableName: string) {
	await sql`truncate table ${sql.table(tableName)}`.execute(database);
}

async function insertNewRtVehiclePositionsBatches(numberOfBatches: number = 1) {
	let batches = [];
	
	for (let index = 1; index <= numberOfBatches; index++) {
		batches.push({
			batch_id: index,
			timestamp: 1000000000 + index
		});
	}

	await database
		.insertInto("rt_vehicle_positions_batches")
		.values(batches)
		.executeTakeFirstOrThrow();
}

// TODO: Flip `skip: true`
describe("Actions", { skip: false }, () => {
	before(async () => {
		dotenv.config({
			override: true
		});

		process.env.DATABASE_URL = process.env.DATABASE_TESTING_URL;

		// TODO: Test this

		await initializeDatabase();
	});

	afterEach(async () => {
		await emptyTable("rt_vehicle_positions");
		await emptyTable("rt_vehicle_positions_batches");
	});

	// after(async () => {
	// 	await database.schema.dropTable("rt_vehicle_positions").execute();
	// });

	describe("getAllRoutes()", () => {
		test("Get the data correctly", async () => {
			const expectedResult: Routes[] = [];

			const testResult: Routes[] = await getAllRoutes();

			assert.deepStrictEqual(testResult, expectedResult);
		});
	});

	describe("getLastBatchOfRtVehiclePositions()", () => {
		test("Get the data correctly", async () => {
			const expectedResult: RtVehiclePositions[] = [];

			const testResult: RtVehiclePositions[] = await getLastBatchOfRtVehiclePositions();

			assert.deepStrictEqual(testResult, expectedResult);
		});
	});

	describe("getAllStops()", () => {
		test("Get the data correctly", async () => {
			const expectedResult: Stops[] = [];

			const testResult: Stops[] = await getAllStops();

			assert.deepStrictEqual(testResult, expectedResult);
		});
	});

	describe("insertRtVehiclePositions()", () => {
		test("Get the data correctly", async () => {
			const expectedResult: RtVehiclePositions[] = [];

			await insertRtVehiclePositions(
				[
					{
						vehicle_id: 6594,
						latitude: 45.40919,
						longitude: -75.634155,
						speed: 0,
						bearing: 193,
						timestamp: 1781246415,
						route_id: 0,
						batch_id: -1
					},
					{
						vehicle_id: 4693,
						latitude: 45.31008,
						longitude: -75.73829,
						speed: 15.6463995,
						bearing: 157,
						timestamp: 1781246999,
						route_id: 75,
						batch_id: -1
					}
				]
			);

			const testResult: RtVehiclePositions[] = await getLastBatchOfRtVehiclePositions();

			assert.deepStrictEqual(testResult, expectedResult);
		});
	});

	describe("countTotalOfRtVehiclePositionsBatches()", () => {
		test("Get the count correctly", async () => {
			// Add 3 entries/rows to the `rt_vehicle_positions`
			const expectedResult: number = 3;

			insertNewRtVehiclePositionsBatches(expectedResult);

			const testResult = countTotalOfRtVehiclePositionsBatches(database);

			assert.strictEqual(testResult, expectedResult);
		});

		test("Remove all rows, and return the count of 0 (zero)", async () => {
			const expectedResult: number = 0;

			const testResult = countTotalOfRtVehiclePositionsBatches(database);

			assert.strictEqual(testResult, expectedResult);
		});
	});
});
