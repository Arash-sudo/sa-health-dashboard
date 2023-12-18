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

const HOSPITALS = [
  {
    id: "01",
    name: "Flinders Medical Center",
    shortName: "FMC",
    type: "METRO",
  },
  { id: "02", name: "Lyell McEwin Hospital", shortName: "LMH", type: "METRO" },
  { id: "03", name: "Modbury Hospital", shortName: "MH", type: "METRO" },
  { id: "04", name: "Noarlunga Hospital", shortName: "NHS", type: "METRO" },
  {
    id: "05",
    name: "Royal Adelaide Hospital",
    shortName: "RAH",
    type: "METRO",
  },
  {
    id: "06",
    name: "The Queen Elizabeth Hospital",
    shortName: "TQEH",
    type: "METRO",
  },
  {
    id: "07",
    name: "Women's & Children's Hospital",
    shortName: "WCH",
    type: "METRO",
  },
  {
    id: "07",
    name: "Women's & Children's Hospital",
    shortName: "WCHP",
    type: "METRO",
  },
  { id: "08", name: "Glenside", shortName: "GLN", type: "METRO" },
  { id: "09", name: "James Nash House", shortName: "JNH", type: "METRO" },
  {
    id: "10",
    name: "Hampstead Rehab Centre",
    shortName: "HAMP",
    type: "METRO",
  },
  { id: "11", name: "Berri Hospital", shortName: "RRHS", type: "COUNTRY" },
  {
    id: "12",
    name: "Gawler Health Service",
    shortName: "Gawler H",
    type: "COUNTRY",
  },
  {
    id: "13",
    name: "Mt Gambier Health Service",
    shortName: "MGDH",
    type: "COUNTRY",
  },
  { id: "14", name: "Pt Augusta Hospital", shortName: "PAHS", type: "COUNTRY" },
  { id: "15", name: "Pt Lincoln Hospital", shortName: "PLHH", type: "COUNTRY" },
  { id: "16", name: "Pt Pirie Hospital", shortName: "PPRH", type: "COUNTRY" },
  { id: "17", name: "Whyalla Hospital", shortName: "WHHS", type: "COUNTRY" },
  { id: "18", name: "Helen Mayo House", shortName: "HMH", type: "METRO" },
  // ... Add other hospitals as needed
];

function getHospitalDetails(shortCode) {
  const hospital = HOSPITALS.find((h) => h.shortName === shortCode);
  return (
    hospital || { id: null, name: shortCode, shortName: shortCode, type: null }
  );
}

function formatAmbulanceData(data) {
  const hospitalDetails = getHospitalDetails(data.HOSP_SHORT);
  const formatted = {
    id: hospitalDetails.id,
    name: hospitalDetails.name,
    shortName: hospitalDetails.shortName,
    type: hospitalDetails.type,
    number: data.CLR,
    time: data.ACT,
    plus30: data.Plus30Min,
  };
  return formatted;
}

function formatEmergencyData(data) {
  const hospitalDetails = getHospitalDetails(data.HOSP_SHORT);
  const totalPatients = Number(data.WTBS) + Number(data.COM_TREAT);
  const formatted = {
    id: hospitalDetails.id,
    name: hospitalDetails.name,
    shortName: hospitalDetails.shortName,
    type: hospitalDetails.type,
    updated: data.DTM,
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
  const hospitalDetails = getHospitalDetails(data.HOSP_SHORT);
  return {
    id: hospitalDetails.id,
    name: hospitalDetails.name,
    shortName: hospitalDetails.shortName,
    type: hospitalDetails.type,
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
