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

  let responseData = { ip: {} };

  const DATA_URL = {
    ambo: "https://www.sahealth.sa.gov.au/wps/themes/html/Portal/js/OBI_DATA/json/MHS005.json",
    ed: "https://www.sahealth.sa.gov.au/wps/themes/html/Portal/js/OBI_DATA/json/ED001.json",
    ip: "https://www.sahealth.sa.gov.au/wps/themes/html/Portal/js/OBI_DATA/json/IP2_001.json",
  };
  try {
    const responses = await Promise.all([
      fetch(DATA_URL.ambo),
      fetch(DATA_URL.ed),
      fetch(DATA_URL.ip),
    ]);
    const data = await Promise.all(
      responses.map((response) => response.json())
    );

    // process ambulance data
    responseData.ambo = data[0]
      .filter((item) => {
        if (!item.HOSP_SHORT) return false;
        if (item.HOSP_SHORT === "RGH") return false;
        return true;
      })
      .sort((a, b) => a.HOSP_SHORT.localeCompare(b.HOSP_SHORT))
      .map(formatAmbulanceData);

    // process emergency department data
    responseData.ed = data[1]
      .filter((item) => item.HOSP_SHORT)
      .map(formatEmergencyData);

    // split the inpatient data into two groups, metro and country
    responseData.ip.metro = data[2]
      .filter((item) => item.HOSP_TYPE === "METRO")
      .map(formatIpData);

    responseData.ip.country = data[2]
      .filter((item) => item.HOSP_TYPE === "COUNTRY")
      .map(formatIpData);
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

const HOSPITAL_NAMES = {
  FMC: "Flinders Medical Center",
  LMH: "Lyell McEwin Hospital",
  MH: "Modbury Hospital",
  NHS: "Noarlunga Hospital",
  RAH: "Royal Adelaide Hospital",
  TQEH: "The Queen Elizabeth Hospital",
  WCH: "Women's & Children's Hospital",
  WCHP: "Women's & Children's Hospital",
  GLN: "Glenside",
  JNH: "James Nash House",
  HAMP: "Hampstead Rehab Centre",
  RRHS: "Berri Hospital",
  "Gawler H": "Gawler Health Service",
  MGDH: "Mt Gambier Health Service",
  PAHS: "Pt Augusta Hospital",
  PLHH: "Pt Lincoln Hospital",
  PPRH: "Pt Pirie Hospital",
  WHHS: "Whyalla Hospital",
  HMH: "Helen Mayo House",
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

function formatIpData(data) {
  return {
    name: HOSPITAL_NAMES[data.HOSP_SHORT] || data.HOSP_SHORT,
    generalWard: {
      waiting: data.WFB_GEN,
      admitted: data.OCC_GEN,
      capacity: data.BASE,
    },
    hospitalStats: {
      waiting: data.WFB_ALL,
      admitted: data.OCC_ALL,
      capacity: data.CAP,
    },
  };
}
