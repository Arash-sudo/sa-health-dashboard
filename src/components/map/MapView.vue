<template>
  <div id="map" class="map-container">
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
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import "leaflet-routing-machine";
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

// Function to get a route using the routing service
const getRoute = async (startPoint, destinationPoint) => {
  // Create a promise for asynchronous operations
  return new Promise((resolve, reject) => {
    // Use leaflet-routing-machine to get a route
    L.Routing.control({
      waypoints: [
        L.latLng(startPoint[0], startPoint[1]),
        L.latLng(destinationPoint[0], destinationPoint[1]),
      ],
    }).on('routesfound', function (e) {
      const route = e.routes[0].coordinates;
      resolve(route);
    }).on('routingerror', function (e) {
      reject(e.error);
    }).addTo(mapRef.value);
  });
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

let intervalId;
const mapRef = ref(null);

onMounted(() => {
  // Initialize the map and set it to mapRef
  mapRef.value = L.map('map').setView(mapCenter, zoom);
  intervalId = setInterval(updateAmbulanceCords, 1000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
  // Ensure to remove the map when the component is unmounted
  if (mapRef.value) {
    mapRef.value.remove();
  }
});

const updateAmbulanceCords = async () => {
  for (const ambulance of ambulanceCords.value) {
 // Replace with the actual starting point (ambulance location)
    const startPoint = ambulance.cord;

    // Check if a hospital is selected
    if (selectedHospitalID.value) {
      const selectedHospital = hospitalCords.find(
        (hospital) => hospital.id === selectedHospitalID.value
      );
if (selectedHospital) {
        // Replace with the actual destination point (selected hospital location)
        const destinationPoint = selectedHospital.cord;

        // Use the routing service to get the path
        const path = await getRoute(startPoint, destinationPoint);

        // Update the ambulance's coordinates based on the path
        for (const point of path) {
          ambulance.cord = point;
          await delay(100); // Introduce a delay for smooth movement
        }
      }
    }
  }
};

</script>

<style scoped>
.map-container {
  height: 100vh;
  /* width: 33.3%; */
}
</style>
