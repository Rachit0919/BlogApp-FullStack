import { Router } from "express";



import {verifyJWT } from '../middlewares/auth.middleware.js'
import {
    registerUser,
    loginUser,
    logOutUser,
    getCurrentUser
} from '../controllers/user.controller.js'

const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)



// secured routes
router.route('/logout').post(verifyJWT,logOutUser)
router.route('/current-user').get(verifyJWT, getCurrentUser)

export default router;