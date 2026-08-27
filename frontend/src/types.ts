export interface Data {
    date: string;
    
    batches: VehiclePositionsBatch;
}

export interface VehiclePositionsBatch {
    [key: string]: RtVehiclePositions[]
}

export interface RtVehiclePositions {
	id: number;
	batch_id: number;
	bearing: number;
	latitude: number;
	longitude: number;
	route_id: number;
	speed: number;
	timestamp: number;
	vehicle_id: number;
}

export interface CurrentBatch {
    id: string;
    index: number;
    count: number;
    time: string;
    vehiclePositions: RtVehiclePositions[]
}
