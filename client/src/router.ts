import  * as VueRouter from 'vue-router'
import store from './store'

import Home from './components/Home.vue'
import Gallery from './components/Gallery.vue'
import UserPage from './components/UserPage.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'

const verify = async () => { // user = username and login from userpage.vue
    try{
        if(!store.state.token) {
            throw new Error('token not found')
        }
        const res: any = await fetch('/api/verify', { // /api = proxy to server (vite.config.ts) -> localhost:3000/login
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+ window.localStorage.token
            },
        })
        const response = await res.json()

        console.log(response)

        return true
    }
    catch (error) {
        return false
    }
}

const verifyAuth = async (to, from, next) => {
    if (to.name !== 'Login' && !store.state.token) next('/login')
    else next()

    // reject the navigation
}
const routes: any = [
    {
        path: '/',
        component:Home
    },
    {
        path: '/gallery',
        component: Gallery
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/users',
        component: UserPage,
        beforeEnter: verifyAuth,
    },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHashHistory(),
    routes: routes, // short for `routes: routes`
})
export default router
