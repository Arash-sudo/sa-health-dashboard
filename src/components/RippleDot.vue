<template>
  <div class="ripple-dot" :style="{ backgroundColor: color }"></div>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    default: "black",
  },
});
</script>

<style scoped>
.ripple-dot {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  position: relative;
  border: 1px solid rgb(106, 105, 105);
}

.ripple-dot::before,
.ripple-dot::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  animation: ripple 2s infinite;
}

/* .ripple-dot::after {
  animation-delay: 1s;
} */

@keyframes ripple {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
}
</style>
