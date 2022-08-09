<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Header from './Header.vue'
</script>

<template>
<div>
    <div class="dragon-background rellax" data-rellax-speed="0.6">
            <img src="/img/Dragon_Essence.png" alt="dragon_background">
        </div>
    <img class="stars-top rellax" data-rellax-speed="1.5" src="/img/stars_top.png" alt="stars_background">
    <!-- <Header /> -->
        <section class="hero rellax" data-rellax-speed="1">
            <img class="animated-circles" src="/img/animated_circles_top.png" alt="animated circles hero">
            <div class="text">
                <h1>Bringing the <b>Algomond</b> magic to Algorand.</h1>
                <h4>Algomond is an NFT trading cards video game with hand drawn fun and spooky
                monsters built on the algorand blockchain and the unity game engine.</h4>
            </div>
            <img class="arrow" src="/img/arrow_down.svg" alt="arrow_down">
        </section>
        <section class="reveal">
            <h2>A Unique Card Collection.</h2>
            <img src="/img/Carrousel.png" alt="carrousel">
            <p>Build your deck from a range of monster and spell cards.</p>
        </section>
        <img class="stars-mid rellax" data-rellax-speed="-0.6" src="/img/small_stars.png" alt="small_stars_background">
        <!-- <section>
            <h2>Your Wallet, Your Cards.</h2>
        </section> -->
        <section class="reveal">
            <h2>The Roadmap.</h2>
            <img class="roadmap" src="/img/Roadmap.png" alt="Roadmap">
        </section>
        <section class="reveal">
            <h2>Our Partners.</h2>
            <div class="partners">
                <img class="partners-glow-algo" src="/img/encode_glow.png" alt="glow effect">
                <a href="https://algorand.foundation/news/algomond-grant" target="_blank">
                    <img class="partnerlogo" src="/img/algorand-foundation-logo_white_500px.png" alt="algorand foundation logo">
                </a>
                <img class="partners-glow-encode" src="/img/encode_glow.png" alt="glow effect">
                <a href="https://youtu.be/Pmzy33Bj5Tc" target="_blank">
                    <img class="partnerlogo encode" src="/img/encode_club_white_01.png" alt="encode club logo">
                </a>
            </div>
            </section>
        <section class="reveal">
            <h2>The Team.</h2>
            <div class="tablediv">
                <table>
                    <tr>
                    <td><img src="/img/grumpy_squid_paul.png" alt="founder paul profile picture"></td>
                    <td class="text">Paul RICHARD - @majicien <br> Founder, Web dev, Artist.<br>
                        <a href="https://www.linkedin.com/in/paul-richard-4a51361a7/" target="_blank">
                            <img src="/img/linkedin.svg" alt="Paul Richard's linked in profile link">
                        </a>
                    </td>
                    </tr>
                    <tr>
                    <td><img src="/img/big_bullies_josh.png" alt="co-founder josh profile picture"></td>
                    <td class="text">Josh WEST - @emploded <br> Co-Founder, Game dev.<br>
                        <a href="https://www.linkedin.com/in/josh-west-b50214153" target="_blank">
                            <img src="/img/linkedin.svg" alt="Josh West's linked in profile link">
                        </a>

                    </td>
                    </tr>
                </table>
            </div>
        </section>

        <footer>
            <p>Copyright &COPY 2022 Algomond.</p>
            <img class="tinymag" src="/img/tiny_mag.png" alt="">
            <img class="smoke-bottom rellaxNonCentered" data-rellax-speed="2" data-rellax-percentage="2" src="/img/smoke.png" alt="smoke_background_bottom">
        </footer>
    </div>
</template>
