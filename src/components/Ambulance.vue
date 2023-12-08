<template>
  <div id="wrapper">
    <div class="table-title">
      <TableTitle> Ambulance cleared in the last 3 hours </TableTitle>
    </div>
    <table class="table dashboard-table">
      <thead>
        <tr>
          <th v-for="header in TABLE_HEADERS" :key="header">{{ header }}</th>
        </tr>
      </thead>

      <tbody class="table-body">
        <tr v-for="hospital in data" :key="hospital.name">
          <td>{{ hospital.number }}</td>
          <td>{{ hospital.time }}</td>
          <td>{{ hospital.plus30 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import TableTitle from "./TableTitle.vue";
const TABLE_HEADERS = ["number", "Minutes to clear", ">30 Min"];

const props = defineProps(["data"]);
</script>

<style scoped>
td:nth-child(1) {
  font-size: 0.9rem;
}
#wrapper {
  display: inline;
}
</style>
