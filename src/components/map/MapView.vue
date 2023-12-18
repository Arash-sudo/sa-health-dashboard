<template>
  <div style="height: 100vh; width: 600px">
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
        @click="selectHospital(hospital.id)"
      >
        <l-tooltip>{{ hospital.name }}</l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>

<script setup>
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
import hospitalSvg from "./assets/hospital.svg";
import { useDashboardStore } from "@/stores/dashboard";
import { ref, onMounted } from "vue";

const CORDS_ADL = [-34.923118042733655, 138.59988535273698];
const zoom = 11;
const mapCenter = CORDS_ADL;
const hospitalCords = HOSPITAL_CORDINANTS;
const hospitalIcon = L.icon({
  iconUrl: hospitalSvg,
  iconSize: [30, 30],
});

const { selectHospital } = useDashboardStore();

onMounted(() => {
  // Actions to perform on mount, for example:
  // dashboardStore.someAction();
});
</script>

<style></style>
