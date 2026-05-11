import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
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