/*
This is code is adapted from https://github.com/LockBlock-dev/react-leaflet-heat-layer/blob/master/src/index.ts
*/

import "leaflet.heat";
import {
    createElementObject,
    createLayerComponent,
    updateGridLayer,
    type LayerProps,
    type LeafletContextInterface,
} from "@react-leaflet/core";
import L, { LatLng } from "leaflet";

type CustomHeatLatLngTuple = [number, number, number];

interface HeatLayerProps extends LayerProps, L.HeatMapOptions {
    latlngs: Array<LatLng | CustomHeatLatLngTuple>;
}

const createHeatLayer = (
    { latlngs, ...options }: HeatLayerProps,
    context: LeafletContextInterface
) => {
    const layer = L.heatLayer(latlngs, options);
    return createElementObject(layer, context);
};

const updateHeatLayer = (
    layer: L.HeatLayer,
    { latlngs, ...options }: HeatLayerProps,
    prevProps: HeatLayerProps
) => {
    layer.setLatLngs(latlngs);
    layer.setOptions(options);

    updateGridLayer(layer, options, prevProps);
};

export default createLayerComponent<L.HeatLayer, HeatLayerProps>(
    createHeatLayer,
    updateHeatLayer
);