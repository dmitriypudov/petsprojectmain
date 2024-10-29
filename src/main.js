import { createApp } from "vue";
import { createPinia } from "pinia";
import { Quasar, Dialog, Loading } from "quasar";
import { initializeApp } from "firebase/app";

import "@quasar/extras/material-icons/material-icons.css";

import "quasar/dist/quasar.css";

import "./style.css";
import App from "./App.vue";
import router from "./router";

import { languages } from "./i18n";
import { defaultLocale } from './i18n';
import { createI18n, useI18n } from 'vue-i18n';

const localeStorageLang = localStorage.getItem('lang')

const messages = Object.assign(languages)
const i18n = createI18n({
  legacy: false,
  locale: localeStorageLang || defaultLocale,
  fallbackLocale: 'ru',
  messages
})

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(Quasar, {
  plugins: {
    Dialog,
    Loading,
  },
});

app.use(i18n);

app.mixin({
  setup () {
    const { t } = useI18n();
    return { t };
  },
});

app.mount("#app");

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

initializeApp(firebaseConfig);