import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './plugins/router';
import './style.scss';
import axios from './plugins/axios';

const app = createApp(App);
const pinia = createPinia();

app.use(axios);
app.use(router);
app.use(pinia);
app.mount('#app');
