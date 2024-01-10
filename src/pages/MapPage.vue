<template>
  <!-- <div>this will be a map</div> -->

  <div id="page-container">
    <MapView />
    <HospitalStats />
  </div>
</template>

<script setup>
import MapView from "@/components/map/MapView.vue";
import HospitalStats from "@/components/map/HospitalStats.vue";
</script>

<style>
#page-container {
  display: grid;
  grid-template-columns: 1fr 3fr;
}

</style>
