// import { useQuery } from "@tanstack/react-query";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngTuple } from "leaflet";

import "./gtfs.css";
import data from "../../assets/vp-5-vehicles.json"

function GtfsView() {
	// const { data, isPending, error } = useQuery({
	// 	queryKey: ['todos'],
	// 	queryFn: () => fetch('http://localhost:3000/gtfs').then(r => r.json()),
	// })

	// if (isPending) return <span>Loading...</span>
	// if (error) return <span>Oops!</span>
	
	// return <ul>{data.map(t => <li key={t.id}>{t.title}</li>)}</ul>

	console.log({data});

	return (
		<MapContainer
			center={[45.40556, -75.68293]}
			zoom={11}
			style={{ height: "800px" }}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

			{
				data.map((item) => {
					const vehicleId = item.Vehicle.Vehicle.Id;
					const position: LatLngTuple = [item.Vehicle.Position.Latitude, item.Vehicle.Position.Longitude];
					
					return (
						<Marker
							key={vehicleId}
							position={position}
						>
							<Popup>
								<details open>
									<summary>Vehicle</summary>

									<ul>
										<li>Vehicle ID: {vehicleId}</li>
										<li>Bearing: {item?.Vehicle?.Position?.Bearing}</li>
										<li>Speed: {item?.Vehicle?.Position?.Speed}</li>
									</ul>
								</details>
								
								<details open>
									<summary>Trip</summary>

									<ul>
										<li>TripId ID: {item?.Vehicle?.Trip?.TripId}</li>
										<li>Route ID: {item?.Vehicle?.Trip?.RouteId}</li>
									</ul>
								</details>
							</Popup>
						</Marker>
					)
				})
			}
		</MapContainer>
	);
}

export default GtfsView;
