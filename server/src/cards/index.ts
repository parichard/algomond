import * as mongoose from 'mongoose'

const CardSchema = new mongoose.Schema({
  assetId: Number, // eg: 12345678
  name: String, // eg: Umbrella Lizard
  order: Number, // eg: Umbrella Lizard is number 1, Big Bullies is number 2, etc.
  rarity: String, // eg: none, A, S, XMAS, AMO, G, R
  rarityRank: Number, // eg: 0,1,2,3 or 4
  mondScore: Number, // how many $MOND per week for staking
  total: Number,// how many were minted, 1, 30, 50, 150, 500, 1000
  url: String // were ifps source image is stored
})

const Card = mongoose.model('Card', CardSchema)

export default Card
