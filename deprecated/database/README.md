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

