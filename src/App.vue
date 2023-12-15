<template>
  <div id="page-wrapper">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { getCurrentTimeStr } from "./utils/getCurrentTimeStr";

import { useDashboardStore } from "@/stores/dashboard";
const { setDashboardData, setUpdateTime } = useDashboardStore();

const DATA_URL =
  "https://3hosqj1dol.execute-api.ap-southeast-2.amazonaws.com/default/ambulance";
const REFRESH_INTERVAL = 60000;

const getData = () => {
  fetch(DATA_URL)
    .then((res) => res.json())
    .then((data) => {
      setDashboardData(data);
      setUpdateTime(getCurrentTimeStr());
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
#page-wrapper {
  text-align: center;
  background-color: #888;
  /* height: 100vh; */
}
</style>
