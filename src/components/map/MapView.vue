<template>
  <div style="height: 100vh; width: 800px">
    <l-map ref="map" v-model:zoom="zoom" :center="mapCenter">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <l-marker
        v-for="hospital in hospitalCords"
        :lat-lng="hospital.cord"
        :icon="hospitalIcon"
      >
        <l-tooltip>{{ hospital.name }}</l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
  LTooltip,
} from "@vue-leaflet/vue-leaflet";
import { HOSPITAL_CORDINANTS } from "../../constants";
import hospitalIcon from "./assets/hospital.svg";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LTooltip,
  },
  data() {
    return {
      zoom: 11,
      mapCenter: [-34.923118042733655, 138.59988535273698],
      hospitalCords: HOSPITAL_CORDINANTS,
      hospitalIcon: L.icon({
        iconUrl: hospitalIcon,
        iconSize: [30, 30],
      }),
    };
  },
  // mounted(){
  // }
};
</script>

<style></style>
