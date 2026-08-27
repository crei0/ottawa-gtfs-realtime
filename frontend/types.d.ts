declare module "*.json" {
  const value: any;
  export default value;
}

declare module "./public/yesterdayTimeline.json" {
    interface Data {
        date: string;
        
        batches: Batch[];
    }

    interface Batch {
        batch_id: number | null
        bearing: number | null
        latitude: number
        longitude: number | null
        route_id: string | null
        speed: number | null
        timestamp: string | null
        vehicle_id: number
    }

  const value: Data;

  export default value;
}