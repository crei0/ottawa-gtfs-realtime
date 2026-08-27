import fs from "node:fs";
import path from "node:path";
import express from "express";
import morgan from "morgan";
import compression from "compression";

import { RtVehiclePositions } from "../database/Database";
import { getLastBatchOfRtVehiclePositions } from "../database/Actions";
import { respondWithError } from "./Utilities";

function appRoutes() {
	const port = process.env.PORT;
	
	const app = express();

	var accessLogStream = fs.createWriteStream(path.join(import.meta.dirname, 'access.log'), { flags: 'a' })
	app.use(morgan(
		import.meta.env.PROD ? "tiny" : "dev",
		{ stream: accessLogStream }
	));

	app.use(compression());
	
	app.use(express.static(process.env.PUBLIC_FOLDER_PATH));

	app.listen(port, () => {
		console.log(`Listening on port ${port}`);
	});

	app.get('/', (req, res) => {
		res.send('`ottawa-gtfs-realtime-backend` is running');
	});

	app.get('/vehicle-positions', async (req, res) => {
		res.setHeader('Surrogate-Control', 'no-store');
		res.setHeader(
			'Cache-Control',
			'no-store, no-cache, must-revalidate, proxy-revalidate'
		);
		res.setHeader('Expires', '30');


		try {
			const data: RtVehiclePositions[] = await getLastBatchOfRtVehiclePositions();

			res.json(data);
		} catch (error: any) {
			respondWithError(res, 500, "/Error on route: `/vehicle-positions`", error);
		}
	});

	return app;
}

export default appRoutes;