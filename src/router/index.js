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
    component: Home,
    meta: { title: "ayase-music | About", desc: "" }
  },
  {
    path: "/music",
    name: "Music",
    component: Music,
    meta: { title: "ayase-music | Music", desc: "" }
  },
  {
    path: "/info",
    name: "Info",
    component: Info,
    meta: { title: "ayase-music | Info", desc: "" }
  },
  {
    path: "*",
    component: Home,
    meta: { title: "ayase-music | About", desc: "" }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
