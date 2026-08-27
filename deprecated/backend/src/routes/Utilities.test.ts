import { describe, test } from "node:test";
import assert from "node:assert";

import {
	respondWithError,
	convertRoutesToMinimizedRoutes,
	convertStopsToMinimizedStops
} from "./Utilities";
import {
	Routes,
	Stops
} from "../database/Database";
import {
	MinimizedRoute,
	MinimizedStop
} from "./Minimized.Types";

describe("Utilities", () => {
	// TODO: Finish this

	// describe("respondWithError()", () => {

	// 	test("Responded correctly", () => {
	// 		assert(respondWithError()).toBe(3)
	// 	})
	// });

	describe("convertRoutesToMinimizedRoutes()", () => {
		// TODO: Finish this

		test("Converted data correctly", { only: false }, () => {
			const input: Routes[] = [
				{
					route_id: "12",
					agency_id: "1",
					route_short_name: "12",
					route_long_name: "Blair <> Tunney's Pasture",
					route_desc: null,
					route_type: 3,
					route_url: null,
					route_color: "0057B8",
					route_text_color: "FFFFFF",
					route_sort_order: 19,
					continuous_pickup: 1,
					continuous_drop_off: 1,
					network_id: null,
					cemv_support: null,
				},
				{
					route_id: "17",
					agency_id: "1",
					route_short_name: "17",
					route_long_name: "Wateridge <> Parliament ~ Parlement",
					route_desc: null,
					route_type: 3,
					route_url: null,
					route_color: "FFFFFF",
					route_text_color: "6D6E70",
					route_sort_order: 24,
					continuous_pickup: 1,
					continuous_drop_off: 1,
					network_id: null,
					cemv_support: null,
				},
				{
					route_id: "99",
					agency_id: "1",
					route_short_name: "99",
					route_long_name: "Barrhaven Centre via Weybridge <> Limebank",
					route_desc: null,
					route_type: 3,
					route_url: null,
					route_color: "6D6E70",
					route_text_color: "FFFFFF",
					route_sort_order: 106,
					continuous_pickup: 1,
					continuous_drop_off: 1,
					network_id: null,
					cemv_support: null,
				}
			];

			const expectedResult: MinimizedRoute[] = [
				{
					route_color: "0057B8",
					route_id: "12",
					route_long_name: null,
					route_short_name: "12",
					route_sort_order: 19,
					route_text_color: "FFFFFF",
				},
				{
					route_color: "FFFFFF",
					route_id: "17",
					route_long_name: null,
					route_short_name: "17",
					route_sort_order: 24,
					route_text_color: "6D6E70",
				},
				{
					route_color: "6D6E70",
					route_id: "99",
					route_long_name: null,
					route_short_name: "99",
					route_sort_order: 106,
					route_text_color: "FFFFFF",
				}
			];

			const testResult: MinimizedRoute[] = convertRoutesToMinimizedRoutes(input);

			assert.deepStrictEqual(expectedResult, testResult);
		});
	});

	describe("convertStopsToMinimizedStops()", () => {
		// TODO: Finish this

		test("Converted data correctly", { only: false }, () => {
			const input: Stops[] = [
				{
					stop_id: "10766",
					stop_code: null,
					stop_name: "LAURIER / EDDY",
					tts_stop_name: null,
					stop_desc: null,
					stop_lat: 45.424774,
					stop_lon: -75.719442,
					zone_id: null,
					stop_url: null,
					location_type: 0,
					parent_station: null,
					stop_timezone: null,
					wheelchair_boarding: null,
					level_id: null,
					platform_code: null,
					stop_access: null,
				},
				{
					stop_id: "2917",
					stop_code: "2027",
					stop_name: "STONEHAVEN / BRIDLE PARK",
					tts_stop_name: null,
					stop_desc: null,
					stop_lat: 45.284727,
					stop_lon: -75.845942,
					zone_id: null,
					stop_url: null,
					location_type: 0,
					parent_station: null,
					stop_timezone: null,
					wheelchair_boarding: null,
					level_id: null,
					platform_code: null,
					stop_access: null,
				},
				{
					stop_id: "4812",
					stop_code: "8591",
					stop_name: "CENTREPOINTE / MAPLE VIEW",
					tts_stop_name: null,
					stop_desc: null,
					stop_lat: 45.337832,
					stop_lon: -75.765602,
					zone_id: null,
					stop_url: null,
					location_type: 0,
					parent_station: null,
					stop_timezone: null,
					wheelchair_boarding: null,
					level_id: null,
					platform_code: null,
					stop_access: null,
				}
			];

			const expectedResult: MinimizedStop[] = [
				{
					stop_id: "10766",
					stop_lat: 45.424774,
					stop_lon: -75.719442,
					stop_name: "LAURIER / EDDY",
				},
				{
					stop_id: "2917",
					stop_lat: 45.284727,
					stop_lon: -75.845942,
					stop_name: "STONEHAVEN / BRIDLE PARK",
				},
				{
					stop_id: "4812",
					stop_lat: 45.337832,
					stop_lon: -75.765602,
					stop_name: "CENTREPOINTE / MAPLE VIEW",
				}
			];

			const testResult: MinimizedStop[] = convertStopsToMinimizedStops(input);

			assert.deepStrictEqual(expectedResult, testResult);
		});
	});
});