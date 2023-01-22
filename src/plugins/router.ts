import { createRouter, createWebHistory } from 'vue-router';
import routes from '../routes/'

const router = createRouter({
    history: createWebHistory('/scrubble'),
    routes,
})


export default router;