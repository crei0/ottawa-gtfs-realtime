import { spawn } from "node:child_process";

async function cronJobDownloadGtfsStaticFileThenUnzip() {
	const bashProcess = spawn(`bash`, [])

	// wait for the process to spawn
	await new Promise(resolve => bashProcess.once(`spawn`, resolve))

	// log any stderr
	//process.stderr.on(`data`, data => console.log(data.toString()))

	await new Promise(resolve => bashProcess.stdin.write(`exec npm run initialize \n`, `utf8`, () => resolve("ok")))

	// wait for stdout and stderr stream to end, and process to close
	await Promise.all([
		new Promise(resolve => bashProcess.stdout.on('end', resolve)),
		new Promise(resolve => bashProcess.stderr.on('end', resolve)),
		new Promise(resolve => bashProcess.once(`close`, resolve))
	]);
}

export default cronJobDownloadGtfsStaticFileThenUnzip;
