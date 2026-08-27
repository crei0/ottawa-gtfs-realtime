import { describe, test } from "node:test";
import assert from "node:assert";

import { filterRtVehiclePositionsFromRtVehicleDataData } from "./gtfs";
import { RtVehicleData } from "./RtVehicleData";
import { RtVehiclePositions } from "../database/Database";

describe("gtfs.ts", () => {
	describe("filterRtVehiclePositionsFromRtVehicleDataData()", () => {
		test("Returns the data correctly", () => {
			const mockData: RtVehicleData = {
				"Header": {
					"GtfsRealtimeVersion": "2.0",
					"HasGtfsRealtimeVersion": true,
					"Incrementality": 0,
					"HasIncrementality": true,
					"Timestamp": 1781247025,
					"HasTimestamp": true
				},
				"Entity": [
					{
						"Id": "1",
						"HasId": true,
						"IsDeleted": false,
						"HasIsDeleted": false,
						"TripUpdate": null,
						"Vehicle": {
							"Vehicle": {
								"Id": "6594",
								"HasId": true,
								"Label": "",
								"HasLabel": false,
								"LicensePlate": "",
								"HasLicensePlate": false,
								"WheelchairAccessible": 0,
								"HasWheelchairAccessible": false
							},
							"Position": {
								"Latitude": 45.40919,
								"HasLatitude": true,
								"Longitude": -75.634155,
								"HasLongitude": true,
								"Bearing": 193,
								"HasBearing": true,
								"Odometer": 0,
								"HasOdometer": false,
								"Speed": 0,
								"HasSpeed": true
							},
							"CurrentStopSequence": 0,
							"HasCurrentStopSequence": false,
							"StopId": "",
							"HasStopId": false,
							"CurrentStatus": 2,
							"HasCurrentStatus": false,
							"Timestamp": 1781246415,
							"HasTimestamp": true,
							"CongestionLevel": 0,
							"HasCongestionLevel": false,
							"OccupancyStatus": 0,
							"HasOccupancyStatus": false,
							"OccupancyPercentage": 0,
							"HasOccupancyPercentage": false,
							"MultiCarriageDetails": []
						},
						"Alert": null,
						"Shape": null
					},
					{
						"Id": "2",
						"HasId": true,
						"IsDeleted": false,
						"HasIsDeleted": false,
						"TripUpdate": null,
						"Vehicle": {
							"Trip": {
								"TripId": "12226050",
								"HasTripId": true,
								"RouteId": "75",
								"HasRouteId": true,
								"DirectionId": 0,
								"HasDirectionId": false,
								"StartTime": "26:05:00",
								"HasStartTime": true,
								"StartDate": "20260611",
								"HasStartDate": true,
								"ScheduleRelationship": 0,
								"HasScheduleRelationship": true
							},
							"Vehicle": {
								"Id": "4693",
								"HasId": true,
								"Label": "",
								"HasLabel": false,
								"LicensePlate": "",
								"HasLicensePlate": false,
								"WheelchairAccessible": 0,
								"HasWheelchairAccessible": false
							},
							"Position": {
								"Latitude": 45.31008,
								"HasLatitude": true,
								"Longitude": -75.73829,
								"HasLongitude": true,
								"Bearing": 157,
								"HasBearing": true,
								"Odometer": 0,
								"HasOdometer": false,
								"Speed": 15.6463995,
								"HasSpeed": true
							},
							"CurrentStopSequence": 0,
							"HasCurrentStopSequence": false,
							"StopId": "",
							"HasStopId": false,
							"CurrentStatus": 2,
							"HasCurrentStatus": false,
							"Timestamp": 1781246999,
							"HasTimestamp": true,
							"CongestionLevel": 0,
							"HasCongestionLevel": false,
							"OccupancyStatus": 0,
							"HasOccupancyStatus": false,
							"OccupancyPercentage": 0,
							"HasOccupancyPercentage": false,
							"MultiCarriageDetails": []
						},
						"Alert": null,
						"Shape": null
					}
				]
			};

			const expectedResult: RtVehiclePositions[] = [
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
			];

			const testResult = filterRtVehiclePositionsFromRtVehicleDataData(mockData);

			assert.deepStrictEqual(testResult, expectedResult);
		});

		test("Returns an empty array", () => {
			const mockData: RtVehicleData = {
				"Header": {
					"GtfsRealtimeVersion": "2.0",
					"HasGtfsRealtimeVersion": true,
					"Incrementality": 0,
					"HasIncrementality": true,
					"Timestamp": 1781247025,
					"HasTimestamp": true
				},
				"Entity": []
			};

			const expectedResult: RtVehiclePositions[] = [];

			const testResult = filterRtVehiclePositionsFromRtVehicleDataData(mockData);

			assert.deepStrictEqual(testResult, expectedResult);
		});
	});
});
