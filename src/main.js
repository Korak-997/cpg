import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import UUID from "vue-uuid";

createApp(App)
  .use(router)
  .use(UUID)
  .mount("#app");
