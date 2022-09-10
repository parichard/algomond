import Card from './index'

export const get = async () => {
    console.log("\t\tCardDAL@get");
    return await Card.find({});
}

export const findOne = async (whereClause) => {
    console.log("\t\tCardDAL@findOne");
    return await Card.findOne(whereClause).exec()
}

export const update = async (whereClause, updateClause) => {
    console.log("\t\tCardDAL@update");
    return await Card.updateOne(whereClause, updateClause);
}

export const create = async (body) => {
  console.log("\t\tCardDAL@create");
  const card = new Card({ 
    name: body.name,
    assetId: body.assetId,
    order: body.order,
    rarity: body.rarity,
    rarityRank: body.rarityRank,
    total: body.total,
    url: body.url
})
  await card.save()
  return card
}
