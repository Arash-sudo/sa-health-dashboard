<template>
  <div class="table-title" :style="{ backgroundColor: color }">
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    default: "darkgreen",
  },
});
</script>

<style scoped>
.table-title {
  color: white;
  margin: 8px;
  border-radius: 8px;
  padding: 3px 10px;
  position: relative;
}
</style>
