import fs from "node:fs";
import path from "node:path";

import { getAllBatchesOfRtPositionsForDate } from "../database/Actions";

async function cronJobGeneratePreviousDayTimelineOfRtVehiclePositions() {
	const unixTimestampPreviousDate: Date = new Date();

	unixTimestampPreviousDate.setDate(unixTimestampPreviousDate.getDate() - 1);

	const data = await getAllBatchesOfRtPositionsForDate(unixTimestampPreviousDate);
	
	const publicFolderPath = path.join(process.env.PUBLIC_FOLDER_PATH, "timeline.json");
	
	try {
		fs.writeFileSync(
			publicFolderPath,
			JSON.stringify(data)
		);

		console.log("cronJobGeneratePreviousDayTimelineOfRtVehiclePositions() > Previous day timeline of `RtVehiclePositions` JSON data saved to file successfully. > path = ", publicFolderPath);
	} catch (error) {
		console.error("cronJobGeneratePreviousDayTimelineOfRtVehiclePositions() > Error writing JSON data to file:", error);
	}
}

export default cronJobGeneratePreviousDayTimelineOfRtVehiclePositions;