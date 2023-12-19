<template>
  <div class="map-container">
    <l-map ref="map" v-model:zoom="zoom" :center="mapCenter">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>

      <l-marker
        v-for="hospital in hospitalCords"
        :lat-lng="hospital.cord"
        :icon="
          hospital.id === selectedHospitalID
            ? selectedHospitalIcon
            : hospitalIcon
        "
        @click="selectHospital(hospital.id)"
      >
        <l-tooltip>{{ hospital.name }}</l-tooltip>
      </l-marker>

      <l-marker
        v-for="ambulance in ambulanceCords"
        :key="ambulance.id"
        :lat-lng="ambulance.cord"
        :icon="ambulanceIcon"
      >
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
import { HOSPITAL_COORDINATES } from "../../constants";
import hospitalSvg from "./assets/hospital.svg";
import greenAmbulance from "./assets/ambulance.jpg";
import { useDashboardStore } from "@/stores/dashboard";
import { storeToRefs } from "pinia";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { generateInitCords } from "@/utils/generateInitCords";

const CORDS_ADL = [-34.923118042733655, 138.59988535273698];
const zoom = 11;
const mapCenter = CORDS_ADL;
const hospitalCords = HOSPITAL_COORDINATES;
const hospitalIcon = L.icon({
  iconUrl: hospitalSvg,
  iconSize: [30, 30],
  zIndexOffset: 500,
});

const selectedHospitalIcon = L.icon({
  iconUrl: hospitalSvg,
  iconSize: [50, 50],
});

const ambulanceIcon = L.icon({
  iconUrl: greenAmbulance,
  iconSize: [20, 40],
  zIndexOffset: 1000,
});

const ambulanceCords = ref(generateInitCords(5));

const { selectHospital } = useDashboardStore();
const { selectedHospitalID } = storeToRefs(useDashboardStore());

const updateAmbulanceCords = () => {
  const latitudeIncrement = 0.0003;
  const longitudeIncrement = 0.0002;

  ambulanceCords.value = ambulanceCords.value.map((ambulance) => {
    return {
      ...ambulance,
      cord: [
        ambulance.cord[0] + latitudeIncrement,
        ambulance.cord[1] + longitudeIncrement,
      ],
    };
  });
};
let intervalId;

onMounted(() => {
  intervalId = setInterval(updateAmbulanceCords, 1000);
});

onBeforeUnmount(() => clearInterval(intervalId));
</script>

<style scoped>
.map-container {
  height: 100vh;
  /* width: 33.3%; */
}
</style>
