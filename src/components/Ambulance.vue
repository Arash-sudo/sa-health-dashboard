<template>
  <DashboardWrapper>
    <div id="wrapper">
      <TableTitle color="red">
        Ambulance cleared in the last 3 hours
      </TableTitle>
      <table class="table dashboard-table">
        <thead>
          <tr>
            <th v-for="header in TABLE_HEADERS" :key="header">{{ header }}</th>
          </tr>
        </thead>

        <tbody class="table-body">
          <tr v-for="hospital in data" :key="hospital.name">
            <td>{{ hospital.name }}</td>
            <td>{{ hospital.number }}</td>
            <td>
              <div style="display: flex; justify-content: center">
                <span>{{ hospital.time }}</span>
                <StrenghBar :value="hospital.time" range="60" />
              </div>
            </td>
            <td>{{ hospital.plus30 }}</td>
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
const TABLE_HEADERS = ["name", "number", "Minutes to clear", ">30 Min"];

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
