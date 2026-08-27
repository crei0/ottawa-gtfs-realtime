# Frontend

## Summary

Uses data generated from `Supabase's edge-functions` generated file, and displays the data in a map with `next` and `previous` buttons to move through the timeline.

Each timeline step (batch), should be around 1 min of a minute. The timeline data is the entire day of `2026-08-20`

**Note: The `JSON` file containing the timeline of one day is more than `30MB`, so map loading should be slow to load**

## "Pages"

### Timeline

Uses data generated from `Supabase's edge-functions` generated file, and displays the data in a map with buttons to move through the timeline of the Busses positions of [OC Transpo](https://www.octranspo.com) for the day of `2026-08-20`. 

Each timeline step (batch), should be around 1 min of a minute of the day, the `Icon` for the busses are colored depending on the `route_id` string, so all the busses on a route should have the same colour.

[![Video](e2e/screenshots/thumbnail-timeline.png)](https://github.com/crei0/ottawa-gtfs-realtime/blob/main/frontend/video.mp4)

### Heatmap

Using the same `JSON` file containing the timeline of one day (as the `Timeline`), generates an heatmap of all the vehicle positions during that day.

![The generated heatmap image](e2e/screenshots/heatmap.png)

## Tecnhologies

### ReactJS + React Leaflet

For the map and heatmap display

### `react-leaflet-heat-layer`
I had to customize it to make it work

### Playwright

Used to take the screenshots of the map timeline, and heatmap

## FFmpeg

To create a `MP4` video file of all the `timeline-xxx.png` screenshots
