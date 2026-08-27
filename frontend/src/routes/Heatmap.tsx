import { useState } from "react";
import "leaflet/dist/leaflet.css";
import { LatLng } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
// import HeatmapLayer from "react-leaflet-heat-layer";

import HeatmapLayer from "../components/HeatLayer.tsx";
import useTimelineData from "../hooks/useTimelineData.ts";
import type { RtVehiclePositions } from "../types.ts";

export default function Heatmap() {
	const [heatmapData, setHeatmapData] = useState<LatLng[]>();

	const { data, isPending, error } = useTimelineData();

	function generateHeatmapData() {
		if (data) {
			const newHeatmapData: LatLng[] = [];

			const intensity: number = 0.2;

			Object.keys(data.batches).forEach(batchKey => {
				const vehiclePositions: RtVehiclePositions[] = data.batches[batchKey];

				vehiclePositions.forEach(vehiclePosition => {
					const latlng: LatLng = new LatLng(
						vehiclePosition.latitude,
						vehiclePosition.longitude,
						intensity
					);

					newHeatmapData.push(latlng);
				});
			});
			setHeatmapData(newHeatmapData);
		}
	}

	if (isPending) {
		return <div>Loading data...</div>;
	}

	if (error) {
		return <div>Error loading data</div>;
	}

	if (data && (!heatmapData?.length)) {
		// Only on the first "render"
		generateHeatmapData();
	}

	if (heatmapData) {
		return (
			<>
				<div id="metadata">Date: {data?.date}</div>

				<MapContainer
					center={[45.37556, -75.68293]}
					zoom={10}
					style={{
						width: "1280px",
						height: "720px",
						position: "static",
					}}
					id="heatmap"
					zoomControl={false}
				>
					<TileLayer
						attribution='Data from <a href="https://www.octranspo.com">OC Transpo</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>

					<HeatmapLayer latlngs={heatmapData} />
				</MapContainer>
			</>
		);
	}
}
