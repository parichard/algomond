<script setup lang="ts">
  import { useStore } from 'vuex'
  import {ref, computed} from 'vue'

  const store = useStore()

  const getAddress = computed(() => {
      const address = store.getters.getAddress
    return (address ? address.slice(0,5) +  '...' + address.slice(53, 58) : '')
})

  function connectMyAlgoWallet(){
    store.dispatch("connectWallet")
  }
</script>

<template>
<nav>
    <a href="#">
        <img src="/img/Algomond_LOGO_white_on_black.svg" alt="Algomond Logo">
        <h2 class="logo">ALGOMOND</h2>
    </a>
    <ul class="tab">
        <li><a href="#">Home</a></li>
        <li><a href="#">Buy Cards</a></li>
        <li><a href="#">Play</a></li>
        <li><a id="galleryurl" href="#/gallery">Gallery</a></li>
        <li><a href="#">Informations</a></li>
        <li>
            <div class="wallet-co-button">
                <button @click="connectMyAlgoWallet">
                    <img :class="getAddress ? '' : 'hidden'" id="wallet-icon" src="/img/wallet.svg" alt="wallet icon">
                    <p id="wallet-button-text">{{getAddress || "Connect Wallet!"}}</p>
                </button>
            </div>
        </li>
    </ul>

    <ul>
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
  padding: 8px 15px;
  text-align: center;
  text-transform: uppercase;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
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

</style>
