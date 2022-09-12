import { createStore, ActionContext } from 'vuex'
import VuexPersistence from 'vuex-persist'
import MyAlgoWallet from '@randlabs/myalgo-connect'


const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

type State = {
    address: string
    token: string
    username: string
}
// Create a new store instance.
const store = createStore({
    state () {
        return {
            address: "",
            token: "",
            username: ""
        }
    },
    mutations: {
        changeAddress (state: State, token: any) {
            state.address = token.wallet
        },
        removeAddress (state: State, token: boolean) {
            if(token){state.address = ""}
        },
        loginSuccess (state: State, token: any) {
            state.token = token.token
        },
        updateUsername (state: State, token: any){
            state.username = token.username
        },
        logoutReq (state: State, token: boolean){
            if(token){
                state.username = ""
                state.token = ""
                state.address = ""}
            }
        },
        actions: {
            async verifyWallet({commit, state}: ActionContext<any, State>, wallet) {
                try {
                    const res: any = await fetch('/api/verifywallet', { // /api = proxy to server (vite.config.ts) -> localhost:3000/login
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'authorization': 'Bearer '+ state.token
                        },
                        body: JSON.stringify({
                            wallet: wallet // sends saved wallet address to the backend auth/authAPI
                        })
                    })
                    const token = await res.json()
                    commit("changeAddress", await token)
                } catch (error) {
                    return
                }
            },
            
            async login({ commit }, user) { // user = username and login from userpage.vue
                try{
                    const res: any = await fetch('/api/login', { // /api = proxy to server (vite.config.ts) -> localhost:3000/login
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: user.username, // sends username and password to the backend auth/authAPI
                            password: user.password
                        })
                    })
                    const token = await res.json()
                    
                    commit('changeAddress', token)
                    commit('updateUsername', token)
                    commit('loginSuccess', token)
                    return token.status
                }
                catch (error) {
                    return
                }
            },
            async signup({ commit }, user) { // user = username and login from userpage.vue
                try{
                    const res: any = await fetch('/api/signup', { // /api = proxy to server (vite.config.ts) -> localhost:3000/signup
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: user.username, // sends username and password to the backend auth/authAPI
                            password: user.password,
                            email: user.email,
                            newsletter: user.newsletter
                        })
                    })
                    const token = await res.json()
                    commit('loginSuccess', token)
                    commit('updateUsername', token)
                    return token.status
                }
                catch(error){
                    return
                }
            },
            async logout({ commit, state }: ActionContext<any, State>){
                try {
                    const res: any = await fetch('/api/logout', { // /api = proxy to server (vite.config.ts) -> localhost:3000/logout
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'authorization': 'Bearer '+ state.token
                        },
                    })
                    const token = await res.json()
                    commit('logoutReq', token)// clears username and token from store
                } catch (error) {
                    return
                }
            },
            async removeWallet({ commit, state }: ActionContext<any, State>){
                try {
                    const res: any = await fetch('/api/removewallet', { // /api = proxy to server (vite.config.ts) -> localhost:3000/logout
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'authorization': 'Bearer '+ state.token
                        },
                    })
                    const token = await res.json()
                    commit('removeAddress', token)
                } catch (error) {
                    return
                }
            },
        },
        getters: {
            getAddress(state: State) {
                return state.address
            },
            getToken(state: State) {
                return state.token
            },
            getUsername(state: State) {
                return state.username
            },
            isLoggedIn: (state:State) => !!state.token,
            hasWalletConnected: (state:State) => !!state.address
        },

        plugins: [vuexLocal.plugin]
    })
    export default store
