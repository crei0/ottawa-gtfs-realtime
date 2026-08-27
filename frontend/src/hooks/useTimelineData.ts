import { useQuery } from "@tanstack/react-query";

import type { Data } from "../types.ts";

export default function useTimelineData() {
    return useQuery({
        queryKey: ["timeline"],
        queryFn: async (): Promise<Data> => {
            const response = await fetch("http://localhost:5173/yesterdayTimeline.json");
            // const response = await fetch("http://localhost:5173/yesterdayTimeline.debug.json");

            return response.json();
        }
    });
}
