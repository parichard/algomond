<script setup lang="ts">
    import { ref, computed } from 'vue'
    import { useStore } from 'vuex'

    const store = useStore()
    const address = ref('')

    const cardFilesList = ['M10A_Flying Goblins_284428276.jpeg', 'M10_Flying Goblins_278092927.jpeg', 'M11A_Devil Tomatoes_287293704.jpeg', 'M11_Devil Tomatoes_281441484.jpeg', 'M12A_Mosquito Bomber_290420389.jpeg', 'M12XMAS_Mosquito Bomber_484545211.jpeg', 'M12_Mosquito Bomber_285726914.jpeg', 'M13A_Gondola Harvester_297713070.jpeg', 'M13S_Gondola Harverster_311926563.jpeg', 'M13_Gondola Harvester_288769468.jpeg', 'M14A_Radioactive Dragon_302778444.jpeg', 'M14_Radioactive Dragon_295892162.jpeg', 'M15A_Blood Thirst_306031571.jpeg', 'M15_Blood Thirst_300644594.jpeg', 'M16A_Treasurer_308932148.jpeg', 'M16_Treasurer_304305210.jpeg', 'M17A_Yum Yum_314963260.jpeg', 'M17_Yum Yum_307319666.jpeg', 'M18A_Pirakna_322322733.jpeg', 'M18_Pirakna_312970884.jpeg', 'M19A_Ambush_326901293.jpeg', 'M19_Ambush_317822909.jpeg', 'M1A_Umbrella Lizard_242409412.jpeg', 'M1_Umbrella Lizard_239897840.jpeg', 'M20A_Moon Walker_331188177.jpeg', 'M20_Moon Walker_324616701.jpeg', 'M21A_Soul Steal_337893583.jpeg', 'M21_Soul Steal_329074648.jpeg', 'M22A_Spider_343262752.jpeg', 'M22S_Spider_413276337.jpeg', 'M22_Spider_335296204.jpeg', 'M23A_Virus_350504634.jpeg', 'M23_Virus_340027568.jpeg', 'M24A_Fire Demon_397336912.jpeg', 'M24_Fire Demon_345658984.jpeg', 'M25A_Grumpy Squid_440154578.jpeg', 'M25_Grumpy Squid_386420120.jpeg', 'M26A_Flamingod_540983016.jpeg', 'M26_Flamingod_426938150.jpeg', 'M27A_Cheeky Sorcerer_568721487.jpeg', 'M27_Cheeky Sorcerer_525542774.jpeg', 'M28A_Invasion_596572993.jpeg', 'M28_Invasion_553966974.jpeg', 'M29A_Shroom Squad_788114778.jpeg', 'M29_Shroom Squad_583192426.jpeg', 'M2A_Big Bullies_248418375.jpeg', 'M2_Big Bullies_242410546.jpeg', 'M30_Dragon Essence_611064516.jpeg', 'M31_Malicious Mushroom_788219788.jpeg', 'M3A_Mirror Skeleton_252401436.jpeg', 'M3_Mirror Skeleton_246472780.jpeg', 'M4A_Mighty Turtle_256418078.jpeg', 'M4_Mighty Turtle_250534189.jpeg', 'M5A_Fire Spirit_263117147.jpeg', 'M5_Fire Spirit_254365967.jpeg', 'M6G_Happy Sticks_258395406.jpeg', 'M6R_Mad Sticks_258392987.jpeg', 'M7A_Tiny Magician_268343166.jpeg', 'M7S_Tiny Magician_276312047.jpeg', 'M7_Tiny Magician_260776930.jpeg', 'M8A_Sleepy Giant_274168057.jpeg', 'M8_Sleepy Giant_265916576.jpeg', 'M9A_Laughing Plants_279679614.jpeg', 'M9_Laughing Plants_271094092.jpeg']
    const assetIDs = [284428276, 278092927, 287293704, 281441484, 290420389, 484545211, 285726914, 297713070, 311926563, 288769468, 302778444, 295892162, 306031571, 300644594, 308932148, 304305210, 314963260, 307319666, 322322733, 312970884, 326901293, 317822909, 242409412, 239897840, 331188177, 324616701, 337893583, 329074648, 343262752, 413276337, 335296204, 350504634, 340027568, 397336912, 345658984, 440154578, 386420120, 540983016, 426938150, 568721487, 525542774, 596572993, 553966974, 788114778, 583192426, 248418375, 242410546, 611064516, 788219788, 252401436, 246472780, 256418078, 250534189, 263117147, 254365967, 258395406, 258392987, 268343166, 276312047, 260776930, 274168057, 265916576, 279679614, 271094092]

    const cards = ref([])
    const cardObjectsList = ref([])

    function cardObject(name, order, rarityRank, rarityName, assetID, amount, source) {
      this.name = name;
      this.order = order;
      this.rarityRank = rarityRank;
      this.rarityName = rarityName;
      this.assetID = assetID;
      this.amount = amount;
      this.source = source;
    }

    function populateListOfCardsObj(){
        cardFilesList.forEach(sourceFile=>{
            let card = sourceFile;
            card = card.substring(1);
            var myArray = card.split("_");
            var cardArray = ['order', 'name','assetID', 'rarityRank','rarityName'];
            let regex = /[a-zA-Z]/g;
            
            myArray[3] = myArray[0];
            myArray[3] = myArray[3].replace(/[0-9]/g,"");
            myArray[4] = myArray[3];
            myArray[2] = myArray[2].replace(regex, "");
            myArray[2] = myArray[2].replace('.', "");
            myArray[0] = myArray[0].replace(regex, "");

            if(myArray[3]===""){myArray[3]="0";}
            else if(myArray[3]==="R"){myArray[3]="0";}
            else if(myArray[3]==="G"){myArray[3]="0";}
            else if(myArray[3]==="A"){myArray[3]="1";}
            else if(myArray[3]==="XMAS"){myArray[3]="2";}
            else if(myArray[3]==="S"){myArray[3]="3";}
            else if(myArray[3]==="AMO"){myArray[3]="4";}
            var order = myArray[0];
            var name = myArray[1];
            var assetId = myArray[2];
            var rarityRank = myArray[3];
            var rarityName = myArray[4];

            cardObjectsList.value.push(new cardObject(name, order, rarityRank, rarityName, assetId, 0, sourceFile));
        })
        cardObjectsList.value.sort((a, b) => {
            return a.rarityRank - b.rarityRank;
        });
        cardObjectsList.value.sort((a, b) => {
            return a.order - b.order;
        });
        //console.log(cardObjectsList);
    }

    async function getAccount()
    {
        try {
            const walletAddress = address.value ? address.value : store.getters.getAddress
            const url = "https://mainnet-idx.algonode.cloud/v2/accounts/" + walletAddress
            const res = await fetch(url)
            const data = await res.json()
            const assets = data['account']['assets']
            if (cardObjectsList.value.length > 0){cardObjectsList.value.length = 0}
            populateListOfCardsObj()
            //get the asset and corresponding amount for each algomond asset in the user's wallet
            assets.forEach((element:any) => {
                const assetId = element['asset-id']
                const amount = element['amount']
                if (assetIDs.includes(assetId)){ //checks if an asset ID is an Algomond ID for each asset in user's wallet
                    cards.value.push(assetId)
                    var index = cardObjectsList.value.findIndex(obj => obj.assetID === String(assetId));
                        //console.log(index);
                        if(index!=-1) {

                            cardObjectsList.value[index].amount = amount;

                        }
                }
            });
            cards.value.sort()
            //console.log(assets)
            //console.log(cardObjectsList.value)
            //console.log(cardObjectsList.value[0].source)
            //store.commit('increment')
            //console.log(store.state.count) // -> 1
        } 

        catch (error) {
            console.log(error)
        }
    }

</script>

<template>
    <div>
        <div class="w-full">
            <input v-model="address" :placeholder="'Enter wallet address'" class="m-14 w-3/4 p-2 bg-gray-800 border-2" type="text">
            <button class="inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out" @click="getAccount">Submit</button>
        </div>
        <!-- <img class="cards" :key='i' v-for="(card, i) in cardObjectsList" :src="'img/cards_artwork/'+ card['source']" alt="" width="250" height="300"> -->
            <div class="inline-flex m-2" :key='i' v-for="(card, i) in cardObjectsList">
                <div>
                    <p>M{{card['order']}}{{card['rarityName']}} {{card['name']}}</p>
                    <a :href="'https://algoexplorer.io/asset/'+card['assetID']" target="_blank"><img draggable="false" :src="'img/cards_artwork/'+ card['source']" :class="card['amount'] > 0 ? 'cards' : 'cards-grey'" width="200" height="250"></a>
                    <p>Amount: {{card['amount']}}</p>
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
img:hover{
    -webkit-transform: scale(1.01);
    /* border-color: #d4d4d4;
    border-width: 1px; */
    transform: scale(1.01);
    transition: 0.05s;
}
</style>
