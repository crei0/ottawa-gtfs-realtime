import fs from "node:fs";
import path from "node:path";

import { getAllRoutes, getAllStops } from "../database/Actions";
import { convertRoutesToMinimizedRoutes, convertStopsToMinimizedStops } from "../routes/Utilities";
import { MinimizedRoute, MinimizedStop } from "../routes/Minimized.Types";

export default async function cronJobGenerateMapdStaticDataAndSaveItAsJsonFile() {
	const routes: MinimizedRoute[] = convertRoutesToMinimizedRoutes(await getAllRoutes());
	const stops: MinimizedStop[] = convertStopsToMinimizedStops(await getAllStops());
	
	const data = {
		routes,
		stops
	};
	
	const publicFolderPath = path.join(process.env.PUBLIC_FOLDER_PATH, "map.json");

	try {
		fs.writeFileSync(
			publicFolderPath,
			JSON.stringify(data)
		);

		console.log("cronJobGenerateMapdStaticDataAndSaveItAsJsonFile() > Map static JSON data saved to file successfully. > path = ", publicFolderPath);
	} catch (error) {
		console.error("cronJobGenerateMapdStaticDataAndSaveItAsJsonFile() > Error writing JSON data to file:", error);
	}
}