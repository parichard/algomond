import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import MyAlgoWallet from '@randlabs/myalgo-connect'


const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

type State = {
  address: string
}
// Create a new store instance.
export const store = createStore({
  state () {
    return {
      address: ""
    }
  },
  mutations: {
    changeAddress (state: State, address: string) {
      state.address = address
    }
  },
  actions: {
    async connectWallet(context) {
      const myAlgoConnect = new MyAlgoWallet({ disableLedgerNano: false });

      const settings = {
          shouldSelectOneAccount: true,
          openManager: false
      };

      const accounts = await myAlgoConnect.connect(settings);
      console.log(accounts)
      context.commit("changeAddress", accounts[0].address)
    }
  },
  getters: {
    getAddress(state: State){
      return state.address
    }
  },
  plugins: [vuexLocal.plugin]
})