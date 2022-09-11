<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore, mapGetters } from 'vuex'
import algosdk from 'algosdk'
import MyAlgoConnect from '@randlabs/myalgo-connect'

// import Vuelidate from 'vuelidate'
import Swal from 'sweetalert2'

const store = useStore()
const login = ref({})
const signup = ref({})
const errors = ref([])
const usernameerrors = ref([])
const emailerrors = ref([])
const loginerrors = ref([])
let register = ref(false)
let loadingSignIn = ref(false)
let loadingRegister = ref(false)
let enableRegisterUsr = ref(false)
let enableRegisterPsw = ref(false)
let enableRegisterEmail = ref(false)



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
    const wallet = await connectWallet()
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
        console.log(error)
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
        await store.dispatch('verifyWallet', wallet) // sends request to store to verify wallet
    } catch (error) {
        console.log(error)
    }
}


const loginUser = async () => {
    loginerrors.value=[]
    const data = login.value
    try {
        loadingSignIn.value = true
        let status = await store.dispatch('login', data) // sends user login input data to store.ts
        if (status === 400) loginerrors.value.push("username and password do not match")
        loadingSignIn.value = false
        if (store.getters.isLoggedIn){
            Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            icon: 'success',
            title: 'Successfully Logged In!',
            text: 'Welcome back '+ store.getters.getUsername + "!",
      })}
        // store answer to say if user is now logged in (with the authentification token)
    } catch (error) {
        console.log(error)
        // errors.value.push(error)
    }
}

function updateRegisterStatus() {
    register.value = !register.value
}

const signupUser = async () => {
    const data = signup.value
    try {
        loadingRegister.value = true
        let status = await store.dispatch('signup', data) // sends user login input data to store.ts
        loadingRegister.value = false
        if (status === 501){
            loadingRegister.value = false
            enableRegisterUsr.value = false
            throw new Error(data['username'] + " already exists, please choose another username.")
        }
        else if (store.getters.isLoggedIn){
            Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            icon: 'success',
            title: 'Account successfully created!',
            text: 'Welcome to the Algomond fam '+ store.getters.getUsername + "!",
      })}
    } catch (error) {
       usernameerrors.value.push(error)
    }
}

function verifyUsername(){
    usernameerrors.value=[]
    const usrnm = signup.value.username
    try{
        let errArr = []
        let errStr = ""
        if (usrnm.length<3) errArr.push("more than 3 characters")
        if (usrnm.length>20) errArr.push("less than 20 characters")
        if (/[^A-Zsa-z0-9]/.test(usrnm)) errArr.push("small cap and numbers only")
        if (errArr.length != 0){
            enableRegisterUsr.value = false
            errStr = "Username: "
            errArr.forEach(error=>{
                errStr = errStr + error + ", "
            })
            let shortend = errStr.substring(0, errStr.length - 2)
            shortend+="."
            throw new Error(shortend)
        }
        else{
            enableRegisterUsr.value = true
        }
    }
    catch(error){
        usernameerrors.value.push(error)
    }
}

function verifyPassword(){
    errors.value=[]
    // usernameerrors.value=[]
    const psw = signup.value.password
    try{
        let errorArr = []
        let errorStr = ""
        if (psw.length<9) errorArr.push("at least 9 characters long")
        if (psw.length>30) errorArr.push("at most 30 characters long")
        if (!/\d/.test(psw)) errorArr.push("1 or more digit")
        if (!/[a-zA-Z]/.test(psw)) errorArr.push("1 or more letter")
        if (errorArr.length != 0){
            enableRegisterPsw.value = false
            errorStr = "Password: "
            errorArr.forEach(error => {
                errorStr = errorStr + error + ", "
            })
            let shortend = errorStr.substring(0, errorStr.length - 2)
            shortend+="."
            throw new Error(shortend)
        }
        if (!signup.value.passwordCheck) return
        else if(signup.value.password != signup.value.passwordCheck) {
            enableRegisterPsw.value = false
            throw new Error("Passwords do not match")
        }
        else{
            enableRegisterPsw.value = true
        }
    }
    catch(error){
        errors.value.push(error)
    }
}

function verifyEmail(){
    emailerrors.value=[]
    const email = signup.value.email
    try{
        let errorArr = []
        let errorStr = ""
        let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')
        if (email.length>35) errorArr.push("too long email")
        if (!regex.test(email)) errorArr.push("Please enter valid email")

        if (errorArr.length != 0){
            enableRegisterEmail.value = false
            errorStr = "Email: "
            errorArr.forEach(error => {
                errorStr = errorStr + error + ", "
            })
            let shortend = errorStr.substring(0, errorStr.length - 2)
            shortend+="."
            throw new Error(shortend)
        }
        else{
            enableRegisterEmail.value = true
        }
    }
    catch(error){
        emailerrors.value.push(error)
    }
}

