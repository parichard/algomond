
// @ts-nocheck

import { RequestHandler as Middleware } from 'express'
import validator from 'validator'
import createError from 'http-errors'

export const checkCard: Middleware = (req, res, next) => {
    const body = {
        name: req.body.name + '',
        hp: req.body.hp + '',
        ad: req.body.ad + '',
    }
    for (const param in body) {
        if(validator.isEmpty(body[param])) throw createError(400, param + ' is missing')
    }
    if(!validator.isInt(body.ad) || !validator.isInt(body.hp)) throw createError(400, 'Hp and Ad must be a Number')
    next()
}
