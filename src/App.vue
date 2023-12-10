<template>
  <div id="page-wrapper">
    <div id="page-header">
      <img src="../src/assets/images/healux4.png" alt="logo" width="150" />
      <span id="page-title">Integration Dashboard</span>
    </div>
    <div class="dashboards-container">
      <Emergency :data="dashboardData.ed" />
      <Ambulance :data="dashboardData.ambo" />
      <InpatientMetro :data="dashboardData.ip.metro" />
      <InpatientMetro :data="dashboardData.ip.metro" />
    </div>
    <div class="update-time">Refreshed at: {{ currentTime }}</div>
  </div>
</template>

<script setup>
import Emergency from "./components/Emergency.vue";
import Ambulance from "./components/Ambulance.vue";
import InpatientMetro from "./components/InpatientMetro.vue";
import { getCurrentTimeStr } from "./utils/getCurrentTimeStr";
import { ref, onMounted, onBeforeUnmount } from "vue";
import StrenghBar from "./components/StrenghBar.vue";

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
  color: seashell;
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

#page-wrapper {
  text-align: center;
  background-color: #888;
  /* height: 100vh; */
}

#page-title {
  color: rgb(229, 227, 227);
  font-size: 3rem;
  font-family: Georgia, "Times New Roman", Times, serif;
}
#page-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-block: 10px;
}
</style>
