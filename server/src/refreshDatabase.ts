const createdAssets = [] // list of objects for created assets

function cardObject(name, order, rarityRank, rarity, assetID, total, sourceURL) {
    this.name = name // eg: Umbrella Lizard
    this.order = order // eg: Umbrella Lizard is number 1, Big Bullies is number 2, etc.
    this.rarityRank = rarityRank // eg: 0,1,2,3 or 4
    this.rarity = rarity // eg: none, A, S, XMAS, AMO, G, R
    this.assetID = assetID // eg: 12345678
    this.total = total;// how many were minted, 1, 30, 50, 150, 500, 1000
    this.sourceURL = sourceURL // were source image is stored
  }

async function getCreatorAccount () {
    const url = "https://mainnet-idx.algonode.cloud/v2/accounts/5YG5F4Y4BTGVSDEAKZTLINX2RRJAIFRBCAYOL5T3VAV2GDDADC4KJ7DDNA"
    const res = await fetch(url)
    const data = await res.json()
    const assets = data['account']['created-assets']
    assets.forEach((element:any) => {
        const assetId = element['index'] // asset ID
        let cardName = element['params']['name'] // ALGOMOND #1A - Umbrella Lizard
        const total = element['params']['total'] // 150 minted
        const unitName = element['params']['unit-name'] // M1A
        const url = element['params']['url'] // https:// [...]
        let rarity = ""
        let order = ""
        let rarityRank = ""

        // strip card name eg: "ALGOMOND #1A - Umbrella Lizard" ---> "Umbrella Lizard"
        cardName = cardName.replace("ALGOMOND ", "")
        cardName = cardName.replace("- ", "")
        let cardNameSplit = cardName.split(" ")
        cardNameSplit.shift()
        cardName = cardNameSplit.join(' ')

        // strip unitName to get order, rarity, and rarity rank. 
        // eg: [order] "M1A" ---> "1", [rarity] "M1A" ---> "A", [rarityRank] "A" = 1 and "XMAS" = 2
        order = unitName.substring(1)
        rarity = order
        rarity = rarity.replace(/[0-9]/g,"")
        order = order.replace(/[a-zA-Z]/g,"")
        if(rarity===""){rarityRank="0"}
        else if(rarity==="R"){rarityRank="0"}
        else if(rarity==="G"){rarityRank="0"}
        else if(rarity==="A"){rarityRank="1"}
        else if(rarity==="XMAS"){rarityRank="2"}
        else if(rarity==="S"){rarityRank="3"}
        else if(rarity==="AMO"){rarityRank="4"}

        createdAssets.push(new cardObject(assetId, cardName, order, rarity, rarityRank, total, url));
    })

    // sort the Object List of cards by rarityRank and then by order so we have: 1, 1A, 2, 2A, etc.
    createdAssets.sort((a, b) => {
        return a.rarityRank - b.rarityRank
    })

    createdAssets.sort((a, b) => {
        return a.order - b.order
    })
}
