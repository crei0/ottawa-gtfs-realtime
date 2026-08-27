export type MinimizedStop = {
	id: string;
	latitude: number | null;
	longitude: number | null;
	name: string | null;
}

export type MinimizedRoute = {
	id: string;
	long_name: string | null;
	sort_order: number | null;
	color: string | null;
	text_color: string | null;
}
