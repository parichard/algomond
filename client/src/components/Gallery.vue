<script setup lang="ts">
    import { ref, computed } from 'vue'
    const address = ref('')
    const dictionary = {284428276: 'M10A_Flying Goblins_284428276.jpeg', 278092927: 'M10_Flying Goblins_278092927.jpeg', 287293704: 'M11A_Devil Tomatoes_287293704.jpeg', 281441484: 'M11_Devil Tomatoes_281441484.jpeg', 290420389: 'M12A_Mosquito Bomber_290420389.jpeg', 285726914: 'M12_Mosquito Bomber_285726914.jpeg', 297713070: 'M13A_Gondola Harvester_297713070.jpeg', 311926563: 'M13S_Gondola Harverster_311926563.jpeg', 288769468: 'M13_Gondola Harvester_288769468.jpeg', 302778444: 'M14A_Radioactive Dragon_302778444.jpeg', 295892162: 'M14_Radioactive Dragon_295892162.jpeg', 306031571: 'M15A_Blood Thirst_306031571.jpeg', 300644594: 'M15_Blood Thirst_300644594.jpeg', 308932148: 'M16A_Treasurer_308932148.jpeg', 304305210: 'M16_Treasurer_304305210.jpeg', 314963260: 'M17A_Yum Yum_314963260.jpeg', 307319666: 'M17_Yum Yum_307319666.jpeg', 322322733: 'M18A_Pirakna_322322733.jpeg', 312970884: 'M18_Pirakna_312970884.jpeg', 326901293: 'M19A_Ambush_326901293.jpeg', 317822909: 'M19_Ambush_317822909.jpeg', 242409412: 'M1A_Umbrella Lizard_242409412.jpeg', 239897840: 'M1_Umbrella Lizard_239897840.jpeg', 331188177: 'M20A_Moon Walker_331188177.jpeg', 337893583: 
'M20A_Soul Steal_337893583.jpeg', 324616701: 'M20_Moon Walker_324616701.jpeg', 329074648: 'M21_Soul Steal_329074648.jpeg', 343262752: 'M22A_Spider_343262752.jpeg', 413276337: 'M22S_Spider_413276337.jpeg', 335296204: 'M22_Spider_335296204.jpeg', 350504634: 'M23A_Virus_350504634.jpeg', 340027568: 'M23_Virus_340027568.jpeg', 397336912: 'M24A_Fire Demon_397336912.jpeg', 345658984: 'M24_Fire Demon_345658984.jpeg', 440154578: 'M25A_Grumpy Squid_440154578.jpeg', 386420120: 'M25_Grumpy Squid_386420120.jpeg', 540983016: 'M26A_Flamingod_540983016.jpeg', 426938150: 'M26_Flamingod_426938150.jpeg', 568721487: 'M27A_Cheeky Sorcerer_568721487.jpeg', 525542774: 'M27_Cheeky Sorcerer_525542774.jpeg', 596572993: 'M28A_Invasion_596572993.jpeg', 553966974: 'M28_Invasion_553966974.jpeg', 788114778: 'M29A_Shroom Squad_788114778.jpeg', 583192426: 'M29_Shroom Squad_583192426.jpeg', 248418375: 'M2A_Big Bullies_248418375.jpeg', 242410546: 'M2_Big Bullies_242410546.jpeg', 611064516: 'M30_Dragon Essence_611064516.jpeg', 788219788: 'M31_Malicious Mushroom_788219788.jpeg', 252401436: 'M3A_Mirror Skeleton_252401436.jpeg', 246472780: 'M3_Mirror Skeleton_246472780.jpeg', 256418078: 'M4A_Mighty Turtle_256418078.jpeg', 250534189: 'M4_Mighty Turtle_250534189.jpeg', 263117147: 'M5A_Fire Spirit_263117147.jpeg', 254365967: 'M5_Fire Spirit_254365967.jpeg', 258395406: 'M6G_Happy Sticks_258395406.jpeg', 258392987: 'M6R_Mad Sticks_258392987.jpeg', 268343166: 'M7A_Tiny Magician_268343166.jpeg', 276312047: 'M7S_Tiny Magician_276312047.jpeg', 260776930: 'M7_Tiny Magician_260776930.jpeg', 274168057: 'M8A_Sleepy Giant_274168057.jpeg', 265916576: 'M8_Sleepy Giant_265916576.jpeg', 279679614: 'M9A_Laughing Plants_279679614.jpeg', 271094092: 'M9_Laughing Plants_271094092.jpeg'}
    const cards = ref([])

    async function getAccount()
    {
        try {
            const url = "https://algoindexer.algoexplorerapi.io/v2/accounts/" + address.value
            const res = await fetch(url)
            const data = await res.json()
            const assets = data['account']['assets']
            assets.forEach((element:any) => {
                const assetId = element['asset-id']
                const amount = element['amount']
                if (assetId in dictionary){
                    console.log(assetId)
                    cards.value.push(assetId)
                }
            });
            console.log(assets)
        } 

        catch (error) {
            console.log(error)
        }
    }
</script>

<template>
    <div class="w-full">
        <input v-model="address" class="m-20 w-3/4 p-4 bg-gray-500 rounded-lg border-2" type="text">
        <button @click="getAccount">Submit</button>
    </div>
    <img v-for="id in cards" :src="'img/cards_artwork/'+ dictionary[id]" alt="">
</template>