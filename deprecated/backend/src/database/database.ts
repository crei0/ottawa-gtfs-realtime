import { PrismaPg } from "@prisma/adapter-pg";
import { SupabaseClient, createClient } from "@supabase/supabase-js";

import { Database } from "./database.types";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const databaseClient: SupabaseClient<any, "public", "public", any, any> = createClient<Database>(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_PUBLISHABLE_KEY
);

const TABLE_NAME = {
	ROUTES: "routes",
	STOPS: "stops",
	VEHICLE_POSITIONS: "vehicle_positions",
	VEHICLE_POSITIONS_BATCHES: "vehicle_positions_batches"
}

export {
	databaseClient,
	TABLE_NAME,
	prisma
}