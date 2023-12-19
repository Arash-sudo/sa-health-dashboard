<template>
  <div v-if="!isDataReady">loading</div>
  <div class="container" v-if="isDataReady">
    <div class="title">
      Real-time data for <br />
      <div class="hospital-name">{{ selectedHospitalData.name }}</div>
    </div>

    <div>Address: {{ selectedHospitalData.location.address }}</div>
    <div>Coordinates: {{ selectedHospitalData.location.cord }}</div>

    <div class="highlights">
      <div>Emergency Utilization:</div>
      <div>
        {{
          (
            (Number(selectedHospitalData.ed[0].patients) /
              Number(selectedHospitalData.ed[0].capacity)) *
            100
          ).toFixed(2)
        }}%
      </div>
      <div>Expecting Ambulance:</div>
      <div>{{ selectedHospitalData.ed[0].expecting }}</div>
      <div>Clearing Estimate:</div>
      <div>{{ selectedHospitalData.ambo[0].time }} min</div>
    </div>

    <div class="live-feed-title">
      Live Feed at {{ selectedHospitalData.name }}
    </div>
    <div class="live-feed-container">
      <LiveFeed title="Ambulance Bay" :source="ambulanceBay" />
      <LiveFeed title="Emergency Reception" :source="emergency" />
    </div>

    <div class="dashboard-container">
      <Ambulance :data="selectedHospitalData.ambo" />
      <Emergency :data="selectedHospitalData.ed" />
    </div>
  </div>
</template>

<script setup>
import { useDashboardStore } from "@/stores/dashboard";
import { storeToRefs } from "pinia";
import Emergency from "../Emergency.vue";
import Ambulance from "../Ambulance.vue";
import LiveFeed from "./LiveFeed.vue";
import ambulanceBay from "./assets/ambulance_bay.webp";
import emergency from "./assets/emergency.avif";

const { selectedHospitalData, isDataReady } = storeToRefs(useDashboardStore());
</script>

<style scoped>
.container {
  margin: 0.5rem;
  padding-inline: 2rem;
}

.title {
  font-size: 1.5rem;
  color: cornsilk;
}

.title .hospital-name {
  font-size: 2rem;
}

.highlights {
  padding-inline: 3rem;
  font-size: 2rem;
  color: aliceblue;
  display: grid;
  grid-template-columns: auto auto;
}

.live-feed-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.dashboard-container {
  width: 80%;
  align-items: center;
  display: inline-block;
  margin-top: 1.5rem;
}
</style>
