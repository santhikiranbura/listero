import { createRouter, createWebHistory } from "vue-router";

import List from '../components/List';
import Lists from '../components/Lists';

const routes = [
    {
        path: '/list',
        name: 'List',
        component: List
    },
    {
        path: '/',
        name: 'Lists',
        component: Lists
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL), routes
});

export default router;