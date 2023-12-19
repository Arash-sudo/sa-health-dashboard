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
      <img :src="logo" alt="healux logo" class="logo" />
    </div>

    <div class="highlights">
      <div>Emergency Capacity:</div>
      <div>Emergency Utilization:</div>
      <div>Expecting Ambulance:</div>
      <div>Clearing Estimate:</div>
      <div>{{ selectedHospitalData.ed[0].capacity }}</div>

      <div>
        {{
          (
            (Number(selectedHospitalData.ed[0].patients) /
              Number(selectedHospitalData.ed[0].capacity)) *
            100
          ).toFixed(2)
        }}%
      </div>
      <div>{{ selectedHospitalData.ed[0].expecting }}</div>

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
import logo from "@/assets/images/healux_darkfont.png";

const { selectedHospitalData, isDataReady } = storeToRefs(useDashboardStore());
</script>

<style scoped>
.container {
  padding: 1rem 2rem;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.logo {
  height: 120px;
  width: 200px;
  margin-right: 1rem;
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
  margin: 1rem auto;
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, 1fr));
  gap: 1rem;
  background-color: #e3f2fd; /* New background color */
  width: 80%;
}

.highlights > div {
  padding: 0.5rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #333; /* Adjusted for readability */
}

.highlights > div:nth-last-child(-n + 4) {
  background-color: #fff3e0; /* Complementary color for alternating rows */
}

.live-feed-container,
.dashboard-container {
  display: grid;
  grid-template-columns: repeat(2, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.dashboard-container {
  width: 80%;
  align-items: center;
  display: inline-block;
}
</style>
