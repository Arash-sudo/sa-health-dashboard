import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useDashboardStore = defineStore("dashboard", () => {
  const dashboard = ref([]);
  const selectedHospitalID = ref("01");

  const selectedHospitalData = computed(() => {
    if (dashboard.value.length === 0) return {};
    return dashboard.value.find(
      (hospital) => hospital.id === selectedHospitalID.value
    );
  });
  const setDashboard = (data) => {
    dashboard.value = data;
  };

  const selectHospital = (id) => {
    selectedHospitalID.value = id;
  };

  return { dashboard, setDashboard, selectHospital, selectedHospitalData };
});
