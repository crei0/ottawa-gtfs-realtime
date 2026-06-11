import express from "express";

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
		res.send('Hello World!');
	});

	return app;
}

export default appRoutes;