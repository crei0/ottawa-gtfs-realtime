[![Node.js CI](https://github.com/crei0/ottawa-gtfs-realtime/actions/workflows/build.yml/badge.svg)](https://github.com/crei0/ottawa-gtfs-realtime/actions/workflows/build.yml)

# Description

This project was created for me to experiment with [OC Transpo](https://www.octranspo.com/en/plan-your-trip/travel-tools/developers/)'s APIs/data.

The target was to visualize the locations of OC Transpo's vehicles during a day, and then generate a corresponding of the heatmap of the positions.

## Results

### Video from the interactive timeline

[![Video](frontend/e2e/screenshots/thumbnail-timeline.png)](https://github.com/crei0/ottawa-gtfs-realtime/blob/main/frontend/video.mp4)

### The heatmap image

![The generated heatmap image](frontend/e2e/screenshots/heatmap.png)

## More information

### Supabase's `edge-functions`
[README.md](edge-functions/README.md)

### Frontend
[README.md](frontend/README.md)

## Deprecated (`deprecated/*`)

Initially I created a `NodeJS` backend (`deprecated/backend`) + `SQlite` database (`deprecated/database`), but I replaced this by moving the code to be in Supabase's `edge-functions`


## AI Disclaimer

This project did not use any AI or related tools. See [NOAI.md](NOAI.md).
