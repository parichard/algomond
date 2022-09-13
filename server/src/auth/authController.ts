import * as usersDAL from '../users/usersDAL'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import createError from 'http-errors'
import fetch from 'node-fetch'

const salt = process.env.PASS_SALT || "d9bdc282cb696731d7b724aa8193eefafbb91fd96dbc961586bc940ef974158e7ed9df21bb7c8d301e414e4e2e4cbaaef17aa73ec26d6214c794bac0874d1e35"

export default class AuthController {

    static async signup(body) {
        console.log("\tAuthController@signup");
        const user = await usersDAL.findOne({username: body.username}) // calls userDAL
        if(user) {
            throw createError(501, 'User already exists')
        }

        body.password = await bcrypt.hash(body.password, 12) //hashes password

        const result = await usersDAL.create(body)
        await usersDAL.update({username: result.username}, { token: generateAccessToken(result.username)})
        const res = await usersDAL.findOne({username: result.username})
        return {
            status: 200,
            id: res.id,
            username: res.username,
            token: res.token
        }
    }

    static async login(body) {
        console.log("\tAuthController@login");
        // get user from database
        let user = await usersDAL.findOne({username: body.username})
        // if user is in database
        if(user) {
            // compare passwords
            const compare = await bcrypt.compare(body.password, user.password) // body.password = from user, user.password = from database
            if(!compare) {
                throw createError(400, 'Passwords do not match')
            }
            await usersDAL.update({username: user.username}, { token: generateAccessToken(user.username)})
            user = await usersDAL.findOne({username: body.username})
            console.log(user.username + ' is logged in at date: ' + Date.now())
            return {
                status: 200,
                username: user.username,
                token: user.token,
                wallet: user.wallet
            }
        }
        throw createError(404, 'User not found')
    }

    static async verifyWallet(body, username) {
        console.log("\tAuthController@verifyWallet");
        console.log(body.wallet + " and user: " + username)
        // get user from database
        let user = await usersDAL.findOne({username: username})
        // // if user is in database
        let count = 0
        let check = false
        while(!check && count < 6){
            let check = await retryCheckWallet(username, body)
            count ++
            console.log(check, count)
            if(user && check) {
                await usersDAL.update({username: username}, { wallet: body.wallet})
                user = await usersDAL.findOne({username: username})
                console.log(username + ' has saved their wallet ' + body.wallet)
                return {
                    status: 200,
                    username: user.username,
                    token: user.token,
                    wallet: user.wallet
                }
            }
        }
        throw createError(404, 'Could not verify wallet')
    }

    static async verify(username) {
        console.log("\rAuthController@verify")
        const user = await usersDAL.findOne({username: username})
        if(user) {
            return {
                status:200,
                username: user.username
            }
        }
        return false
    }

    static async logout(username) {
        console.log(username)
        console.log("\rAuthController@logout")
        const user = await usersDAL.findOne({username: username})
        if(user) {
            await usersDAL.update({username: user.username}, { token: ''})
            return true
        }
        return false
    }
    static async removeWallet(username) {
        console.log(username)
        console.log("\rAuthController@removeWallet")
        const user = await usersDAL.findOne({username: username})
        if(user) {
            await usersDAL.update({username: user.username}, { wallet: ''})
            return true
        }
        return false
    }
}

function generateAccessToken(username) {
    console.log("\rAuthController@generateToken");
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        expiresIn: "60d",
        data: username
    }, salt)
}

async function retryCheckWallet(username, body){
    const sleep = (millis) => {
        return new Promise(resolve => setTimeout(resolve, millis));
      }
    let delay = await sleep(3000)
    let check = await checkTx(username, body.wallet, delay)
    return check
}

async function checkTx(username, wallet, delay){
    console.log("checking tx on algoexplorer for user: " + username + " with wallet: " + wallet + " with delay: " + delay)

    // create a buffer
    const buff = Buffer.from(username, 'utf-8');
    // decode buffer as Base64
    const base64 = buff.toString('base64');
    const note = encodeURIComponent(base64)
    try {
        const url = "https://algoindexer.algoexplorerapi.io/v2/accounts/"+ wallet + "/transactions?limit=1&note-prefix=" + note
        const res = await fetch(url)
        const data = await res.json()
        const tx = data['transactions'][0]
        if (tx['payment-transaction']['receiver']===wallet) return true
        else return false
    }
    catch{
        return false
    }
}
