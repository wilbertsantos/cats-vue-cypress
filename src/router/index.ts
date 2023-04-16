import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../components/Home.vue";
import CatDetails from "../components/CatDetails.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: Home },
  { path: "/:id", component: CatDetails },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
