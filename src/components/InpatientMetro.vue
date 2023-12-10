<template>
  <DashboardWrapper>
    <div id="wrapper">
      <TableTitle color="deepskyBlue">
        Inpatient Activity - <strong>Metropolitan</strong>
      </TableTitle>
      <table class="table dashboard-table">
        <thead>
          <tr>
            <th rowspan="2">Hospital</th>
            <th colspan="3" class="table-head">General Ward</th>
            <th colspan="3" class="table-head">Entire Hospital</th>
          </tr>
          <tr>
            <th v-for="header in TABLE_HEADERS" :key="header">{{ header }}</th>
            <th v-for="header in TABLE_HEADERS" :key="header">{{ header }}</th>
          </tr>
        </thead>

        <tbody class="table-body">
          <tr v-for="hospital in data" :key="hospital.name">
            <td>{{ hospital.name }}</td>
            <td>{{ hospital.generalWard.waiting }}</td>
            <td>{{ hospital.generalWard.admitted }}</td>
            <td>{{ hospital.generalWard.capacity }}</td>
            <td>{{ hospital.hospitalStats.waiting }}</td>
            <td>{{ hospital.hospitalStats.admitted }}</td>
            <td>{{ hospital.hospitalStats.capacity }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </DashboardWrapper>
</template>

<script setup>
import DashboardWrapper from "./DashboardWrapper.vue";
import TableTitle from "./TableTitle.vue";
import StrenghBar from "./StrenghBar.vue";
const TABLE_HEADERS = ["WFB_ED", "admitted_Total", "capacity"];

const props = defineProps(["data"]);
</script>

<style scoped>
td:nth-child(1) {
  font-size: 0.9rem;
}
#wrapper {
  display: inline;
}
th[colspan="3"].table-head {
  background-color: rgb(72, 0, 255);
  color: white;
  border-right: 1px solid white;
}
</style>
