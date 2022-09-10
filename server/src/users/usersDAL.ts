import User from './index'

export const get = async () => {
    console.log("\t\tUserDAL@get");
    return await User.find({});
}

export const findOne = async (whereClause) => {
    console.log("\t\tUserDAL@findOne");
    return await User.findOne(whereClause).exec()
}

export const update = async (whereClause, updateClause) => {
    console.log("\t\tUserDAL@update");
    return await User.updateOne(whereClause, updateClause);
}

export const create = async (body) => {
  console.log("\t\tUserDAL@create");
  const user = new User({ 
    username: body.username,
    password: body.password,
    token: body.token,
    email: body.email,
    wallet: body.wallet,
    decks: body.decks,
    newsletter: body.newsletter
})
  await user.save()
  return user
}
