// Below generated using https://transform.tools/json-to-typescript

export interface RtVehicleData {
	Header: Header
	Entity: Entity[]
}

export interface Header {
	GtfsRealtimeVersion: string
	HasGtfsRealtimeVersion: boolean
	Incrementality: number
	HasIncrementality: boolean
	Timestamp: number
	HasTimestamp: boolean
}

export interface Entity {
	Id: string
	HasId: boolean
	IsDeleted: boolean
	HasIsDeleted: boolean
	TripUpdate: any
	Vehicle: Vehicle
	Alert: any
	Shape: any
}

export interface Vehicle {
	Trip?: Trip
	Vehicle: Vehicle2
	Position: Position
	CurrentStopSequence: number
	HasCurrentStopSequence: boolean
	StopId: string
	HasStopId: boolean
	CurrentStatus: number
	HasCurrentStatus: boolean
	Timestamp: number
	HasTimestamp: boolean
	CongestionLevel: number
	HasCongestionLevel: boolean
	OccupancyStatus: number
	HasOccupancyStatus: boolean
	OccupancyPercentage: number
	HasOccupancyPercentage: boolean
	MultiCarriageDetails: any[]
}

export interface Trip {
	TripId: string
	HasTripId: boolean
	RouteId: string
	HasRouteId: boolean
	DirectionId: number
	HasDirectionId: boolean
	StartTime: string
	HasStartTime: boolean
	StartDate: string
	HasStartDate: boolean
	ScheduleRelationship: number
	HasScheduleRelationship: boolean
}

export interface Vehicle2 {
	Id: string
	HasId: boolean
	Label: string
	HasLabel: boolean
	LicensePlate: string
	HasLicensePlate: boolean
	WheelchairAccessible: number
	HasWheelchairAccessible: boolean
}

export interface Position {
	Latitude: number
	HasLatitude: boolean
	Longitude: number
	HasLongitude: boolean
	Bearing: number
	HasBearing: boolean
	Odometer: number
	HasOdometer: boolean
	Speed: number
	HasSpeed: boolean
}
