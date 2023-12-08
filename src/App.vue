<template>
  <div id="page-wrapper">
    <div id="dashboards-container">
      <DashboardWrapper>
        <div style="display: inline-flex">
          <Emergency :data="dashboardData.ed" />
          <Ambulance :data="dashboardData.ambo" />
        </div>
      </DashboardWrapper>
    </div>
    <div class="update-time">Refreshed at: {{ currentTime }}</div>
  </div>
</template>

<script setup>
import Emergency from "./components/Emergency.vue";
import DashboardWrapper from "./components/DashboardWrapper.vue";
import Ambulance from "./components/Ambulance.vue";
import { getCurrentTimeStr } from "./utils/getCurrentTimeStr";
import { ref, onMounted, onBeforeUnmount } from "vue";

const DATA_URL =
  "https://3hosqj1dol.execute-api.ap-southeast-2.amazonaws.com/default/ambulance";
const REFRESH_INTERVAL = 60000;

const currentTime = ref(getCurrentTimeStr());
const dashboardData = ref({
  ambo: [],
  ed: [],
  ip: [],
  es: [],
});

const getData = () => {
  fetch(DATA_URL)
    .then((res) => res.json())
    .then((data) => {
      dashboardData.value = data;
      currentTime.value = getCurrentTimeStr();
    });
};

let intervalId;

onMounted(() => {
  getData();
  intervalId = setInterval(getData, REFRESH_INTERVAL);
});

onBeforeUnmount(() => clearInterval(intervalId));
</script>

<style scoped>
.update-time {
  position: absolute;
  right: 20;
}

#dashboards-container {
  display: grid;
  grid-template-columns: 1fr;
}

#page-wrapper {
  text-align: center;
  background-color: #888;
}
</style>
