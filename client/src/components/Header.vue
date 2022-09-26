<script setup lang="ts">
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import {ref, computed} from 'vue'

const store = useStore()
const router = useRouter()

const getAddress = computed(() => {
    const address = store.getters.getAddress
    return (address ? address.slice(0,5) +  '...' + address.slice(53, 58) : '')
})
const getUsername = computed(() => {
    const username = store.getters.getUsername
    return (username ? username : '')
})

function connectMyAlgoWallet(){
    store.dispatch("connectWallet")
}
function gotoUserpage(){
    try {
        const username = store.getters.getUsername
        if(username) {
            router.push({name: '/users', params: {username}})
        } else {
            throw new Error('username not found')
        }
    }catch(e) {
        router.push('/login')
    }
}

function responsive() {
  let x = document.getElementById("socialtabs");
  if (x.className === "socials") {
    x.className += "responsive";
  } else {
    x.className = "socials";
  }
  let y = document.getElementById("maintabs");
  if (y.className === "tab") {
    y.className += "responsive";
  } else {
    y.className = "tab";
  }
  let z = document.getElementById("dropdown");
  if (z.className === "nav-icon") {
    z.className += "responsive";
  } else {
    z.className = "nav-icon";
  }
}

// document.onclick=function(){
//     let x = document.getElementById("socialtabs");
//     if(x.className === "socialsresponsive" && toggle === true){responsive();};
// }


</script>

<template>
    <nav>
        <a href="#">
            <img src="/img/Algomond_LOGO_white_on_black.svg" alt="Algomond Logo">
            <h2 class="logo">ALGOMOND</h2>
        </a>
        <ul id="maintabs" class="tab">
            <li><router-link to="/">Home</router-link></li>
            <li><a href="https://www.randgallery.com/algo-collection/?address=ALGMD6LOC2ND6IWCPLYIRO7TC7GAMLLFNK2Y656A4FAJUI47TJ6MI4ZMNU" target="_blank">Store</a></li>
            <li><a href="http://algomondgame.com/" target="_blank">Play</a></li>
            <li><router-link id="galleryurl" to="/gallery">Gallery</router-link></li>
            <!-- <li><router-link to="/">Merch</router-link></li> -->
            <li>
                <div class="wallet-co-button">
                    <button @click="gotoUserpage">
                        <!-- <img :class="getUsername ? '' : 'hidden'" id="wallet-icon" src="/img/wallet.svg" alt="wallet icon"> -->
                        <p id="wallet-button-text">{{getUsername || "Connect Now"}}<br></p>
                        <p id="wallet-button-text">{{getAddress || ""}}</p>
                    </button>
                </div>
            </li>
        </ul>

        <ul id="socialtabs" class="socials">
            <li class="icon-list"><a href="https://www.reddit.com/r/algomond" target="_blank">
                <img src="/img/reddit.svg" alt="reddit link" class="icon">
            </a></li>
            <li class="icon-list"><a href="https://discord.gg/3QCkjY5bCG" target="_blank">
                <img src="/img/discord.svg" alt="discord link" class="icon">
            </a></li>
            <li class="icon-list"><a href="https://t.me/algomond" target="_blank">
                <img src="/img/telegram.svg" alt="telegram link" class="icon">
            </a></li>
            <li class="icon-list"><a href="https://twitter.com/algomond/" target="_blank">
                <img src="/img/twitter.svg" alt="twitter link" class="icon">
            </a></li>
        </ul>

        <a href="javascript:void(0);" @click="responsive" class="nav-icon" id="dropdown">
            <div></div>
        </a>
    </nav>
</template>

<style scoped>


nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.86);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding-left: 2%;
    padding-right: 2%;
}

