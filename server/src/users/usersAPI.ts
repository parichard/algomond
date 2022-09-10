import usersController from './usersController'
import { Router } from '@awaitjs/express'

const router = Router()

router.getAsync('/', async (req, res) => {
  const result = await usersController.createUser();
  res.send(result)
})

export default router
