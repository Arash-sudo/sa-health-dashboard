// the following code is from lamda function from aws
// this lambda function, together with the api gateway, serves as a proxy server to allow us to access data from sahealth.sa.gov.au
// it also does some simple data transformation

/*global fetch*/

export const handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
  };

  let responseData = {};

  const DATA_URL = {
    ambo: "https://www.sahealth.sa.gov.au/wps/themes/html/Portal/js/OBI_DATA/json/MHS005.json",
    ed: "https://www.sahealth.sa.gov.au/wps/themes/html/Portal/js/OBI_DATA/json/ED001.json",
  };
  try {
    const responses = await Promise.all([
      fetch(DATA_URL.ambo),
      fetch(DATA_URL.ed),
    ]);
    const data = await Promise.all(
      responses.map((response) => response.json())
    );

    responseData.ambo = data[0]
      .filter((item) => {
        if (!item.HOSP_SHORT) return false;
        if (item.HOSP_SHORT === "RGH") return false;
        return true;
      })
      .sort((a, b) => a.HOSP_SHORT.localeCompare(b.HOSP_SHORT))
      .map(formatAmbulanceData);

    responseData.ed = data[1]
      .filter((item) => item.HOSP_SHORT)
      .map(formatEmergencyData);
  } catch (error) {
    responseData = error;
  }

  console.log(responseData);

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

const HOSPITAL_NAMES = {
  FMC: "Flinders Medical Center",
  LMH: "Lyell McEwin Hospital",
  MH: "Modbury Hospital",
  NHS: "Noarlunga Hospital",
  RAH: "Royal Adelaide Hospital",
  TQEH: "The Queen Elizabeth Hospital",
  WCH: "Women's & Children's Hospital",
  WCHP: "Women's & Children's Hospital",
};

function formatAmbulanceData(data) {
  const formatted = {
    name: HOSPITAL_NAMES[data.HOSP_SHORT] || data.HOSP_SHORT,
    number: data.CLR,
    time: data.ACT,
    plus30: data.Plus30Min,
  };
  return formatted;
}

function formatEmergencyData(data) {
  const totalPatients = Number(data.WTBS) + Number(data.COM_TREAT);
  const formatted = {
    updated: data.DTM,
    name: HOSPITAL_NAMES[data.HOSP_SHORT] || data.HOSP_SHORT,
    expecting: data.EA,
    patients: totalPatients,
    waiting: data.WTBS,
    treated: data.COM_TREAT,
    capacity: data.CAP,
    waitTime: data.AVG_WAIT,
    status: capacityToStatus(totalPatients / Number(data.CAP)),
  };
  return formatted;
}
