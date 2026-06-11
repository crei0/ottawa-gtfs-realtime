import express from "express";

import getRtVehiclePositionsData from "./gtfs/gtfs";

function appRoutes() {
	const port = process.env.PORT;
	const app = express();

	if (import.meta.env.PROD) {
		app.listen(port);
	}

	app.listen(port, () => {
		console.log(`Example app listening on port ${port}`);
	});

	app.get('/', (req, res) => {
		res.send('ottawa-gtfs-realtime-backend is running');
	});

	app.get('/test', (req, res) => {
		res.send('doing getRtVehiclePositionsData()');

		getRtVehiclePositionsData();
	});

	return app;
}

export default appRoutes;