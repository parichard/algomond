<script setup lang="ts">
const cardFilesList = ['M10A_Flying Goblins_284428276.jpeg', 'M10_Flying Goblins_278092927.jpeg', 'M11A_Devil Tomatoes_287293704.jpeg', 'M11_Devil Tomatoes_281441484.jpeg', 'M12A_Mosquito Bomber_290420389.jpeg', 'M12XMAS_Mosquito Bomber_484545211.jpeg', 'M12_Mosquito Bomber_285726914.jpeg', 'M13A_Gondola Harvester_297713070.jpeg', 'M13S_Gondola Harverster_311926563.jpeg', 'M13_Gondola Harvester_288769468.jpeg', 'M14A_Radioactive Dragon_302778444.jpeg', 'M14_Radioactive Dragon_295892162.jpeg', 'M15A_Blood Thirst_306031571.jpeg', 'M15_Blood Thirst_300644594.jpeg', 'M16A_Treasurer_308932148.jpeg', 'M16_Treasurer_304305210.jpeg', 'M17A_Yum Yum_314963260.jpeg', 'M17_Yum Yum_307319666.jpeg', 'M18A_Pirakna_322322733.jpeg', 'M18_Pirakna_312970884.jpeg', 'M19A_Ambush_326901293.jpeg', 'M19_Ambush_317822909.jpeg', 'M1A_Umbrella Lizard_242409412.jpeg', 'M1_Umbrella Lizard_239897840.jpeg', 'M20A_Moon Walker_331188177.jpeg', 'M20_Moon Walker_324616701.jpeg', 'M21A_Soul Steal_337893583.jpeg', 'M21_Soul Steal_329074648.jpeg', 'M22A_Spider_343262752.jpeg', 'M22S_Spider_413276337.jpeg', 'M22_Spider_335296204.jpeg', 'M23A_Virus_350504634.jpeg', 'M23_Virus_340027568.jpeg', 'M24A_Fire Demon_397336912.jpeg', 'M24_Fire Demon_345658984.jpeg', 'M25A_Grumpy Squid_440154578.jpeg', 'M25_Grumpy Squid_386420120.jpeg', 'M26A_Flamingod_540983016.jpeg', 'M26_Flamingod_426938150.jpeg', 'M27A_Cheeky Sorcerer_568721487.jpeg', 'M27_Cheeky Sorcerer_525542774.jpeg', 'M28A_Invasion_596572993.jpeg', 'M28_Invasion_553966974.jpeg', 'M29A_Shroom Squad_788114778.jpeg', 'M29_Shroom Squad_583192426.jpeg', 'M2A_Big Bullies_248418375.jpeg', 'M2_Big Bullies_242410546.jpeg', 'M30_Dragon Essence_611064516.jpeg', 'M31_Malicious Mushroom_788219788.jpeg', 'M3A_Mirror Skeleton_252401436.jpeg', 'M3_Mirror Skeleton_246472780.jpeg', 'M4A_Mighty Turtle_256418078.jpeg', 'M4_Mighty Turtle_250534189.jpeg', 'M5A_Fire Spirit_263117147.jpeg', 'M5_Fire Spirit_254365967.jpeg', 'M6G_Happy Sticks_258395406.jpeg', 'M6R_Mad Sticks_258392987.jpeg', 'M7A_Tiny Magician_268343166.jpeg', 'M7S_Tiny Magician_276312047.jpeg', 'M7_Tiny Magician_260776930.jpeg', 'M8A_Sleepy Giant_274168057.jpeg', 'M8_Sleepy Giant_265916576.jpeg', 'M9A_Laughing Plants_279679614.jpeg', 'M9_Laughing Plants_271094092.jpeg', 'M30A_Dragon Essence_836995785.jpeg', 'M32_Smolting Frens_836997353.jpeg']

const rarityRankMap: Record<string, number> = { '': 0, 'R': 0, 'G': 0, 'A': 1, 'XMAS': 2, 'S': 3, 'AMO': 4 }

const cards = cardFilesList
    .map(filename => {
        const base = filename.replace('.jpeg', '')
        const firstUnderscore = base.indexOf('_')
        const lastUnderscore = base.lastIndexOf('_')
        const code = base.substring(1, firstUnderscore)
        const name = base.substring(firstUnderscore + 1, lastUnderscore)
        const order = Number(code.replace(/[a-zA-Z]/g, ''))
        const rarity = code.replace(/[0-9]/g, '')
        return { filename, name, order, rarity, rarityRank: rarityRankMap[rarity] ?? 0 }
    })
    .filter(c => c.rarity !== 'AMO')
    .sort((a, b) => a.order - b.order || a.rarityRank - b.rarityRank)
</script>

<template>
    <div class="align-center">
        <div class="cardsize inline-flex m-2" v-for="(card, i) in cards" :key="i">
            <div class="cardcomp">
                <p>M{{card.order}}{{card.rarity}} {{card.name}}</p>
                <img draggable="false" :src="'/img/cards_artwork/' + card.filename" :alt="card.name" class="w-full">
            </div>
        </div>
    </div>
</template>

<style scoped>
.align-center {
    text-align: center;
    padding-top: 5rem;
}
.cardsize {
    width: 14%;
}
.cardcomp p {
    font-size: 0.8em;
    height: 1.5em;
}
@media only screen and (max-width: 900px) {
    .cardsize { width: 20%; }
}
@media only screen and (max-width: 600px) {
    .cardsize { width: 28%; }
}
@media only screen and (max-width: 400px) {
    .cardsize { width: 42%; }
}
</style>
