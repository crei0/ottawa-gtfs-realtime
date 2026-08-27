import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

import { TablesInsert } from "./database.types.ts";
import { RtVehicleData } from "./gtfs.types.ts";

export default {
	fetch: withSupabase({ auth: ["publishable", "secret"] }, async (_req, ctx) => {
		console.log("inside get-vehicle-positions-and-store-json-file!");

		const response = await fetch(
			Deno.env.get("OC_TRANSPO_RT_VEHICLE_POSITIONS_URL") || "",
			{
				method: "GET",
				headers: {
					"Ocp-Apim-Subscription-Key": Deno.env.get("OC_TRANSPO_DEV_PRIMARY_KEY") || "",
					"Content-Type": "application/json",
				}
			}
		);

		try {
			const ocTranspoData: RtVehicleData = await response.json();

			if (ocTranspoData?.Header?.Timestamp) {
				const dateTime: Date = new Date(ocTranspoData.Header.Timestamp * 1000);
				
				const batchInsert: TablesInsert<"vehicle_positions_batches"> = {
					timestamp: dateTime.toISOString()
				}

				const { data: newBatchRows, errorBatch } = await ctx.supabase
					.from("vehicle_positions_batches")
					.insert(batchInsert)
					.select();

				const newBatchId = newBatchRows[0].id;

				if (errorBatch) {
					console.error("errorBatch = ", errorBatch);

					throw errorBatch;
				}

				console.info("50 newBatchId = ", newBatchId);

				const vehiclePositions: TablesInsert<"vehicle_positions">[] =  [];

				ocTranspoData.Entity.forEach(entity => {
					if (!entity.IsDeleted) {
						const vehicleId = parseInt(entity.Vehicle.Vehicle.Id);
						const routeId = entity.Vehicle.Trip?.RouteId || "0";
						const position = entity.Vehicle.Position;
						const timestampZ = new Date(entity.Vehicle.Timestamp * 1000);
						
						if (vehicleId && routeId != "0") {
							vehiclePositions.push({
								vehicle_id: vehicleId,
								bearing: position.Bearing,
								latitude: position.Latitude,
								longitude: position.Longitude,
								speed: position.Speed,
								route_id: routeId,
								timestamp: timestampZ.toISOString(),
								batch_id: newBatchId,
							});
						}
					}
				});


				const { data: dataVehiclePositions, errorVehiclePositions } = await ctx.supabase
					.from("vehicle_positions")
					.insert(vehiclePositions)
					.select();
				
				if (errorVehiclePositions) {
					console.error("errorVehiclePositions = ", errorVehiclePositions);

					throw errorVehiclePositions;
				}

				return Response.json({
					message: `OK > Inserted ${dataVehiclePositions.length} 'vehicle_positions'`
				});
			} else {
				console.error("ocTranspoData is empty");
				
				throw new Error("ocTranspoData is empty");
			}
		} catch (err) {
			return Response.json({ error: String(err?.message ?? err) }, { status: 500 })
		}
	}),
};
