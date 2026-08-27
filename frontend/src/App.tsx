import { useState } from "react";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

import Timeline from "./routes/Timeline";
import Heatmap from "./routes/Heatmap";
import "./App.css";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 1000 * 60 * 60 * 24, // 24 hours
		},
	},
});

const persister = createAsyncStoragePersister({
	storage: window.localStorage,
});

enum Navigation {
	Home,
	Timeline,
	Heatmap,
}

function App() {
	const [currentNavigationOption, setCurrentNavigationOption] = useState<Navigation>(
		Navigation.Home,
	);

	const hash = window.location.hash.replace("#", "");

	switch (hash) {
		case "timeline":
			if (currentNavigationOption != Navigation.Timeline)
				setCurrentNavigationOption(Navigation.Timeline);

			break;

		case "heatmap":
			if (currentNavigationOption != Navigation.Heatmap)
				setCurrentNavigationOption(Navigation.Heatmap);

			break;

		default:
			if (currentNavigationOption != Navigation.Home) setCurrentNavigationOption(Navigation.Home);

			break;
	}

	function pageComponent() {
		switch (currentNavigationOption) {
			case Navigation.Timeline:
				return <Timeline />;

			case Navigation.Heatmap:
				return <Heatmap />;

			default:
				return <div>Home</div>;
		}
	}

	return (
		<>
			<nav>
				<ul>
					<li>
						<a href="#home" onClick={() => setCurrentNavigationOption(Navigation.Home)}>
							Home
						</a>
					</li>
					<li>
						<a href="#timeline" onClick={() => setCurrentNavigationOption(Navigation.Timeline)}>
							Timeline
						</a>
					</li>
					<li>
						<a href="#heatmap" onClick={() => setCurrentNavigationOption(Navigation.Home)}>
							Heatmap
						</a>
					</li>
				</ul>
			</nav>

			<main>
				<PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
					{pageComponent()}
				</PersistQueryClientProvider>
			</main>
		</>
	);
}

export default App;
