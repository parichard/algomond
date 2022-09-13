
// @ts-nocheck

import { RequestHandlerParams as Middleware } from 'express'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import { IncomingHttpHeaders } from 'http';
import createError from 'http-errors'
import userDAL from '../../users'

const salt = process.env.PASS_SALT || "d9bdc282cb696731d7b724aa8193eefafbb91fd96dbc961586bc940ef974158e7ed9df21bb7c8d301e414e4e2e4cbaaef17aa73ec26d6214c794bac0874d1e35"

const getTokenFromHeaders = (headers: IncomingHttpHeaders) => {
    const header = headers.authorization as string

    if (!header)
    return header

    return header.split(' ')[1]
}

export const authenticateToken: Middleware = async (req, res, next) => {
    console.log("\rAuthMiddleware@authenticateToken")
    const token = getTokenFromHeaders(req.headers) || ''
    if(!token) throw createError(403, 'Invalid token')
    jwt.verify(token, salt, (err, decoded) => {
        if(err) throw createError(403, 'Invalid token')
        res.locals.user = decoded.data
        console.log(decoded.data)
    })
    const user = await userDAL.findOne({username: res.locals.user})
    if(!token === user.token) throw createError(405, 'Not Authorized')
    next()
}

export const checkSignup: Middleware = (req, res, next) => {
    if(validator.isEmpty(req.body.password + '') || validator.isEmpty(req.body.username + '')) {
        throw createError(400, 'Username or password is missing')
    }
    next()
}