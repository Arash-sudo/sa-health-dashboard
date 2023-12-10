<template>
  <div class="container">
    <div class="bar" v-for="n in bars" :key="n"></div>
  </div>
</template>

<script setup>
import { getBarNumber } from "@/utils/getBarNumber";
import { computed } from "vue";

const props = defineProps({
  value: { type: Number, required: true },
  range: { type: Number, required: true },
  maxBars: { type: Number, required: true },
});

const bars = computed(() =>
  getBarNumber(props.value, props.range, props.maxBars)
);
</script>

<style scoped>
.container {
  display: inline-flex;
  gap: 3px;
}

.bar {
  width: 0.5rem;
  height: 1rem;
  background-color: green;
}

/* .bar:nth-child(1) {
  background-color: darkgreen;
}

.bar:nth-child(2) {
  background-color: goldenrod;
}

.bar:nth-child(3) {
  background-color: red;
}

.bar:nth-child(4) {
  background-color: purple;
} */
</style>
