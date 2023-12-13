import "./assets/main.css";

import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import Dashboard from "./pages/Dashboard.vue";
import Map from "./pages/Map.vue";

const routes = [
  { path: "/", name: "Home", component: Dashboard },
  { path: "/map", name: "About", component: Map },
];

const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

const app = createApp(App);
app.use(router);

app.mount("#app");
