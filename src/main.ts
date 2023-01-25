import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './plugins/router';
import './style.scss';
import axios from './plugins/axios';
import activity from './plugins/activity';
import { createHead } from '@vueuse/head';

const app = createApp(App);
const pinia = createPinia();
const head = createHead();

app.use(router);
app.use(pinia);
app.use(axios);
app.use(activity);
app.use(head);
app.mount('#app');
