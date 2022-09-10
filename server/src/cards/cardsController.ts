// @ts-nocheck
import * as cardsDal from './cardsDAL'

export default class CardsController {
    static async getCards() {
        console.log("\tCardController@getCards")
        const cards = await cardsDal.get()
        if(cards) {
            return cards
        }
        return false
    }

    static async getCardByAssetId(id: number) {
        console.log("\tCardController@getCardByAssetId")
        const card = await cardsDal.findOne({asset_id: id})
        if(card) {
            return card
        }
        return false

    }

    static async createCard(body) {
        console.log("\tCardController@createCard");
        const res = await cardsDal.create(body)
        if(res) {
            return res
        }
        return false
    }

    static async deleteCard(id) {
        const card = await cardsDal.findOne({asset_id: id})
        if(card) {
            const res = await card.remove()
            return true
        }
        return false
    }

    static async updateCard(id, body) {
        const card = await cardsDal.update({asset_id: id}, {
            asset_id: body.asset_id, 
            name: body.name
        })
        return card ? true : false
    }
}
