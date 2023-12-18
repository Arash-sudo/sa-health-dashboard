<template>
  <div>this component will display hospital stats in one or more tables.</div>
</template>

<script setup>
import { useDashboardStore } from "@/stores/dashboard";
import { storeToRefs } from "pinia";
import { watch } from "vue";

const { selectedHospitalData } = storeToRefs(useDashboardStore());

watch(selectedHospitalData, (newValue) => {
  console.log(newValue);
});
</script>

<style scoped></style>
