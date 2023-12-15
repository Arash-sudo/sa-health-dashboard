import { getCurrentTimeStr } from "@/utils/getCurrentTimeStr";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useDashboardStore = defineStore("dashboard", () => {
  const dashboardData = ref({
    ambo: [],
    ed: [],
    ip: {
      metro: [],
      country: [],
    },
    es: [],
  });
  const setDashboardData = (data) => {
    dashboardData.value = data;
  };
  const currentTime = getCurrentTimeStr();
  const updateTime = ref(currentTime);

  const setUpdateTime = (time) => {
    updateTime.value = time;
  };

  const selectedHospitalID = ref("01");

  const selectedHospitalData = computed(() => {
    // if (dashboardData.value.length === 0) return {};
    // return dashboardData.value.find(
    //   (hospital) => hospital.id === selectedHospitalID.value
    // );
  });

  const selectHospital = (id) => {
    selectedHospitalID.value = id;
  };

  return {
    dashboardData,
    setDashboardData,
    selectHospital,
    selectedHospitalData,
    updateTime,
    setUpdateTime,
  };
});
