<template>
  <div>
    <PageHeader />
    <div class="update-time">Refreshed at: {{ currentTime }}</div>

    <div class="dashboards-container grid-container">
      <Emergency :data="dashboardData.ed" />
      <Ambulance :data="dashboardData.ambo" />
      <InpatientMetro :data="slicedMetroInpatient" />
      <InpatientCountry :data="dashboardData.ip.country" />
    </div>
  </div>
</template>

<script setup>
import Emergency from "../components/Emergency.vue";
import Ambulance from "../components/Ambulance.vue";
import InpatientMetro from "../components/InpatientMetro.vue";
import { getCurrentTimeStr } from "../utils/getCurrentTimeStr";
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import InpatientCountry from "../components/InpatientCountry.vue";
import PageHeader from "../components/PageHeader.vue";

const DATA_URL =
  "https://3hosqj1dol.execute-api.ap-southeast-2.amazonaws.com/default/ambulance";
const REFRESH_INTERVAL = 60000;

const currentTime = ref(getCurrentTimeStr());
const dashboardData = ref({
  ambo: [],
  ed: [],
  ip: {
    metro: [],
    country: [],
  },
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

const slicedMetroInpatient = computed(
  () => dashboardData.value.ip.metro.slice(0)
  // use the slice method to make it possible for a shorter list
);

onBeforeUnmount(() => clearInterval(intervalId));
</script>

<style scoped>
.update-time {
  color: seashell;
  position: absolute;
  top: 4.7rem;
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
</style>
