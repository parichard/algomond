import express from 'express'
import path from 'path'
import serveStatic from 'serve-static'
import { json } from 'body-parser'
import { connectMongoDB, populateDB } from './core/db'
import cors from 'cors'

import cards from './cards/cardsAPI'
import auth from './auth/authAPI'

(async () => {

    const PORT_NUMBER = process.env.PORT || 3000

    await connectMongoDB()
    await populateDB()

    const app = express()


    //use the serve-static package to serve the bundled app files in the dist directory
    app.use('/', serveStatic(path.join(__dirname, '/dist')))

    // this * route is to serve project on different page routes except root `/`
    app.get(/.*/, function (req, res) {

        res.sendFile(path.join(__dirname, '/dist/index.html'))

    })

    app.use(json())
    app.use('/cards', cards) // defines url in browser
    app.use('/', auth)
    app.use(cors({origin: function() {return true}}))
    app.use(function(error, req, res, next) {
        const code = error.status || 500
        res.status(code)
        res.json({
            status: error.status,
            message: code === 500 ? 'There was an error try again later' : error.message,
        })
    })
    app.listen(PORT_NUMBER)
    console.log("server started on port " + PORT_NUMBER)

})()
