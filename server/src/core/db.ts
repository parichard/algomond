import mongoose from 'mongoose'
import fetch from 'node-fetch'
import CardModel from '../cards'

export const connectMongoDB = async () => {
  try {
    const url = process.env.MONGO_URL || 'mongodb://mongo:mongo@localhost:27017/card?authSource=admin'
    console.log('trying db connection')
    await mongoose.connect(url)


    console.log('connection to algomongo successfull')
  } catch(e) {
    console.log(e)
  }
}

export const populateDB = async () => {
  try {
    console.log('getting cards from algoexplorer API...')
    const cards = await createCardsArray()
    const cardsModel = []

    // IF DB NOT EMPTY POPULATE IT WITH CARDS FROM ALGOEXPLORER
    CardModel.findOne({}, (err, card) => {
      if(!card) {
        cards.forEach((element: Card) => {
          const card = new CardModel(element);
          cardsModel.push(card)
        });

        CardModel.insertMany(cardsModel)
      }
    })

  } catch(e) {
    console.log(e)
  }
}

type Card = {
  assetId: number // eg: 12345678
  name: string // eg: Umbrella Lizard
  order: number // eg: Umbrella Lizard is number 1, Big Bullies is number 2, etc.
  rarity: string // eg: none, A, S, XMAS, AMO, G, R
  rarityRank: number // eg: 0,1,2,3 or 4
  total: number// how many were minted, 1, 30, 50, 150, 500, 1000
  url: string // were source image is stored
}

type Asset = {
  assetId: number,
  cardName: string,
  total: number,
  unitName: string,
  url: string
}


const createCardsArray = async () => {
  const url = "https://mainnet-idx.algonode.cloud/v2/accounts/5YG5F4Y4BTGVSDEAKZTLINX2RRJAIFRBCAYOL5T3VAV2GDDADC4KJ7DDNA"
  const res = await fetch(url)
  const data = await res.json()

  const cards = []

  data['account']['created-assets'].forEach(element => {
    const asset: Asset = {
      assetId: element.index, // asset ID
      cardName: element.params['name'], // ALGOMOND #1A - Umbrella Lizard
      total: element.params['total'], // 150 minted
      unitName: element.params['unit-name'], // M1A
      url: element.params['url'] // https:// [...]
    }

    const card: Card = createCardObject(asset)
    cards.push(card)
  });
  // sort the Object List of cards by rarityRank and then by order so we have: 1, 1A, 2, 2A, etc.
  cards.sort((a, b) => {
    return a.rarityRank - b.rarityRank
  })

  cards.sort((a, b) => {
    return a.order - b.order
  })

  return cards
}

function createCardObject(asset: Asset): Card {
  const rarityMap = {
    '': 0,
    'R': 0,
    'G': 0,
    'A': 1,
    'XMAS': 2,
    'S': 3,
    'AMO': 4,
  }

  const unitName = asset.unitName.substring(1)
  let assetName = asset.cardName.replace("ALGOMOND ", "").replace("- ", "").split(" ")
  assetName.shift()

  const assetId = Number(asset.assetId)
  let name = assetName.join(' ')
  const order = Number(unitName.replace(/[a-zA-Z]/g,""))
  const rarity = unitName.replace(/[0-9]/g,"")
  const rarityRank = rarityMap[rarity]
  const total = Number(asset.total)
  const url = String(asset.url)

  if (asset.cardName === "ALGOMOND - M1A Making Of") name = "Umbrella Lizard"
  else if (asset.cardName === "ALGOMOND - M2A Making Of") name = "Big Bullies"
  else if (asset.cardName === "ALGOMOND - M3A Making Of") name = "Mirror Skeleton"

  return {
    assetId,
    name,
    order,
    rarity,
    rarityRank,
    total,
    url
  }
}
