import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist';


const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

// Create a new store instance.
export const store = createStore({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  plugins: [vuexLocal.plugin]
})