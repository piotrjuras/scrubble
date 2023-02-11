import Register from '../views/Register.vue';
import Game from '../views/Game.vue';
import Login from '../views/Login.vue';
import ErrorPage from '../views/ErrorPage.vue';
import { RouteRecordRaw } from 'vue-router';

export default [
    {
        name: 'register',
        path: '/',
        component: Register
    },
    {
        name: 'game',
        path: '/game/:gamePublicId/:username',
        component: Game,
    },
    {
        name: 'game-settings',
        path: '/game/:gamePublicId/:username/settings',
        component: Game
    },
    {
        name: 'login',
        path: '/game/:gamePublicId/login',
        component: Login
    },
    {
        name: 'error',
        path: '/error',
        component: ErrorPage
    },
    {
        name: 'error-msg',
        path: '/error/:message',
        component: ErrorPage
    },
    {
        name: 'not-found',
        path: '/:catchAll(.*)',
        redirect: { name: 'error-msg', params: { message: '404' } }
    }
] as RouteRecordRaw[]