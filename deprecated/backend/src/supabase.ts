type SupabaseConfig = {
	TABLE: {
		VEHICLE_POSITIONS: string;
		VEHICLE_POSITIONS_BATCHES: string;
		VEHICLE_ROUTES: string;
	}
}

const supabaseConfig: SupabaseConfig = {
	TABLE: {
		VEHICLE_POSITIONS: "vehicle_positions",
		VEHICLE_POSITIONS_BATCHES: "vehicle_positions_batches",
		VEHICLE_ROUTES: "vehicle_routes"
	}
}

export default {
	supabaseConfig
}