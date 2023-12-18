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
    if (dashboardData.value.ambo.length === 0)
      return { ambo: [], ed: [], ip: [], es: [] };

    return {
      id: selectedHospitalID.value,
      name: dashboardData.value.ambo.find(filterHospitalData).name,
      ambo: dashboardData.value.ambo.filter(filterHospitalData),
      ed: dashboardData.value.ed.filter(filterHospitalData),
      ip: dashboardData.value.ip.metro
        .filter(filterHospitalData)
        .concat(dashboardData.value.ip.country.filter(filterHospitalData)),
    };
  });

  const selectHospital = (id) => {
    selectedHospitalID.value = id;
  };

  function filterHospitalData(hospital) {
    return hospital.id === selectedHospitalID.value;
  }

  return {
    dashboardData,
    setDashboardData,
    selectHospital,
    selectedHospitalData,
    updateTime,
    setUpdateTime,
  };
});
