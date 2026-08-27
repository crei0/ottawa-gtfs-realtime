import { Response } from "express";

import type { MinimizedRoute, MinimizedStop } from "./Minimized.Types";
import { Routes, Stops } from "../database/Database";

function respondWithError(
	res: Response,
	code: number = 500,
	message: string = "Internal Server Error",
	internalError: any
) {
	console.error(`Error | Code: ${code} | Message: ${message} | Error: `, internalError);

	res.status(500).json(
		{
			"code": code.toString(),
			"message": message
		}
	);
}

function convertRoutesToMinimizedRoutes(routes: Routes[]): MinimizedRoute[] {
	let minimizedRoutes: MinimizedRoute[] = [];

	routes.forEach(route => {
		minimizedRoutes.push({
			color: route.route_color,
			id: route.route_id,
			long_name: route.route_long_name,
			sort_order: route.route_sort_order,
			text_color: route.route_text_color
		});
	});

	return minimizedRoutes;
}

function convertStopsToMinimizedStops(stops: Stops[]): MinimizedStop[] {
	let minimizedStops: MinimizedStop[] = [];
	
	stops.forEach(stop => {
			minimizedStops.push({
			id: stop.stop_id,
			latitude: stop.stop_lat,
			longitude: stop.stop_lon,
			name: stop.stop_name
		});
	});

	return minimizedStops;
}

export {
	respondWithError,
	convertRoutesToMinimizedRoutes,
	convertStopsToMinimizedStops
};