nav a {
    text-decoration: none;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

nav a img {
    margin: 0;
    padding-right: 1rem;
    height: 2.8rem;
    width: 2.8rem;
}

nav .logo {
    color: white;
    font-weight: normal;
    font-size: 1.1em;
    margin: 0;
    transition: 0.75s;
}

nav ul {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

nav ul li {
    list-style-type: none;
    display: inline-block;
    margin: 0;
}

nav ul li a {
    text-decoration: none;
    text-transform: uppercase;
    font-size: 0.85em;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    padding-right: 1.5rem;
    padding-left: 1.5rem;
    margin: 0;
    color: white;
    -webkit-transition: 0.75s;
    transition: 0.75s;
}

nav ul li a .icon {
    height: 1.42rem;
    width: 2.2rem;
    -webkit-filter: invert(100%);
    filter: invert(100%);
    margin: 0;
    padding: 0;
}

nav ul li .wallet-co-button {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding-top: 0rem;
    margin-left: 2rem;
}

nav ul li .wallet-co-button button {
    background-image: -webkit-gradient(linear, left top, right top, from(#314755), color-stop(51%, #26a0da));
    background-image: linear-gradient(to right, #314755 0%, #26a0da 51%);
    padding: 4px 15px;
    text-align: center;
    text-transform: uppercase;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    /* display: inline-flex; */
    font-size: 0.75em;
    -webkit-transition: 0.56s;
    transition: 0.56s;
    background-size: 200% auto;
    color: white;
    border-style: solid;
    border-color: #242424;
    border-radius: 10px;
    border-width: 1px;
    cursor: pointer;
}

nav ul li .wallet-co-button button img {
    margin: 0;
    padding-right: 10px;
    width: 28px;
    -webkit-filter: invert(100%);
    filter: invert(100%);
}

nav ul li .wallet-co-button button:hover {
    background-position: center;
    /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
}

nav ul li .wallet-co-button button:active {
    -webkit-transition: 0.2s;
    transition: 0.2s;
    border-color: rgba(139, 251, 255, 0.356);
}

nav ul li.icon-list {
    padding: 0;
    margin: 0;
}

nav ul li.icon-list a {
    padding: 0;
}

nav ul li.icon-list a:hover {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
    background-color: none;
    -webkit-transition: 0.075s;
    transition: 0.075s;
}

nav ul li.icon-list a:active {
    -webkit-filter: invert(10%);
    filter: invert(10%);
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
    -webkit-transition: 0s;
    transition: 0s;
}

nav .tab a:hover {
    background-color: whitesmoke;
    color: black;
}

nav .tab a:active {
    color: #eeff00;
    -webkit-transition: 0.1s;
    transition: 0.1s;
}
nav .dropdown{
    display: none;
}
.nav-icon{
    display: none;
}
.nav-iconresponsive{
    display: none;
}



@media only screen and (max-width: 900px){

nav .logo {
    display: none;
}
nav ul li .wallet-co-button {
margin-left: 1rem;
}
nav ul li a {
    font-size: 0.8em;
    padding-right: 0.9rem;
    padding-left: 0.9rem;
}
nav .dropdown{
    display:inherit;
    margin: 0;
    padding: 0;
    scale: 1.1;
}
.nav-icon {
    display:block;
    margin: 0.2em;
    width: 30px;
}

.nav-icon:after, 
.nav-icon:before, 
.nav-icon div {
  background-color: #fff;
  border-radius: 3px;
  content: '';
  display: block;
  height: 3px;
  margin: 5px 0;
  transition: all .2s ease-in-out;
}

.nav-iconresponsive {
    display:block;
    margin: 0.2em;
    width: 30px;
}
.nav-iconresponsive:before {
  transform: translateY(8px) rotate(135deg);
}

.nav-iconresponsive:after {
  transform: translateY(-8px) rotate(-135deg);
}

.nav-iconresponsive:after,
.nav-iconresponsive:before,
.nav-iconresponsive div {
background-color: #fff;
  border-radius: 3px;
  content: '';
  display: block;
  height: 3px;
  margin: 5px 0;
  transition: all .2s ease-in-out;
}

.nav-iconresponsive div{
    scale:0;
}

nav .socials{
    display:none;
}
nav .socialsresponsive{
    padding: 20px 10px;
    display: inherit;
    position: absolute;
    top: 50px;
    border-radius: 10px;
    right: 0;
    background-color: rgba(0, 0, 0, 0.86);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
} 
}

@media only screen and (max-width: 500px){
nav .tab{
    display:none;
}
nav .dropdown{
    scale: 1.3;
}
nav .socialsresponsive{
    padding: 220px 5px 10px 20px;
    display: inherit;
    position: absolute;
    top: 50px;
    border-radius: 10px;
    right: 0;
    background-color: rgba(0, 0, 0, 0.86);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
} 
nav .tabresponsive{
    padding: 10px 5px 10px 5px;
    float: none;
    display: block;
    position: absolute;
    top: 50px;
    border-radius: 10px;
    right: 0;
    z-index: 2;
} 
nav .tabresponsive a:hover {
    background-color: whitesmoke;
    color: black;
}

nav .tabresponsive a:active {
    color: #e5ff00;
    -webkit-transition: 0.05s;
    transition: 0.05s;
}

nav .tabresponsive li {
    font-size: 1.35em;
    padding: 0px;
    margin: 1px;
    display: flex;
}
nav .tabresponsive li .wallet-co-button {
    margin-left: 0rem;
}
nav .tabresponsive li a{
    border-radius: 5px;
    width: 100%;
    padding: 2px;
    margin: 2px;
}
}

</style>
