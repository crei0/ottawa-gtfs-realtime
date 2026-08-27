// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "jsr:@supabase/server@^1";

import { Tables } from "./database.types.ts";

interface Data {
	date: string;
	
	batches: Batches;
}

export interface Batches {
	[key: string]: VehiclePosition[]
}

export interface VehiclePosition {
	batch_id: number | null
	bearing: number | null
	latitude: number
	longitude: number | null
	route_id: string | null
	speed: number | null
	timestamp: string | null
	vehicle_id: number
}

/*
Optional request body
```json
{
	"date": "2026-08-20",
	"limit": 3
}
```
 */

export default {
	fetch: withSupabase({ auth: ["publishable", "secret"] }, async (req, ctx) => {
		const fileName: string = "yesterdayTimeline.json";
		const bucketName: string = "generated-files";
		
		let yearMonthDay: string = "";

		const { date, limit = 10000 } = await req.json() 

		if (date) {
			yearMonthDay = date;
		} else {
			const yesterdayDate: Date = new Date();
			yesterdayDate.setDate(yesterdayDate.getDate() - 1);

			yearMonthDay = `${yesterdayDate.getUTCFullYear()}-${yesterdayDate.getUTCMonth() + 1}-${yesterdayDate.getUTCDate()}`;
		}

		const { data: batches, errorBatch } = await ctx.supabase
			.from("vehicle_positions_batches")
			.select()
			.limit(limit)
			.gte("timestamp", `${yearMonthDay} 00:00`)
			.lte("timestamp", `${yearMonthDay} 23:59`)

		console.log('batches?.length =', batches.length);

		if (errorBatch) {
			console.error("errorBatch = ", errorBatch);

			throw errorBatch;
		}
		
		if (!batches) {
			console.error("no batches data = ", batches);

			throw new Error(`No batches data = ${batches}`);
		}

		const exportedData: Data = {
			date: yearMonthDay,
			batches: {}
		};

		await Promise.all(batches.map(async (batch: Tables<"vehicle_positions_batches">) => {
			const batchId: string = batch.id.toString() || "-1";
			
			const { data: positionsForBatch, errorPositionsForBatch } = await ctx.supabase
				.from("vehicle_positions")
				.select()
				.eq('batch_id', batchId);


			if (errorPositionsForBatch) {
				console.error("errorPositionsForBatch = ", errorPositionsForBatch);
				
				throw errorPositionsForBatch;
			}

			if (batchId != "-1") {
				console.log("positionsForBatch.length = ", positionsForBatch.length);
				
				exportedData.batches[batchId] = positionsForBatch;
			}
		}));

		// Try to save the json data on Supabase's Storage
		const fileBlob = new Blob(
			[JSON.stringify(exportedData)],
			{ type: "application/json" }
		);

		const { data: dataStorage, error: storageError } = await ctx.supabase.storage
			.from(bucketName)
			.upload(
				fileName,
				fileBlob,
				{
					contentType: "application/json",
					upsert: true
				}
			);

		if (storageError) {
			console.error("storageError = ", storageError);
			
			throw storageError;
		}

		// If everything went fine clean the data
		// TODO: 

		return Response.json({
			message: `Saved JSON correctly on ${dataStorage.fullPath}`,
			debug: `exportedData.batches.length = ${Object.keys(exportedData.batches).length}`
		});
	})
};
