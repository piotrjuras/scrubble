import Register from '../views/Register.vue';
import Game from '../views/Game.vue';
import Login from '../views/Login.vue';
import ErrorPage from '../views/ErrorPage.vue';

export default [
    {
        name: 'register',
        path: '/',
        component: Register
    },
    {
        name: 'game',
        path: '/game/:gamePublicId/:username',
        component: Game
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
        name: 'spectator',
        path: '/game/:gamePublicId',
        component: Game
    },
]