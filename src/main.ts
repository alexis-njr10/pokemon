import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from "./plugins/router";
import { loading, setLoading } from './plugins/loading';
import { createPinia } from "pinia";
import app from "./app";
import "./plugins";
import "./assets/css/app.css";
import "./assets/styles.scss";
//import '@/assets/tailwind.css';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.provide('loading', loading);
app.provide('setLoading', setLoading);

app.mount("#app");

