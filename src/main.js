import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
import vuetify from "./plugins/vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(vuetify);
Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
