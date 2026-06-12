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

	app.get('/gtfs', async (req, res) => {
		//res.send('doing getRtVehiclePositionsData()');

		var data = await getRtVehiclePositionsData();
		console.log('/gtfs 25 > data =', data);

		if (data) {
			console.log('/gtfs 27 ');
			res.json(data)
		} else {
			res.send('failed request'); // TODO: Fix me
		}
	});

	return app;
}

export default appRoutes;