<script setup lang="ts">
import { ref, computed, setup } from 'vue'
import { useStore, mapGetters } from 'vuex'
import { useRouter } from 'vue-router'
import algosdk from 'algosdk'
import MyAlgoConnect from '@randlabs/myalgo-connect'

// import Vuelidate from 'vuelidate'
import Swal from 'sweetalert2'

const store = useStore()
const router = useRouter()

const signup = ref({})
const errors = ref([])

const loadingSignIn = ref(false)
const loadingRegister = ref(false)
const enableRegisterUsr = ref(false)
const enableRegisterPsw = ref(false)
const enableRegisterEmail = ref(false)
const username = store.getters.getUsername
console.log(username)
if(username) {
        router.push('/users')
}

const getAddress = computed(() => {
    return store.getters.getAddress
})

const getFormattedAddress= computed(() =>{
    const address = store.getters.getAddress
    return (address ? address.slice(0,7) +  '...' + address.slice(51, 58) : '')
})

const getUserName = computed(() => {
    const username = store.getters.getUsername
    return username
})


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
            })
            const username = store.getters.getUsername
            router.push({name: '/users', params: {username}})
        }
    } catch (error) {
        errors.value.push(error)
    }
}

function verifyUsername(){
    errors.value=[]
    const usrnm = signup.value.username
    try {
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
        errors.value.push({ msg: error.message, type: 'username'})
    }
}

function verifyPassword(){
    errors.value=[]
    // errors.value=[]
    const psw = signup.value.password
    try {
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
        errors.value.push({ msg: error.message, type: 'password'})
    }
}

function verifyEmail(){
    errors.value=[]
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
        errors.value.push({ msg: error.message, type: 'email'})
    }
}
</script>

<template>
    <div class="w-full md:w-4/12 p-6 rounded-lg mx-auto mt-24 formback">
        <div>
            <router-link to="login">Back to Login</router-link>
        </div>

        <form
        class="flex flex-col mt-2"
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
            <p class="error" :key='i' v-for="(error, i) in errors">{{error.type === 'username' ? error.msg : ''}}</p>
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
            <p class="error" :key='i' v-for="(error, i) in errors">{{error.type === 'password' ? error.msg : ''}}</p>
        </div>

        <div class="mb-4">
            <input @keyup="verifyEmail"
            type="text"
            id="email"
            class="border-2 w-full p-2 bg-gray-100 text-black"
            placeholder="E-mail"
            v-model="signup.email"
            />

            <p class="error" :key='i' v-for="(error, i) in errors">{{error.type === 'email' ? error.msg : ''}}</p>


        </div>
        <div class="mb-4">

            <input
            type="checkbox"
            id="newsletter"
            class="border-2 w-1/4 p-2 bg-gray-100 text-black"
            v-model="signup.newsletter"
            />
            <label for="newsletter">Sign up for future newsletters.</label>

        </div>

        <!-- Sign in button -->
        <button :disabled="!enableRegisterUsr || !enableRegisterPsw || !enableRegisterEmail" class="bg-gray-600 text-white mb-3 py-2 registerbutton" :class="{'disabled': !enableRegisterUsr || !enableRegisterPsw || !enableRegisterEmail}" type="submit">
            <p v-if="loadingRegister===false">Register</p>
            <img v-else class="center-image" src="/img/loading_3_dots.svg" alt="loading">
        </button>
    </form>
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
