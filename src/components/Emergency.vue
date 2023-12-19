<template>
  <DashboardWrapper>
    <div id="wrapper">
      <TableTitle> Emergency Department </TableTitle>
      <table class="table dashboard-table">
        <thead>
          <tr>
            <th v-for="header in TABLE_HEADERS" :key="header">{{ header }}</th>
          </tr>
        </thead>

        <tbody class="table-body">
          <tr v-for="hospital in data" :key="hospital.name">
            <td>{{ hospital.name }}</td>
            <td>
              <div style="display: flex; justify-content: center">
                <RippleDot :color="hospital.status" />
              </div>
            </td>
            <td>{{ hospital.capacity }}</td>
            <td>{{ hospital.patients }}</td>
            <td>{{ hospital.waiting }}</td>
            <td>{{ hospital.treated }}</td>
            <td>{{ hospital.expecting }}</td>
            <td>{{ Math.round(Number(hospital.waitTime)) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </DashboardWrapper>
</template>

<script setup>
import TableTitle from "./TableTitle.vue";
import RippleDot from "./RippleDot.vue";
import DashboardWrapper from "./DashboardWrapper.vue";
const TABLE_HEADERS = [
  "name",
  "status",
  "capacity",
  "patients",
  "waiting",
  "treated",
  "expecting",
  "wait_time",
];

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
