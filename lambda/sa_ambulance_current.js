/*global fetch*/

export const handler = async (event) => {
  const HOSPITAL_NAMES = {
    FMC: "Flinders Medical Center",
    LMH: "Lyell McEwin Hospital",
    MH: "Modbury Hospital",
    NHS: "Noarlunga Hospital",
    RAH: "Royal Adelaide Hospital",
    TQEH: "The Queen Elizabeth Hospital",
    WCH: "Women's & Children's Hospital",
  };
  const headers = {
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
  };
  function formatHospitalData(data) {
    const formatted = {
      updated: data.DTM1,
      name: HOSPITAL_NAMES[data.HOSP_SHORT],
      capacity: data.CAP,
      patients: data.TOT,
      waiting: data.WTBS,
      treated: data.BT,
      resuscitation: data.RESUS,
      status: capacityToStatus(data.TOT / data.CAP),
    };
    return formatted;
  }
  let responseData = {};

  const AMBO_DATA_URL =
    "https://www.sahealth.sa.gov.au/wps/themes/html/Portal/js/OBI_DATA/json/MHS001.json";

  try {
    const response = await fetch(AMBO_DATA_URL);
    const data = await response.json();

    responseData = data
      .filter((item) => item.HOSP_SHORT)
      .map(formatHospitalData);
  } catch (error) {
    responseData = error;
  }

  return {
    statusCode: 200,
    body: JSON.stringify(responseData),
    headers,
  };
};

function capacityToStatus(percentage) {
  const colorDict = [
    { limit: 0.8, color: "green" },
    { limit: 0.95, color: "goldenrod" },
    { limit: 1.25, color: "red" },
  ].sort((a, b) => a.limit - b.limit);

  for (const { limit, color } of colorDict) {
    if (percentage <= limit) {
      return color;
    }
  }
  return "white";
}
