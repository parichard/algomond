import { createStore } from 'vuex'
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
export const store = createStore({
  state () {
    return {
      address: "",
      token: "",
      username: ""
    }
  },
  mutations: {
    // setAddress(state: State, address: string){
    //   state.address = address
    // },
    changeAddress (state: State, token: string) {
      state.address = token['wallet']
    },
    removeAddress (state: State, token: boolean) {
      if(token){state.address = ""}
    },
    loginSuccess (state: State, token: string) {
      state.token = token['token']
    },
    updateUsername (state: State, token: string){
      state.username = token['username']
    },
    logoutReq (state: State, token: boolean){
      if(token){
      state.username = ""
      state.token = ""
      state.address = ""}
    }
  },
  actions: {
    async verifyWallet({commit}, wallet) {
      const res: any = await fetch('/api/verifywallet', { // /api = proxy to server (vite.config.ts) -> localhost:3000/login
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': 'Bearer '+ this.state['token']
        },
        body: JSON.stringify({
          wallet: wallet // sends saved wallet address to the backend auth/authAPI
        })
      })
      let token
      try {
        token = await res.json()
        commit("changeAddress", await token)
      } catch (error) {
        console.log('error')
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
        let token
        token = await res.json()
        commit('changeAddress', token)
        commit('updateUsername', token)
        commit('loginSuccess', token)
        return token['status']
      }
      catch (error) {
        console.log('error')
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
        let token
        token = await res.json()
        commit('loginSuccess', token)
        commit('updateUsername', token)
        return token['status']
      }
      catch(error){
        console.log(error)
      }
    },

    async logout({ commit }){
      const res: any = await fetch('/api/logout', { // /api = proxy to server (vite.config.ts) -> localhost:3000/logout
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': 'Bearer '+ this.state['token']
        },
        })
        let token
        try {
          token = await res.json()
        } catch (error) {
          console.log('error')
        }
        commit('logoutReq', await token)// clears username and token from store
    },
    async removeWallet({ commit }){
      const res: any = await fetch('/api/removewallet', { // /api = proxy to server (vite.config.ts) -> localhost:3000/logout
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': 'Bearer '+ this.state['token']
        },
        })
        let token
        try {
          token = await res.json()
        } catch (error) {
          console.log('error')
        }
        commit('removeAddress', await token)
    }
  },
  getters: {
    getAddress(state: State){
      return state['address']
    },
    getToken(state: State){
      return state.token
    },
    getUsername(state: State){
      return state.username
    },
    isLoggedIn: (state:State) => !!state.token,
    hasWalletConnected: (state:State) => !!state.address
  },

  plugins: [vuexLocal.plugin]
})
