<script setup lang="ts">
    import { ref, computed } from 'vue'
    import { useStore } from 'vuex'

    const store = useStore()
    const address = ref('')

</script>

<template>
    <div>
        <div class="circle">
            <p>BUY PACK OF 3 RANDOM ALGOMOND NFTS</p>
        </div>
    </div>
</template>

<style scoped>
.circle{
    height: 80vh;
    width: 80vh;
    padding: 15vh;
    border-radius: 50%;
    /* background: rgb(26,58,218); */
    background: radial-gradient(circle, rgba(26,58,218,1) 0%, rgba(8,4,91,0.75) 100%);
    /* -webkit-backdrop-filter: blur(1px);
    backdrop-filter: blur(1px); */
    margin: auto;
    margin-top: 10vh;
    margin-bottom: 10vh;
    border-color: rgba(121, 210, 255, 0.489);
    border-width: 1px;
    box-shadow: 0 0 20px 0 rgba(0, 95, 248, 0.945);
    overflow: visible;
    overflow-x: visible;
    overflow-y: visible;
    text-align: center;
    transition: 0.7s;
    }
.circle:hover{
    box-shadow: 0 0 35px 0 rgba(0, 95, 248, 0.945);
    transition: 0.7s;
}
.circle:active{
    border-radius: 5%;
    /* width: 90vw;
    height: 100vh;
    margin: auto; */
}
</style>
