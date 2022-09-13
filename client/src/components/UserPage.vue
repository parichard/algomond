<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore, mapGetters } from 'vuex'
import { useRouter } from 'vue-router'
import algosdk from 'algosdk'
import MyAlgoConnect from '@randlabs/myalgo-connect'

// import Vuelidate from 'vuelidate'
import Swal from 'sweetalert2'

const store = useStore()
const router = useRouter()

const loadingVerifyWalletStep1: any = ref(false)
const loadingVerifyWalletStep2: any = ref(false)

const errors = ref([])

const myAlgoConnect = new MyAlgoConnect();
const algodClient = new algosdk.Algodv2('','https://node.algoexplorerapi.io', '');

async function connectWallet() {
    const myAlgoConnect = new MyAlgoConnect({ disableLedgerNano: false });

    const settings = {
        shouldSelectOneAccount: true,
        openManager: false
    };

    const accounts = await myAlgoConnect.connect(settings);
    return accounts[0].address
}
async function maketxs(){
    loadingVerifyWalletStep1.value = true
    const wallet = await connectWallet()
    loadingVerifyWalletStep2.value = true
    const suggestedParams = await algodClient.getTransactionParams().do()
    const amountInMicroAlgos = algosdk.algosToMicroalgos(0)
    const username = store.getters.getUsername
    let utf8Encode = new TextEncoder();
    const note = utf8Encode.encode(username)

    const unsignedTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: wallet,
        to: wallet,
        note: note,
        amount: amountInMicroAlgos,
        suggestedParams: suggestedParams,
    })
    const signedTxn = await myAlgoConnect.signTransaction(unsignedTxn.toByte())
    const response = await algodClient.sendRawTransaction(signedTxn.blob).do()
    try {
        response
        verifyWallet(wallet)
    }
    catch(error){
        loadingVerifyWalletStep1.value = false
        loadingVerifyWalletStep2.value = false
        return
    }
}

const getAddress = computed(() => {
    //const address =
    return store.getters.getAddress
})

const getFormattedAddress= computed(() =>{
    let address = store.getters.getAddress
    return (address ? address.slice(0,7) +  '...' + address.slice(51, 58) : '')
})

const getUserName = computed(() => {
    const username = store.getters.getUsername
    return username
})

const verifyWallet = async (wallet) => {
    try {
        let status = await store.dispatch('verifyWallet', wallet) // sends request to store to verify wallet
        if (status !== 200) throw new Error ('Unknown Error Occured')
        if (status === 200){
            Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            icon: 'success',
            title: 'Successfully Linked Wallet!'
        })
        loadingVerifyWalletStep1.value = false
        loadingVerifyWalletStep2.value = false
        }
    } catch (error) {
         Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            icon: 'error',
            title: 'Unknown Error Occured'
        })
        loadingVerifyWalletStep1.value = false
        loadingVerifyWalletStep2.value = false
        return
    }
}

const signoutUser = async () => {
    try {
        let status = await store.dispatch('logout') // sends request to store for logging out
        //console.log(store.getters.isLoggedIn) // store answer to say if user is now logged in (with the authentification token)
        if (status !== true){
            Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                icon: 'error',
                title: 'Unknown Error Occured',
            })
        }
        else if (!store.getters.isLoggedIn){
            Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                icon: 'info',
                title: 'Successfully Logged Out!',
            })
            router.push('/')
        }
    } catch (error) {
        return
    }
}
function removeWalletPopUp(){
    Swal.fire({
        title: 'Are you sure?',
        text: "This will remove the wallet from your Algomond account",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
        if (result.isConfirmed) {
            removeWallet()
        }
    })
}

const removeWallet = async () => {
    try {
        let status = await store.dispatch('removeWallet') // sends request to store for logging out
        if (status !== true){
            Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                icon: 'error',
                title: 'Unknown Error Occured',
            })
        }
        else{
            Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                icon: 'success',
                title: 'Wallet Successfully Removed',
            })

        }
    } catch (error) {
        return
    }
}

function gotogallery(){
    router.push('/gallery')
}

</script>

<template>
    <div class="w-full md:w-4/12 p-6 rounded-lg mx-auto mt-24 formback">
        <!-- UserPage -->
        <h1>{{getUserName}}</h1>
            <hr />
        <div class="wallet-info" v-if="store.getters.hasWalletConnected">

            <div class="inline" v-if="store.getters.hasWalletConnected">
                <p>
                    Your connected wallet: <a :href= "'https://algoexplorer.io/address/' + getAddress " target="_blank">{{getFormattedAddress}}</a>
                </p>
                <button class="button removewalletbutton" @click="removeWalletPopUp()">
                    X
                </button>
            </div>
        </div>

        <div class="buttons" v-if="store.getters.isLoggedIn">
            <div v-if="!store.getters.hasWalletConnected">
                <button class="button linkalgowalletbutton" @click="maketxs()">
                    <p v-if="loadingVerifyWalletStep1===false">Link Algorand Wallet to account</p>
                    <p v-if="loadingVerifyWalletStep2===true">Step 2/2: Sign 0 Algo Transaction</p>
                    <p v-else-if="loadingVerifyWalletStep1===true">Step 1/2: Connect Wallet</p>
                    <img v-if="loadingVerifyWalletStep1===true" class="center-image" src="/img/loading_3_dots.svg" alt="loading">
                </button>
            </div>

            <div>
                <button class="button signoutbutton" @click="signoutUser()">
                    Logout
                </button>
                <button class="button collection" v-if="store.getters.hasWalletConnected" @click="gotogallery">
                    Check your collection!
                </button>
            </div>
        </div>
    </div>
</template>




<style lang="sass">
    $color-bg: gray
    $color-border: #00a3cc
    $pad: 0.75em
    $marg: 0.5em

    h1
        font-size: 2em
        display: block

    .inline
        display: inline-flex
        align-items: center

    .wallet-info
        align-items: center
    .buttons
        display: inline-flex

    .button
        background-color: $color-bg
        border-color: white
        border-radius: 5px
        //border-style: solid
        //border-width: 1px
        padding: $pad
        margin: $marg

    .collection
        background-color: #4d94ff
        border-color: white
    .removewalletbutton
        padding: 0.1em 0.55em
        background-color: rgba(255, 92, 51, 0.25)
        color: rgba(255, 255, 255, 0.75)
        border-radius: 2px
        border-width: 1px
        border-color: rgba(255, 92, 51, 0)
        &:hover
            background-color: rgba(255, 92, 51, 0.35)
            border-color: rgba(255, 92, 51, 0.2)
    .center-image
        text-align: center
        margin: auto

    .registerbutton
        background-color: #00e68a
        color: white
        opacity: 1

    .disabled
        background-color: #d9746f
        opacity: 0.5
    .error
        font-weight: 100
        font-size: 0.8em
        color: #ff4d4d
        margin-bottom: -1.2em
        margin-top: -0.3em
    .formback
        background-color: rgba(0, 0, 0, 0.65)
</style>
