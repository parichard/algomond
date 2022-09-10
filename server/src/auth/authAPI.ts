import { Router } from '@awaitjs/express'
import AuthController from './authController'
import {authenticateToken, checkSignup} from '../middlewares/auth'

const router = Router()

router.getAsync('/logout', authenticateToken, async function(_, res ) {
    console.log(res.locals.user)
    const result = await AuthController.logout(res.locals.user)
    res.status(200).send(result)
})
router.getAsync('/removewallet', authenticateToken, async function(_, res ) {
    console.log(res.locals.user)
    const result = await AuthController.removeWallet(res.locals.user)
    res.status(200).send(result)
})

router.getAsync('/verify', authenticateToken, async function(_, res ) {
    let result = await AuthController.verify(res.locals.user)
    res.status(200).send(result)
})

router.postAsync('/login', checkSignup, async function(req, res) {
    const result = await AuthController.login(req.body);
    res.status(200).send(result);
})

router.postAsync('/signup', checkSignup, async function(req, res) {
    const result = await AuthController.signup(req.body);
    res.status(200).send(result);
})

router.postAsync('/verifywallet', authenticateToken, async function(req, res) {
    console.log(res.locals.user+" verify wallet")
    const result = await AuthController.verifyWallet(req.body, res.locals.user);
    res.status(200).send(result);
})

export default router