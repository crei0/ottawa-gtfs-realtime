import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

import "./Wrapper.css";
import Timeline from "./routes/Timeline";
import Heatmap from "./routes/Heatmap";

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

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<nav>
			<a href="/heatmap">Heatmap</a> |<a href="/timeline">Timeline</a>
		</nav>

		<main>
			<PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
				<BrowserRouter>
					<Routes>
						<Route index element={<Heatmap />} />

						<Route path="timeline" element={<Timeline />} />
					</Routes>
				</BrowserRouter>

				<Outlet />
			</PersistQueryClientProvider>
		</main>
	</StrictMode>,
);
