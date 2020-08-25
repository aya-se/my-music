import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Music from "../views/Music.vue";
import Info from "../views/Info.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/music",
    name: "Music",
    component: Music
  },
  {
    path: "/info",
    name: "Info",
    component: Info
  },
  {
    path: "*",
    component: Home
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
