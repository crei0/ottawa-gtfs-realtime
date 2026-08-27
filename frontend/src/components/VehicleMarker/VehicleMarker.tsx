import type { LatLngTuple } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import createColor from "create-color";

import type { RtVehiclePositions } from "../../types/RtVehiclePositions.types.ts";
import getColoredIconHtml from "../../assets/icons/getColoredIconHtml.ts";

interface VehicleMarkerProps {
	vehicle: RtVehiclePositions;
}

function VehicleMarker({ vehicle }: VehicleMarkerProps) {
	const { id, vehicle_id } = vehicle;

	const position: LatLngTuple = [vehicle.latitude, vehicle.longitude];

	const colorString: string = createColor(vehicle.route_id);

	return (
		<Marker key={"vehicle-" + id} position={position} icon={getColoredIconHtml(colorString)}>
			<Popup>
				<details open>
					<summary>Vehicle {vehicle_id}</summary>

					<ul>
						<li>Bearing: {vehicle.bearing}</li>
						<li>Speed: {vehicle.speed}</li>
						<li>Route ID: {vehicle.route_id}</li>
					</ul>
				</details>
			</Popup>
		</Marker>
	);
}

export default VehicleMarker;
