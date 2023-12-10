<template>
  <div class="strenghbar-container">
    <div class="bar" v-for="n in bars" :key="n"></div>
  </div>
</template>

<script setup>
import { getBarNumber } from "@/utils/getBarNumber";
import { computed } from "vue";

const props = defineProps({
  value: { type: Number, required: true },
  range: { type: Number, required: true },
  maxBars: { type: Number, default: 6 }, // the color transition is set for 6 bars
});

const bars = computed(() =>
  getBarNumber(props.value, props.range, props.maxBars)
);
</script>

<style scoped>
.strenghbar-container {
  display: inline-flex;
  gap: 3px;
  position: relative;
  margin-left: 1rem;
  width: 5rem;
}

.bar {
  width: 0.5rem;
  height: 1rem;
  background-color: green;
  bottom: -5px;
  position: relative;
}

.bar:nth-child(1) {
  background-color: #006400; /* Dark Green */
}

.bar:nth-child(2) {
  background-color: #6d8410;
}

.bar:nth-child(3) {
  background-color: #daa520; /* Goldenrod */
}

.bar:nth-child(4) {
  background-color: #e66e15;
}

.bar:nth-child(5) {
  background-color: #f3370b;
}

.bar:nth-child(6) {
  background-color: #ff0000; /* Red */
}
</style>
