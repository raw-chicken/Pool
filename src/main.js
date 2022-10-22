import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);
const vuetify = createVuetify()

app.use(createPinia());
app.use(vuetify)
app.use(router);

app.mount('#app');