const signoutUser = async () => {
    try {
        await store.dispatch('logout') // sends request to store for logging out
        console.log(store.getters.isLoggedIn) // store answer to say if user is now logged in (with the authentification token)
        if (!store.getters.isLoggedIn){
            Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            icon: 'info',
            title: 'Successfully Logged Out!',
      })}
    } catch (error) {
        console.log(error)
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
        await store.dispatch('removeWallet') // sends request to store for logging out
        console.log(store.getters.hasWalletConnected) // store answer to say if user is now logged in (with the authentification token)
    } catch (error) {
        console.log(error)
    }
}

function gotogallery(){
    window.open("#/gallery", "_self");
  }

</script>

<template>
    <div>
        <div class="w-full md:w-4/12 p-6 rounded-lg mx-auto mt-24 formback">
        <!-- Login Form -->
            <form
            class="flex flex-col mt-2"
            v-if="!store.getters.isLoggedIn & !register"
            @submit.prevent="loginUser"
            >
            <div class="mb-4">
                <input @keyup="loginerrors=[]"
                type="text"
                id="username"
                class="border-2 w-full p-2 bg-gray-100 text-black"
                placeholder="Username"
                v-model="login.username"
                />
            </div>
            <div class="mb-4">
                <input @keyup="loginerrors=[]"
                type="password"
                id="password"
                class="border-2 w-full p-2 bg-gray-100 text-black"
                placeholder="Password"
                v-model="login.password"
                />
                <p class="error" :key='i' v-for="(error, i) in loginerrors">{{error}}</p>
            </div>
            <!-- Sign in button -->
            <button :disabled="!login.password || !login.username || loginerrors.length != 0" class="bg-gray-600 text-white mb-3 py-2 registerbutton" :class="{'disabled': !login.password || !login.username || loginerrors.length != 0}" type="submit">
                <p v-if="loadingSignIn===false">Sign in</p>
                <img v-else class="center-image" src="/img/loading_3_dots.svg" alt="loading">
            </button>
        </form>

        <!-- Check if user wants to register instead of login -->
            <div v-if="!register && !store.getters.isLoggedIn">
                <!-- <p>Want to create an account instead? </p> -->
                <button type="submit" v-on:click="updateRegisterStatus()">
                    Want to create an account instead?
                </button>
            </div>

        <!-- Register Form -->
        <div v-if="register && !store.getters.isLoggedIn">
            <!-- <p>Want to create an account instead? </p> -->
            <button type="submit" v-on:click="updateRegisterStatus()">
                Back to Login
            </button>
        </div>
        <form
            class="flex flex-col mt-2"
            v-if="!store.getters.isLoggedIn & register"
            @submit.prevent="signupUser"
            >
            <div class="mb-4">
                <input @keyup="verifyUsername"
                type="text"
                id="username"
                class="border-2 w-full p-2 bg-gray-100 text-black"
                placeholder="Username"
                v-model="signup.username"
                />
                <p class="error" :key='i' v-for="(error, i) in usernameerrors">{{error.message}}</p>
            </div>

            <div class="mb-4">
                <input @keyup="verifyPassword"
                type="password"
                id="password"
                class="border-2 w-full p-2 bg-gray-100 text-black"
                placeholder="Password"
                v-model="signup.password"
                />
            </div>
            <div class="mb-4">
                <input @keyup="verifyPassword"
                type="password"
                id="passwordCheck"
                class="border-2 w-full p-2 bg-gray-100 text-black"
                placeholder="Password"
                v-model="signup.passwordCheck"
                />
                <p class="error" :key='i' v-for="(error, i) in errors">{{error.message}}</p>
            </div>

            <div class="mb-4">
                <input @keyup="verifyEmail"
                type="text"
                id="email"
                class="border-2 w-full p-2 bg-gray-100 text-black"
                placeholder="E-mail"
                v-model="signup.email"
                />
                <input
                type="checkbox"
                id="newsletter"
                class="border-2 w-1/4 p-2 bg-gray-100 text-black"
                v-model="signup.newsletter"
                />
                <label for="newsletter">Sign up for future newsletters.</label>
                <p class="error" :key='i' v-for="(error, i) in emailerrors">{{error.message}}</p>
            </div>
            <!-- Sign in button -->
            <button :disabled="!enableRegisterUsr || !enableRegisterPsw || !enableRegisterEmail" class="bg-gray-600 text-white mb-3 py-2 registerbutton" :class="{'disabled': !enableRegisterUsr || !enableRegisterPsw || !enableRegisterEmail}" type="submit">
                <p v-if="loadingRegister===false">Register</p>
                <img v-else class="center-image" src="/img/loading_3_dots.svg" alt="loading">
            </button>
        </form>

        <!-- UserPage -->
        <div class="wallet-info" v-if="store.getters.hasWalletConnected">
            <h1>{{getUserName}}</h1>
            <hr />

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
                    Link Algorand Wallet to account
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
