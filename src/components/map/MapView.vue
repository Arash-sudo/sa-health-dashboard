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
      <l-marker
        v-for="ambulance in ambulanceCords"
        :key="ambulance.id"
        :lat-lng="ambulance.cord"
        :icon="ambulanceIcon"
      >
        <l-tooltip>Ambulance</l-tooltip>
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
import ambulanceIcon from "./assets/ambulance.svg";

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
      ambulanceCords: [], // Initialize ambulance coordinates array
      ambulanceIcon: L.icon({
        iconUrl: ambulanceIcon,
        iconSize: [30, 30],
      }),
    };
  },
  mounted() {
    // Generate ambulance coordinates
    this.generateInitialAmbulanceCoordinates();
    // This part will update the coordinates every second, if it's slow, increase later on
    setInterval(() => {
      this.updateAmbulanceCoordinates();
    }, 1000);
  },
  methods: {
    generateInitialAmbulanceCoordinates() {
      const minLatitude = -34.8800;
      const maxLatitude = -35.1000;
      const minLongitude = 138.5646;
      const maxLongitude = 138.6000;

      for (let i = 0; i < 4; i++) {
        const latitude = this.getRandomNumber(minLatitude, maxLatitude);
        const longitude = this.getRandomNumber(minLongitude, maxLongitude);

        this.ambulanceCords.push({ id: i + 1, cord: [latitude, longitude] });
      }
    },

    updateAmbulanceCoordinates() {
      // Increment coordinates for each ambulance
      const latitudeIncrement = 0.0003;
      const longitudeIncrement = 0.0002;

      this.ambulanceCords = this.ambulanceCords.map((ambulance) => {
        return {
          ...ambulance,
          cord: [
            ambulance.cord[0] + latitudeIncrement,
            ambulance.cord[1] + longitudeIncrement,
          ],
        };
      });
    },

    getRandomNumber(min, max) {
      return Math.random() * (max - min) + min;
    },
  },
};
</script>

<style></style>
