declare global {
	namespace NodeJS {
		interface ProcessEnv {
			SERVER_URL: string;

			ENDPOINT_VEHICLE_POSITIONS: string;
			ENDPOINT_MAP: string;

			VITE_SUPABASE_URL: string;
			VITE_SUPABASE_PUBLISHABLE_KEY: string;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}