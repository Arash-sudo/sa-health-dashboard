<template>
  <div>this is the main page</div>
  <Ambulance :ambo="mockData" />
  <div class="update-time">Refreshed at: {{ currentTime }}</div>
</template>

<script setup>
import Ambulance from "./components/Ambulance.vue";
import { getCurrentTimeStr } from "./utils/getCurrentTimeStr";
import { ref } from "vue";

const mockData = [
  {
    updated: "07/12/2023 10:36",
    name: "Flinders Medical Center",
    capacity: "59",
    patients: "85",
    waiting: "24",
    treated: "62",
    resuscitation: "2",
    status: "white",
  },
  {
    updated: "07/12/2023 10:36",
    name: "Lyell McEwin Hospital",
    capacity: "59",
    patients: "67",
    waiting: "14",
    treated: "55",
    resuscitation: "1",
    status: "red",
  },
  {
    updated: "07/12/2023 10:36",
    name: "Modbury Hospital",
    capacity: "36",
    patients: "29",
    waiting: "3",
    treated: "26",
    resuscitation: "0",
    status: "amber",
  },
  {
    updated: "07/12/2023 10:36",
    name: "Noarlunga Hospital",
    capacity: "26",
    patients: "36",
    waiting: "13",
    treated: "23",
    resuscitation: "0",
    status: "white",
  },
  {
    updated: "07/12/2023 10:36",
    name: "Royal Adelaide Hospital",
    capacity: "69",
    patients: "68",
    waiting: "3",
    treated: "65",
    resuscitation: "7",
    status: "red",
  },
  {
    updated: "07/12/2023 10:36",
    name: "The Queen Elizabeth Hospital",
    capacity: "29",
    patients: "38",
    waiting: "7",
    treated: "31",
    resuscitation: "2",
    status: "white",
  },
  {
    updated: "07/12/2023 10:36",
    name: "Women's and Children's Hospital",
    capacity: "35",
    patients: "13",
    waiting: "2",
    treated: "11",
    resuscitation: "0",
    status: "green",
  },
];
const currentTime = ref(getCurrentTimeStr());
</script>

<style scoped>
.update-time {
  position: absolute;
  right: 20;
}
</style>
