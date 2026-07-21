import { DatabaseSync } from 'node:sqlite';
import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from "kysely";

function _getDatabase(): DatabaseSync {
	return new DatabaseSync('/home/andreguedes/repositories/web/ottawa-gtfs-realtime/backend/database/database.sqlite');
}

function testDatabaseConnection() {
	console.log("\nGTFS > testDatabaseConnection start\n");
	
	const database = _getDatabase()
	console.log("\nGTFS > testDatabaseConnection 5\n");

	const query = database.prepare("SELECT name FROM sqlite_master WHERE type = 'table'");
	
	console.log("\nGTFS > query > \n");
	console.log(query.all());

	console.log("\nGTFS > testDatabaseConnection end\n");
}

function getBusPositions() {
	console.log("\nGTFS > getBusPositions 1\n");
	const database = _getDatabase();

	const query = database.prepare("SELECT name FROM sqlite_master WHERE type = 'table'");
	
	console.log("\nGTFS > query > \n");
	console.log(query.all());
}

function getStops() {
	console.log("\nGTFS > getStops 1\n");
	const database = _getDatabase();
	
	const query = database.prepare("SELECT name FROM sqlite_master WHERE type = 'table'");
	const columns: string[] = [
		"stop_id",
		"stop_name","stop_lat",
		"stop_lon"
	];
}

export {
    testDatabaseConnection
}