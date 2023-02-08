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
        children: [
            {
                name: 'game-settings',
                path: 'settings',
                component: Game,
                children: [
                    {
                        name: 'game-settings-test',
                        path: 'test',
                        component: Game
                    }
                ]
            },
            {
                name: 'game-second',
                path: '2',
                component: Game,
                children: [
                    {
                        name: 'game-second-test',
                        path: 'test',
                        component: Game
                    }
                ]
            }
        ]
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
        name: 'spectator',
        path: '/game/:gamePublicId',
        component: Game
    },
    {
        name: 'not-found',
        path: '/:catchAll(.*)',
        redirect: { name: 'error-msg', params: { message: '404' } }
    }
] as RouteRecordRaw[]