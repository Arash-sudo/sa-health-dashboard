<template>
  <div>
    <div id="title">
      Real time hospital data for {{ selectedHospitalData.name }}
    </div>
    <Emergency :data="selectedHospitalData.ed" />
    <Ambulance :data="selectedHospitalData.ambo" />
  </div>
</template>

<script setup>
import { useDashboardStore } from "@/stores/dashboard";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import Emergency from "../Emergency.vue";
import Ambulance from "../Ambulance.vue";

const { selectedHospitalData } = storeToRefs(useDashboardStore());
</script>

<style scoped></style>
