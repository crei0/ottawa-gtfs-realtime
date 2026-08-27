import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import type { RtVehiclePositions, CurrentBatch } from "../types.ts";
import VehicleMarker from "../components/VehicleMarker/VehicleMarker.tsx";
import useTimelineData from "../hooks/useTimelineData.ts";

export default function Timeline() {
	const [currentBatch, setCurrentBatch] = useState<CurrentBatch>();

	const { data, isPending, error } = useTimelineData();

	function changeBatch(isIncrementing: boolean = true) {
		if (currentBatch) {
			let newIndex: number = currentBatch.index;

			if (!isIncrementing && newIndex > 0) newIndex--;

			if (isIncrementing && newIndex < currentBatch.count - 1) newIndex++;

			recalculateBatch(newIndex);
		}
	}

	function recalculateBatch(index: number = 0) {
		if (data) {
			const id: string = Object.keys(data.batches)[index];
			const count: number = Object.keys(data.batches).length;
			const vehiclePositions: RtVehiclePositions[] = data.batches[id];

			// Get from the first `vehiclePosition` data (It's good enough/not important)
			const time: string = new Date(vehiclePositions[0].timestamp).toLocaleTimeString("en-CA");

			setCurrentBatch({
				id,
				count,
				index,
				vehiclePositions,
				time,
			});
		}
	}

	if (isPending) {
		return <div>Loading data...</div>;
	}

	if (error) {
		return <div>Error loading data</div>;
	}

	if (data && !currentBatch) {
		// Only on the first "render"
		recalculateBatch(0);
	}

	if (currentBatch) {
		return (
			<>
				<div>
					<button type="button" title="button-previous" onClick={() => changeBatch(false)}>
						Previous
					</button>
					&nbsp;|&nbsp;
					<button type="button" title="button-next" onClick={() => changeBatch(true)}>
						Next
					</button>
				</div>

				<div id="metadata">
					Batch: "{currentBatch.id}" &nbsp;(
					<span id="metadata-batch-index">{currentBatch.index}</span> / &nbsp;
					<span id="metadata-batch-count">{currentBatch.count - 1}</span>) &nbsp; | Date:{" "}
					{data?.date} ~ {currentBatch.time}
				</div>

				<MapContainer
					center={[45.37556, -75.68293]}
					zoom={10}
					style={{
						width: "1280px",
						height: "720px",
						position: "static",
					}}
					id="timeline"
					zoomControl={false}
				>
					<TileLayer
						attribution='Data from <a href="https://www.octranspo.com">OC Transpo</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>

					{currentBatch.vehiclePositions.map((vehicle: RtVehiclePositions) => (
						<VehicleMarker vehicle={vehicle} />
					))}
				</MapContainer>
			</>
		);
	}
}
