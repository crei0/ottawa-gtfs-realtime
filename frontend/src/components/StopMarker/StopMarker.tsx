import type { LatLngTuple } from "leaflet";
import { Marker, Popup } from "react-leaflet";

import type { MinimizedStop } from "../../types/RtVehiclePositions.types";
import { StopIcon } from "../../assets/icons/Icons";

interface StopMarkerProps {
	stop: MinimizedStop
}

function StopMarker({ stop }: StopMarkerProps) {
  const { id } = stop;
  
  const position: LatLngTuple = [stop.latitude, stop.longitude];

  return (
	<Marker
		key={"stop-" + id}
		position={position}
		icon={StopIcon}
	>
		<Popup>
			<details open>
				<summary>Stop {id}</summary>

				<ul>
					<li>Name: {stop.name}</li>
				</ul>
			</details>
		</Popup>
	</Marker>
  );
}

export default StopMarker;
