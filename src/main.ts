import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

const app = createApp(App);

app.use(router);

// Install BootstrapVue
//app.use(BootstrapVue);

app.mount("#app");
