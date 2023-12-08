<template>
  <DashboardWrapper>
    <div class="table-title">
      <TableTitle> Ambulance Service </TableTitle>
    </div>
    <table class="table dashboard-table">
      <thead>
        <tr>
          <th v-for="header in TABLE_HEADERS" :key="header">{{ header }}</th>
        </tr>
      </thead>

      <tbody class="table-body">
        <tr v-for="hospital in ambo" :key="hospital.name">
          <td>{{ hospital.name }}</td>
          <td>
            <RippleDot :color="hospital.status" />
          </td>
          <td>{{ hospital.capacity }}</td>
          <td>{{ hospital.patients }}</td>
          <td>{{ hospital.waiting }}</td>
          <td>{{ hospital.treated }}</td>
          <td>{{ hospital.resuscitation }}</td>
        </tr>
      </tbody>
    </table>
  </DashboardWrapper>
</template>

<script setup>
import DashboardWrapper from "./DashboardWrapper.vue";
import TableTitle from "./TableTitle.vue";
import RippleDot from "./RippleDot.vue";
const TABLE_HEADERS = [
  "name",
  "status",
  "capacity",
  "patients",
  "waiting",
  "treated",
  "resus",
];

const currentTime = new Date();
const props = defineProps(["ambo"]);
</script>

<style scoped>
td:nth-child(1) {
  font-size: 0.9rem;
}
</style>
