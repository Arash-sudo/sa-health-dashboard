<template>
  <div class="live-feed-unit">
    <div class="live-feed-subtitle">{{ props.title }}</div>
    <img :src="props.source" width="400" height="266" />
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, required: true },
  source: { type: String, required: true },
});
</script>

<style lang="scss" scoped></style>
