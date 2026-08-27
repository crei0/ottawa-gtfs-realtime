-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.vehicle_positions_batches (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  timestamp timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT vehicle_positions_batches_pkey PRIMARY KEY (id)
);
CREATE TABLE public.routes (
  id text NOT NULL,
  name_short text NOT NULL,
  name_long text NOT NULL,
  color_background text,
  color_text text,
  sort_order smallint,
  CONSTRAINT routes_pkey PRIMARY KEY (id)
);
CREATE TABLE public.stops (
  id text NOT NULL,
  name text NOT NULL,
  latitude real NOT NULL,
  longitude real NOT NULL,
  CONSTRAINT stops_pkey PRIMARY KEY (id)
);
CREATE TABLE public.vehicle_positions (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  vehicle_id bigint NOT NULL,
  latitude real,
  longitude real,
  bearing real,
  speed real,
  timestamp timestamp with time zone,
  route_id text,
  batch_id bigint,
  CONSTRAINT vehicle_positions_pkey PRIMARY KEY (id)
);