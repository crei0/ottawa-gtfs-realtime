declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: string;
			OC_TRANSPO_BASE_URL: string;

			OC_TRANSPO_DEV_PRIMARY_KEY: string;
			OC_TRANSPO_GTFS_STATIC_ZIP_URL: string;
			OC_TRANSPO_GTFS_STATIC_ZIP_FILENAME: string;
			STATIC_GTFS_UNZIP_PATH: string;
			DATABASE_URL: string; // Kysely needs it to be named like this
			DATABASE_TESTING_URL: string;
			CRON_STATIC_GTFS_RETRIEVAL: string; // 0 2 * * * # At 02:00 every day (https://crontab.guru/#0_2_*_*_*)
			CRON_RT_VEHICLE_POSITIONS_RETRIEVAL: string; // * * * * * # At every minute (https://crontab.guru/#*_*_*_*_*)
			MAP_STATIC_JSON_PATH: string;
			PUBLIC_FOLDER_PATH: string;

			SUPABASE_DATABASE_PASSWORD: string;

			SUPABASE_URL: string;
			SUPABASE_PUBLISHABLE_KEY: string;
			SUPABASE_SECRET_KEY: string;
			SUPABASE_JWKS_URL: string;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
