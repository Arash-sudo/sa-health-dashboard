<template>
  <div id="header-container">
    <div id="page-header">
      <img :src="logo" alt="logo" width="80" />
      <span id="page-title">Integration Dashboard</span>
    </div>
  </div>
</template>

<script setup>
import logo from "../assets/images/Healux-Black.svg";
</script>

<style scoped>
#page-title {
  color: lightgray;
  font-size: 3rem;
  font-family: Georgia, "Times New Roman", Times, serif;
}
#page-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-block: 10px;
  gap: 1rem;
}
</style>
