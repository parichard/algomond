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

const login = ref({})
const errors = ref([])
const loading = ref(false)
const username = store.getters.getUsername
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
    return store.getters.getUsername
})

const isLoggedIn = computed(() => {
    return store.getters.isLoggedIn
})

const loginUser = async () => {
    errors.value = []
    const data = {
        username: login.value.username,
        password: login.value.password
    }
    try {
        loading.value = true
        console.log(data)
        let status = await store.dispatch('login', data) // sends user login input data to store.ts
        if (status === 400) errors.value.push("username and password do not match")
        loading.value = false
        if (store.getters.isLoggedIn){
            Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                icon: 'success',
                title: 'Successfully Logged In!',
                text: 'Welcome back '+ store.getters.getUsername + "!",
            })
            router.push('/users')
        }
        // store answer to say if user is now logged in (with the authentification token)
    } catch (error) {
        return
        // errors.value.push(error)
    }
}
</script>

<template>
        <div class="w-full md:w-4/12 p-6 rounded-lg mx-auto mt-24 formback">
            <!-- Login Form -->
            <form
            class="flex flex-col mt-2"
            @submit.prevent="loginUser"
            >
            <div class="mb-4">
                <input @keyup="errors=[]"
                type="text"
                id="username"
                class="border-2 w-full p-2 bg-gray-100 text-black"
                placeholder="Username"
                v-model="login.username"
                />
            </div>
            <div class="mb-4">
                <input @keyup="errors=[]"
                type="password"
                id="password"
                class="border-2 w-full p-2 bg-gray-100 text-black"
                placeholder="Password"
                v-model="login.password"
                />
                <p class="error" :key='i' v-for="(error, i) in errors">{{error}}</p>
            </div>
            <!-- Sign in button -->
            <button :disabled="!login.password || !login.username || errors.length != 0" class="bg-gray-600 text-white mb-3 py-2 registerbutton" :class="{'disabled': !login.password || !login.username || errors.length != 0}" type="submit">
                <p v-if="loading===false">Sign in</p>
                <img v-else class="center-image" src="/img/loading_3_dots.svg" alt="loading">
            </button>
        </form>

        <!-- <p>Want to create an account instead? </p> -->
        <router-link to="/register">
            Want to create an account instead?
        </router-link>
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
