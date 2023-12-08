<template>
  <div>this is the main page</div>
  <Ambulance :ambo="dashboardData.ambo" />
  <div class="update-time">Refreshed at: {{ currentTime }}</div>
</template>

<script setup>
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
</style>
