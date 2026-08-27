import { Icon, Point } from "leaflet";

import busIconSvg from "./bus-icon.svg";
import stopIconSvg from "./stop-icon.svg";
import routeIconSvg from "./route-icon.svg";

const ICON_SIZE: Point = new Point(24, 24);

const BusIcon = new Icon({
	iconUrl: busIconSvg,
	iconRetinaUrl: busIconSvg,
	iconSize: ICON_SIZE,
	className: 'map-icon map-icon-bus',
});

const StopIcon = new Icon({
	iconUrl: stopIconSvg,
	iconRetinaUrl: stopIconSvg,
	iconSize: ICON_SIZE,
	className: 'map-icon map-icon-stop'
});

const RouteIcon = new Icon({
	iconUrl: routeIconSvg,
	iconRetinaUrl: routeIconSvg,
	iconSize: ICON_SIZE,
	className: 'map-icon map-icon-route'
});

export {
	ICON_SIZE,
	BusIcon,
	StopIcon,
	RouteIcon
}
