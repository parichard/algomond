// @ts-nocheck

import * as mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  token: String,
  email: String,
  wallet: String,
  decks: String,
  newsletter: Boolean

})

const User = mongoose.model('User', UserSchema)

export default User