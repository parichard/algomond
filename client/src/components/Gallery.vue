<script setup lang="ts">
    import { ref, computed } from 'vue'
    import { useStore } from 'vuex'

    const store = useStore()
    const address = ref('')

    const cardFilesList = ['M10A_Flying Goblins_284428276.jpeg', 'M10_Flying Goblins_278092927.jpeg', 'M11A_Devil Tomatoes_287293704.jpeg', 'M11_Devil Tomatoes_281441484.jpeg', 'M12A_Mosquito Bomber_290420389.jpeg', 'M12XMAS_Mosquito Bomber_484545211.jpeg', 'M12_Mosquito Bomber_285726914.jpeg', 'M13A_Gondola Harvester_297713070.jpeg', 'M13S_Gondola Harverster_311926563.jpeg', 'M13_Gondola Harvester_288769468.jpeg', 'M14A_Radioactive Dragon_302778444.jpeg', 'M14_Radioactive Dragon_295892162.jpeg', 'M15A_Blood Thirst_306031571.jpeg', 'M15_Blood Thirst_300644594.jpeg', 'M16A_Treasurer_308932148.jpeg', 'M16_Treasurer_304305210.jpeg', 'M17A_Yum Yum_314963260.jpeg', 'M17_Yum Yum_307319666.jpeg', 'M18A_Pirakna_322322733.jpeg', 'M18_Pirakna_312970884.jpeg', 'M19A_Ambush_326901293.jpeg', 'M19_Ambush_317822909.jpeg', 'M1A_Umbrella Lizard_242409412.jpeg', 'M1_Umbrella Lizard_239897840.jpeg', 'M20A_Moon Walker_331188177.jpeg', 'M20_Moon Walker_324616701.jpeg', 'M21A_Soul Steal_337893583.jpeg', 'M21_Soul Steal_329074648.jpeg', 'M22A_Spider_343262752.jpeg', 'M22S_Spider_413276337.jpeg', 'M22_Spider_335296204.jpeg', 'M23A_Virus_350504634.jpeg', 'M23_Virus_340027568.jpeg', 'M24A_Fire Demon_397336912.jpeg', 'M24_Fire Demon_345658984.jpeg', 'M25A_Grumpy Squid_440154578.jpeg', 'M25_Grumpy Squid_386420120.jpeg', 'M26A_Flamingod_540983016.jpeg', 'M26_Flamingod_426938150.jpeg', 'M27A_Cheeky Sorcerer_568721487.jpeg', 'M27_Cheeky Sorcerer_525542774.jpeg', 'M28A_Invasion_596572993.jpeg', 'M28_Invasion_553966974.jpeg', 'M29A_Shroom Squad_788114778.jpeg', 'M29_Shroom Squad_583192426.jpeg', 'M2A_Big Bullies_248418375.jpeg', 'M2_Big Bullies_242410546.jpeg', 'M30_Dragon Essence_611064516.jpeg', 'M31_Malicious Mushroom_788219788.jpeg', 'M3A_Mirror Skeleton_252401436.jpeg', 'M3_Mirror Skeleton_246472780.jpeg', 'M4A_Mighty Turtle_256418078.jpeg', 'M4_Mighty Turtle_250534189.jpeg', 'M5A_Fire Spirit_263117147.jpeg', 'M5_Fire Spirit_254365967.jpeg', 'M6G_Happy Sticks_258395406.jpeg', 'M6R_Mad Sticks_258392987.jpeg', 'M7A_Tiny Magician_268343166.jpeg', 'M7S_Tiny Magician_276312047.jpeg', 'M7_Tiny Magician_260776930.jpeg', 'M8A_Sleepy Giant_274168057.jpeg', 'M8_Sleepy Giant_265916576.jpeg', 'M9A_Laughing Plants_279679614.jpeg', 'M9_Laughing Plants_271094092.jpeg', 'M30A_Dragon Essence_836995785.jpeg', 'M32_Smolting Frens_836997353.jpeg']
    const assetIDs = [284428276, 278092927, 287293704, 281441484, 290420389, 484545211, 285726914, 297713070, 311926563, 288769468, 302778444, 295892162, 306031571, 300644594, 308932148, 304305210, 314963260, 307319666, 322322733, 312970884, 326901293, 317822909, 242409412, 239897840, 331188177, 324616701, 337893583, 329074648, 343262752, 413276337, 335296204, 350504634, 340027568, 397336912, 345658984, 440154578, 386420120, 540983016, 426938150, 568721487, 525542774, 596572993, 553966974, 788114778, 583192426, 248418375, 242410546, 611064516, 788219788, 252401436, 246472780, 256418078, 250534189, 263117147, 254365967, 258395406, 258392987, 268343166, 276312047, 260776930, 274168057, 265916576, 279679614, 271094092, 836995785, 836997353]

    const cards = ref([])
    const cardObjectsList = ref([])
    const dbcards = ref([])
    
    if (store.getters.getAddress){
        getAccount()
    }
    else {
        getCardsDetailsDB()
    }

    async function getAccount()
    {
        try {
            const walletAddress = address.value ? address.value : store.getters.getAddress
            const url = "https://mainnet-idx.algonode.cloud/v2/accounts/" + walletAddress
            const res = await fetch(url)
            const data = await res.json()
            const userassets = data['account']['assets']
            if (dbcards.value.length > 0){dbcards.value.length = 0}
            const getCardDetails = await getCardsDetailsDB()
            getCardDetails
            //get the asset and corresponding amount for each algomond asset in the user's wallet
            userassets.forEach((element:any) => {
                const userassetId = element['asset-id']
                const useramount = element['amount']
                if (assetIDs.includes(userassetId)){ //checks if an asset ID is an Algomond ID for each asset in user's wallet
                    var index = dbcards.value.findIndex(obj => obj.assetId === userassetId);
                        if(index!=-1) {

                            dbcards.value[index].amount = useramount;

                        }
                }
            });

        } 

        catch (error) {
            console.log(error)
        }
    }

    async function getCardsDetailsDB()
    {
    // try fetch DB
    try {
        const res: any = await fetch('/api/cards', { // /api = proxy to server (vite.config.ts) -> localhost:3000/
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        const db = await res.json()
        db.forEach(card => {
            if (card.rarity !== 'AMO'){
                card.amount = 0
                dbcards.value.push(card)
            }
        });
        console.log(dbcards)
    }
    catch (error) {
        return
    }
    }
    function switchCardState(num) {
        var x = document.getElementById("card"+String(num)).getElementsByClassName("cardDetails");
        var btn = document.getElementById("btn"+String(num));
        for(var i=0; i<x.length; i++) {
            if(!x[i].classList.contains("hide") && !x[i].classList.contains("cardState") && !x[i].classList.contains("cardName")){
                x[i].classList.add("hide");
            }
            else {
                x[i].classList.remove("hide");
            }
        }
        // if(btn.innerText==="Monster"){
        //     btn.innerText="Spell";
        //     btn.classList.add("spell");
        // }
        // else {
        //     btn.innerText="Monster"
        //     btn.classList.remove("spell");
        // }
    }
</script>

<template>
    <div>
        <div class="w-full">
            <input 
                v-model="address"
                v-if="store.getters.getAddress"
                :placeholder="store.getters.getAddress" 
                class="my-14 mx-7 mr-0 w-3/4 p-2 bg-gray-800 border-2" 
                type="text">
            <input 
                v-model="address"
                v-if="!store.getters.getAddress"
                :placeholder="'Enter wallet address'" 
                class="my-14 mx-7 mr-0 w-3/4 p-2 bg-gray-800 border-2" 
                type="text">
            <button class="inline-flex ml-5 px-3 py-4 bg-gray-800 text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out" @click="getAccount">Submit</button>
        </div>
        <!-- <img class="cards" :key='i' v-for="(card, i) in cardObjectsList" :src="'img/cards_artwork/'+ card['source']" alt="" width="250" height="300"> -->
            <div class="align-center">
                <div class="cardsize inline-flex m-2" :key='i' v-for="(card, i) in dbcards">
                    <div class="cardcomp">
                        <p>M{{card['order']}}{{card['rarity']}} {{card['name']}}</p>
                        <div class="cardImage" :id="'card'+i">
                            <!-- <a :href="'https://algoexplorer.io/asset/'+card['assetID']" target="_blank"> -->
                            <img draggable="false" :src="card['urlOptimized']" :class="card['amount'] > 0 ? 'cards' : 'cards-grey'">
                            <!-- <div class="cardDetails cardName">{{card['name']}}</div> -->
                            <div class="cardDetails cardAtt">{{card['attack']}} Att</div>
                            <div class="cardDetails cardHP">{{card['health']}} HP</div>
                            <div class="cardDetails cardEffect monster"><button @click="switchCardState(i)" :id="'btn'+i">{{card['effect']}}</button></div>
                            <div class="cardDetails cardEffect spell hide"><button @click="switchCardState(i)" :id="'btn'+i">{{card['effectSpell']}}</button></div>
                            <!-- <div class="cardDetails cardState"><button class="monster" @click="switchCardState(i)" :id="'btn'+i">Monster</button></div> -->
                        
                        </div>
                        <p>Amount: {{card['amount']}}</p>
                    </div>
                </div>
            </div>
    </div>
</template>

<style scoped>

.cards{
    -webkit-filter: grayscale(20%);
    -moz-filter:    grayscale(20%);
    -ms-filter:     grayscale(20%);
    -o-filter:      grayscale(20%);
    /* margin: 7px;
    display: inline-flex; */
    /* transition: 0.8s; */
}
.cards-grey{
    -webkit-filter: grayscale(100%);
    -moz-filter:    grayscale(100%);
    -ms-filter:     grayscale(100%);
    -o-filter:      grayscale(100%);
    
    /* margin: 7px;
    display: inline-flex; */
    transition: 1s;
}
.cards-grey:hover{
    -webkit-filter: grayscale(20%);
    -moz-filter:    grayscale(20%);
    -ms-filter:     grayscale(20%);
    -o-filter:      grayscale(20%);
    transition: 0.12s;
}
.cardImage:hover > .cardDetails{
    transition: 0.25s;
    opacity: 100%;
    /* -webkit-transform: scale(1.01); */
    /* border-color: #d4d4d4;
    border-width: 1px; */
    /* transform: scale(1.01); */
}
.cardImage:hover > img {
    opacity: 85%;
    filter: blur(1px);
    transition: 0.2s;
}
.cardDetails:hover {
    transition: 0.25s;
    opacity: 100%;
}

.hide{
    display: none;
}
.align-center{
   text-align:center;
}
.cardsize{
    width:14%;
}
.cardsize .cardcomp p{
        font-size: 0.8em;
        height: 1.5em;
    }
.cardImage{
    position: relative;
}

.cardDetails
{
    position: absolute;
    z-index: 1;
    padding: 4px;
    background-color: rgba(0, 0, 0, 0.706);
    opacity: 0%;
    transition: 0.5s;
    -webkit-backdrop-filter: blur(3px);
    backdrop-filter: blur(3px);
    font-size: 0.8em;
}
.cardName {
  top: 0px;
  left: 0px;
}
.cardAtt {
  bottom: 0px;
  left: 0px;
}
.cardHP {
  bottom: 0px;
  right: 0px;

}
.cardEffect {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  font-size: 0.7em;
}
.cardState {
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.monster {
    background-color: rgba(53, 0, 0, 0.733);
}
.spell {
    background-color: rgb(0, 0, 57, 0.733);
}
@media only screen and (max-width: 900px){
    .cardsize{
        width: 20%;
    }
    .cardsize .cardcomp p{
        font-size: 0.8em;
    }
}
@media only screen and (max-width: 600px){
    .cardsize{
        width: 28%;
    }
    .cardsize .cardcomp p{
        font-size: 0.8em;
    }
}
@media only screen and (max-width: 400px){
    .cardsize{
        width: 42%;
    }
}
</style>
