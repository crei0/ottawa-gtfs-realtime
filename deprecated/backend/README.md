# To do list

- scc

# Description

// TODO: Finish this

# OC Transpo links:

- [Developers page](https://www.octranspo.com/en/plan-your-trip/travel-tools/developers/)
- [Developer portal for the General Transit Feed Specification](https://nextrip-public-api.developer.azure-api.net/)
- [RSS feed (English)](https://www.octranspo.com/feeds/updates-en/)

# Technologies

- [NodeJS](https://nodejs.org/en)
- [ExpressJS](https://expressjs.com/)
- [Vite](https://vite.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [GTFS](https://gtfs.org/documentation/overview/)
- [SQLite](https://sqlite.org/index.html)
- [Kysely](https://kysely.dev/)
- [cron](https://en.wikipedia.org/wiki/Cron)
- [Dotenv](https://www.dotenv.org/)
- [dotenv-expand](https://www.dotenv.org/)
- [morgan](https://github.com/expressjs/morgan)

# Endpoints

## Documentation

- [OpenAPI](https://www.openapis.org/) file is available at `backend/docs`
- [Bruno](https://www.usebruno.com/) files are available at `backend/docs`

## List

- http://localhost:3000/vehicle-positions
- http://localhost:3000/map

# Database (Supabase)

## Table `vehicle_positions`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `vehicle_id` | `int8` | Primary Identity |
| `latitude` | `float4` |  |
| `longitude` | `float4` |  Nullable |
| `bearing` | `int2` |  Nullable |
| `speed` | `int2` |  Nullable |
| `timestamp` | `timestamp` |  Nullable |
| `route_id` | `text` |  Nullable |
| `batch_id` | `int8` |  Nullable |

## Table `vehicle_positions_batches`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int8` | Primary Identity |
| `timestamp` | `timestamptz` |  |

## Table `vehicle_routes`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `text` | Primary |
| `name_short` | `text` |  |
| `name_long` | `text` |  Nullable |
| `color_background` | `text` |  Nullable |
| `color_text` | `text` |  Nullable |
| `sort_order` | `int2` |  Nullable |

