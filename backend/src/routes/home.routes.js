import {Router} from "express"

import {verifyJWT } from '../middlewares/auth.middleware.js'
import { upload } from "../middlewares/multer.middleware.js"

import{
    getAllPosts,
    getPostByIdAndImageUrl
} from "../controllers/blog.controller.js"

const router = Router()
router.route('/all-posts').get(verifyJWT,getAllPosts)
router.route('/post/:id').get(verifyJWT,getPostByIdAndImageUrl)


export default router