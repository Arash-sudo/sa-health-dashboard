<template>
  <div style="height: 600px; width: 800px">
    this is a map
    <l-map ref="map" v-model:zoom="zoom" :center="mapCenter">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <!-- <l-marker :lat-lng="[-35.0227, 138.5691]"> </l-marker> -->
      <l-marker v-for="hospital in hospitals" :lat-lng="hospital.cord">
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      zoom: 10,
      mapCenter: [-34.923118042733655, 138.59988535273698],
      hospitals: [
        {
          id: "01",
          name: "Flinders Medical Center",
          cord: [-35.0227, 138.5691],
        },
        {
          id: "02",
          name: "Lyell McEwin Hospital",
          cord: [-34.7475, 138.6646],
        },
        {
          id: "03",
          name: "Modbury Hospital",
          cord: [-34.8341, 138.6898],
        },
        {
          id: "04",
          name: "Noarlunga Hospital",
          cord: [-35.13911, 138.50014],
        },
      ],
    };
  },
  // mounted(){
  // }
};
</script>

<style></style>
