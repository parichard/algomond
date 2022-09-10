<script setup lang="ts">
import { ref, computed } from 'vue'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Header from './components/Header.vue'
import Home from './components/Home.vue'
import Gallery from './components/Gallery.vue'
import UserPage from './components/UserPage.vue'
import HelloWorld from './components/HelloWorld.vue'
import { loadFull } from 'tsparticles'

const routes = {
    '/': Home,
    '/gallery': Gallery,
    '/userpage': UserPage,
    '/helloworld': HelloWorld
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
    currentPath.value = window.location.hash
})

const currentView = computed(() => {
    return routes[currentPath.value.slice(1) || '/'] || ''
})

const particlesInit = async (engine) => {
        await loadFull(engine);
      }
//particles
const count = computed(() => {
    return (Math.round(document.body.scrollHeight/20))
})

const config = ref({
    fpsLimit: 60,
    fullScreen: { enable: false},
    
    particles: {
        color: { value: '#ffffff' },
        move: {
            direction: 'top',
            enable: true,
            outModes: 'out',
            random: false,
            speed: 0.35,
            straight: false,
        },
        number: { density: { enable: false, area: 1000 }, value: count },
        opacity: {
            value: 0.5,
        },
        shape: {
            type: 'circle',
        },
        size: {
            value: { min: 0.2, max: 1.25 },
        },
    },
})
</script>

<template>
    
    <div>
        <Particles
            id="tsparticles"
            :options= "config"
            :particlesInit="particlesInit"
            />
        <div class="dark-fade"></div>
        <Header />

        <component :is="currentView" />
    </div>
    
</template>

<style>


@import url('https://fonts.googleapis.com/css?family=Alata&display=swap');


html {
    position: relative;
    scroll-behavior: smooth;
    min-height: 100%;
    /* height: 100%; */
}

#tsparticles {
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -10;
    -webkit-animation: fadeIn 1.5s;
    animation: fadeIn 1.5s;
}

* {
    padding: 0;
    margin: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-family: "Alata", sans-serif;
}
body {
    background: #030118;
    background: -webkit-gradient(linear, left top, left bottom, from(#00000e), color-stop(29%, #060c31), to(#03011d)) no-repeat;
    background: linear-gradient(180deg, #00000e 0%, #060c31 29%, #03011d 100%) no-repeat;
    /* min-height: 100vh; */
    height: 100%;
    color: whitesmoke;
    width: 100%;
    overflow-x: hidden;
}

.dark-fade {
    background: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.486)), color-stop(35%, rgba(10, 3, 55, 0)));
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.486) 0%, rgba(10, 3, 55, 0) 35%);
    position: absolute;
    height: 100vh;
    width: 100%;
    top: 0;
    left: 0;
    z-index: -2;
}

.dragon-background {
    position: absolute;
    top: -200px;
    left: 100px;
    z-index: -3;
    opacity: 0.055;
    z-index: -3;
}

.dragon-background img {
    width: 130%;
}

.stars-top {
    position: absolute;
    top: -70px;
    right: 0px;
    width: 42%;
    z-index: -1;
    -webkit-animation: fadeIn 1.5s;
    animation: fadeIn 1.5s;
}

.stars-mid {
    position: absolute;
    left: 0px;
    z-index: -1;
    width: 25%;
    -webkit-animation: fadeIn 1.5s;
    animation: fadeIn 1.5s;
}

@-webkit-keyframes mymove {
    from {
        top: 0px;
    }
    to {
        top: 14px;
    }
}

@keyframes mymove {
    from {
        top: 0px;
    }
    to {
        top: 14px;
    }
}

@-webkit-keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@-webkit-keyframes glow {
    from {
        text-shadow: 0 0 2px #ffffffbd;
    }
    to {
        text-shadow: 0 0 6px #8a9fff94;
    }
}

@keyframes glow {
    from {
        text-shadow: 0 0 2px #ffffffbd;
    }
    to {
        text-shadow: 0 0 6px #8a9fff94;
    }
}

.hero .text {
    margin-top: 10.8em;
    margin-right: 38%;
    margin-left: 13%;
    margin-bottom: 8em;
}

.hero .text h1 {
    font-size: 3.2em;
    font-weight: normal;
    margin-bottom: 0.5em;
    text-transform: uppercase;
    letter-spacing: 0.2em;
}

.hero .text h1 b {
    -webkit-animation: glow 5s ease-in-out infinite alternate;
    animation: glow 5s ease-in-out infinite alternate;
}

.hero .text h4 {
    font-weight: normal;
    margin-right: 5%;
}

.hero .arrow {
    position: relative;
    width: 8%;
    margin-left: auto;
    margin-right: auto;
    display: block;
    -webkit-animation: mymove 1.3s infinite;
    animation: mymove 1.3s infinite;
    -webkit-animation-direction: alternate;
    animation-direction: alternate;
}

.animated-circles {
    position: absolute;
    width: 150px;
    top: 120px;
    left: 30px;
}

section h2 {
    font-size: 2.5em;
    margin-left: 8%;
    margin-top: 6%;
    font-weight: normal;
}

section img {
    margin-top: 5rem;
    width: 100%;
}

section .roadmap {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 7rem;
    margin-bottom: 7rem;
    display: block;
}

section .partners {
    margin-top: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}

section .partners a {
    width: 20%;
    margin-left: 12%;
    margin-right: 12%;
}

section .partners a .encode {
    width: 85%;
}

section .partners a:hover {
    -webkit-transform: scale(1.01);
    transform: scale(1.01);
}

section .partners .partners-glow-encode {
    position: absolute;
    width: 40%;
    right: 10%;
    margin-top: 6.75%;
    opacity: 0.42;
    z-index: -1;
}

section .partners .partners-glow-algo {
    position: absolute;
    width: 40%;
    left: 10%;
    margin-top: 6.75%;
    opacity: 0.42;
    z-index: -1;
}

section p {
    margin-top: 3%;
    margin-left: 20%;
    margin-right: 20%;
    font-size: 1.2em;
}

section .tablediv {
    margin-top: 5rem;
    margin-left: 15%;
    margin-bottom: 12rem;
}

section .tablediv table {
    vertical-align: middle;
}

section .tablediv table img {
    margin: 1rem;
    width: 6.5rem;
}

section .tablediv table .text {
    padding-left: 1rem;
}

section .tablediv table .text a img {
    height: 2rem;
    width: 2rem;
    -webkit-filter: invert(100%);
    filter: invert(100%);
    margin: 0;
    padding: 0;
    margin-top: 0.5rem;
}

section .tablediv table .text a:hover img {
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
    background-color: none;
    -webkit-transition: 0.075s;
    transition: 0.075s;
}

section .tablediv table .text a:active img {
    -webkit-filter: invert(85%);
    filter: invert(85%);
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
    -webkit-transition: 0s;
    transition: 0s;
}

.reveal {
    position: relative;
    -webkit-transform: translateY(70px);
    transform: translateY(70px);
    opacity: 0;
    -webkit-transition: 0.60s all ease;
    transition: 0.60s all ease;
}

.reveal.active {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
}

footer {
    text-align: center;
    position: relative;
    bottom: 0;
}

footer p {
    bottom: 0;
    padding-bottom: 0.5rem;
}

footer .tinymag {
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 50%;
    z-index: -1;
}

footer .smoke-bottom {
    position: absolute;
    width: 100%;
    bottom: 0px;
    right: 0px;
    z-index: -2;
}

</style>
