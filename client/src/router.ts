import * as VueRouter from 'vue-router'

import Home from './components/Home.vue'
import Gallery from './components/Gallery.vue'

const routes: any = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/gallery',
        component: Gallery
    },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

export default router
