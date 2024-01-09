<template>
  <div>
    <PageHeader />
    <div class="update-time">Refreshed at: {{ updateTime }}</div>

    <div class="dashboards-container grid-container">
      <Emergency :data="dashboardData.ed" />
      <Ambulance :data="dashboardData.ambo" />
      <InpatientMetro :data="dashboardData.ip.metro.slice(0, 8)" />
      <InpatientCountry :data="dashboardData.ip.country" />
    </div>
  </div>
</template>

<script setup>
import Emergency from "../components/Emergency.vue";
import Ambulance from "../components/Ambulance.vue";
import InpatientMetro from "../components/InpatientMetro.vue";
import InpatientCountry from "../components/InpatientCountry.vue";
import PageHeader from "../components/PageHeader.vue";
import { storeToRefs } from "pinia";

import { useDashboardStore } from "@/stores/dashboard";
const dashbordStore = useDashboardStore();

const { dashboardData, updateTime } = storeToRefs(dashbordStore);
</script>

<style scoped>
.update-time {
  color: seashell;
  position: absolute;
  top: 4.8rem;
  left: calc(50% - 7rem);
}

.dashboards-container {
  display: inline-flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: auto;
}
@media screen and (max-width: 800px) {
  .dashboards-container {
    display: block; /* Change to block layout for small screens */
  }

  .grid-container {
    grid-template-columns: 1fr; /* Show only one column for small screens */
  }
  }
</style>
