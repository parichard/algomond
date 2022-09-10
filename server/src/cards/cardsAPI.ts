import cardsController from './cardsController'
import { Router } from '@awaitjs/express'

const router = Router()

router.getAsync('/:id', async (req, res) => {
  const result = await cardsController.getCardByAssetId(Number(req.params.id));
  res.send(result)
})

router.postAsync('/create', async (req,res)=> {
  const result = await cardsController.createCard(req.body);
  res.send(result)
})

router.putAsync('/update/:id', async (req,res)=> {
  const result = await cardsController.updateCard(req.params.id, req.body);
  res.send(result)
})

router.deleteAsync('/delete/:id', async (req,res)=> {
  const result = await cardsController.deleteCard(req.params.id);
  res.send(result)
})

router.getAsync('/', async (req, res) => {
  const result = await cardsController.getCards();
  res.send(result)
})

export default router
