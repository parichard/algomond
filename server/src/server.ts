import express from 'express'
import { json } from 'body-parser'
import { connectMongoDB, populateDB } from './core/db'
import cors from 'cors'

import cards from './cards/cardsAPI'
import auth from './auth/authAPI'

(async () => {

  const PORT_NUMBER = 3000

  await connectMongoDB()
  await populateDB()

  const app = express()

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
