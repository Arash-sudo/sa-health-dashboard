# Healux Demo project

This project is to demonstrate what the complete healux project will look like. The project can now be viewed [here](https://main.d1df8g7e5207x2.amplifyapp.com/).

## Repo

The code is hosted at gitHub. A copy of the code is hosted at Tracker. CI/CD is setup on the gitHub repo. Any changes to the main branch will be seen at the amplify address above. However, the Tracker repo is not supported by AWS therefore no CI/CD was setup for it.

GitHub: <https://github.com/TomZhong-au/sa-health-dashboard>

Tracker: <https://tracker.adverpost.com/tom/healux>

## Pages

Currently, there are two pages, the homepage '/' and a map view page '/map'.

The homepage displays a dashboard of 4 tables. These tables are abstract of the SA Health's more complex and interactive dashboards. To have a better understanding of the data in the dashboard, it is recommended to visit SA Health dashboards [here](https://www.sahealth.sa.gov.au/wps/wcm/connect/public+content/sa+health+internet/about+us/our+performance/our+hospital+dashboards).

![dashboard](/assets/sc_dashboard.png)

The map view page shows a map, identifying the hospitals and (mock) moving ambulances, the relevant data of the selected hospital and two (mock) live video feeds, one being the ambulance bay and the other being the emergency waiting room.![map](/assets/sc_map.png)

## Frontend

The frontend is developed with vue 3 with mostly composition api. The map is developed using the leaflet library.

Data is updated (fetched not pushed) from the server for every **ONE** minute. Fetched data is shared within the project using Pinia.

## Backend

The project use real-time data from SA Health's api (by inspecting the web pages of the dashboards, although not authorized). Due to **CORS** restrictions, this backend server was developed as a proxy server.

Another reason to use a dedecated backend is to minimize the workload for the frontend. The frontend might be displayed on a Zotec mini pc, which has limited computing capacity. This backend server will also handle the data fetching and data transformation.

The backend was developed with AWS Api Gateway and Lambda function to provide a on-demand api endpoint. The lambda function was written using Javascript, but it is open to use other languages to develope the backend, such as PHP, Python, Go.

The code for the lambda function is at this project at <span style="color:green">/lambda/sa_ambulance.js</span>.

A sample of the response is at this project at <span style="color:green">/lambda/response.json</span>.

## Deployment

The project is deployed using AWS Amplify.

## External resources

The following APIs are called in the lambda function.

| Data      | Source                                                                              |
| --------- | ----------------------------------------------------------------------------------- |
| Ambulance | https://www.sahealth.sa.gov.au/wps/themes/html/Portal/js/OBI_DATA/json/MHS005.json  |
| Emergency | https://www.sahealth.sa.gov.au/wps/themes/html/Portal/js/OBI_DATA/json/ED001.json   |
| Inpatient | https://www.sahealth.sa.gov.au/wps/themes/html/Portal/js/OBI_DATA/json/IP2_001.json |

note: The inpatient data is split into two groups: metro and regional.

## Personal resources

The following resources are deployed on personal account. They should be replaced with company-controlled resources as soon as possible.

| Type          | Source                                                                  |
| ------------- | ----------------------------------------------------------------------- |
| Repo          | https://github.com/TomZhong-au/sa-health-dashboard                      |
| Deployment    | https://main.d1df8g7e5207x2.amplifyapp.com/                             |
| Mock Video 01 | https://imagefromapi.s3.ap-southeast-2.amazonaws.com/ambulance_feed.mp4 |
| Mock Video 02 | https://imagefromapi.s3.ap-southeast-2.amazonaws.com/emergency_feed.mp4 |
