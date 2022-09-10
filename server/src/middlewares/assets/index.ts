// @ts-nocheck

import { RequestHandler as Middleware } from 'express'
import validator from 'validator'
import createError from 'http-errors'

export const checkAsset: Middleware = async(req, res, next) => {
    const body = {
        asset_id: req.body.asset_id + '',
        image_id: req.body.image_id + '',
        rarity: req.body.rarity + '',
        price: req.body.price + '',
    }
    for (const param in body) {
        if(validator.isEmpty(body[param])) throw createError(400, param + ' is missing')
        if(!validator.isInt(body[param])) throw createError(400, param + ' must be a Number')
    }
    next()
}