import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../components/Home.vue')
        },
        {
            path: '/item/:id',
            name: 'itemDetail',
            props: true,
            component: () => import('../components/ItemDetailView.vue')
        }
    ]
})

export default router;