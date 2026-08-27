import { Icon } from "leaflet";

import { ICON_SIZE } from "./Icons.ts";

function getColoredIconHtml(color = "#000"): Icon {
	const iconSvgString = "data:image/svg+xml;base64," + btoa(`
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none">
			<circle cx="15.998" cy="16.087" r="16" style="fill: ${color}" />
			<path
				d="M10.5 8C9.2 8 9 9.4 9 9.4l-1 7.8.2 3.3-.2.2v1.9h1.2V24h2.9v-1.4h7.8V24h2.9v-1.4H24v-1.9l-.2-.2.2-3.3-1-7.8S22.8 8 21.5 8H16Zm1.6.4h7.8v1.9h-7.8ZM9.4 20.5h13.2v.6H9.4Z"
				style="fill: #fff; fill-opacity: 1;"
			/>
			<path
				d="m9.4 11.3 6.2-.6V16H8.8Zm.8 7a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4m1.2 0a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4"
				style="fill: ${color}; fill-opacity: 1;"
			/>
			<path
				d="m23.8 20.5.2-3.3-1-7.8S22.8 8 21.5 8H16v.4h3.9v1.9H16v10.2h6.6v.6H16v1.5h3.9V24h2.9v-1.4H24v-1.9z"
				style="fill-opacity:1"
			/>
			<path
				d="m22.6 11.3-6.2-.6V16h6.8zm-.8 7a.7.7 0 1 0 0 1.4.7.7 0 0 0 0-1.4m-1.2 0a.7.7 0 1 0 0 1.4.7.7 0 0 0 0-1.4"
				style="fill: ${color}; fill-opacity: 1;"
			/>
		</svg>
	`);

	const newIcon = new Icon({
		iconUrl: iconSvgString,
		iconSize: ICON_SIZE,
		className: "map-icon map-icon-bus",
	});

	return newIcon;
}

export default getColoredIconHtml;
