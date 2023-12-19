<template>
  <div v-if="!isDataReady">loading</div>
  <div class="container" v-if="isDataReady">
    <div class="header">
      <div class="info">
        <div class="title">
          Real-time data for <br />
          <div class="hospital-name">{{ selectedHospitalData.name }}</div>
        </div>
        <div>Address: {{ selectedHospitalData.location.address }}</div>
        <div>Coordinates: {{ selectedHospitalData.location.cord }}</div>
      </div>

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
  /* margin: 1rem; */
  padding: 2rem;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.title {
  font-size: 2rem;
  color: #333;
  font-weight: bold;
}

.title .hospital-name {
  color: #0056b3;
  font-weight: 600;
}

.highlights {
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(200px, 1fr));
  gap: 1rem;
}

.highlights > div {
  background: #e7f1ff;
  padding: 0.3rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #333;
}

.highlights > div:nth-child(2n) {
  background-color: bisque;
}

.live-feed-container {
  display: grid;
  grid-template-columns: repeat(2, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.dashboard-container {
  width: 80%;
  align-items: center;
  display: inline-block;
}
</style>
