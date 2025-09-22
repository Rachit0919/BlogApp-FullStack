import {Router} from "express"

import {verifyJWT } from '../middlewares/auth.middleware.js'

import{
    createPost,
    editPost,
    deletePost,
} from "../controllers/blog.controller.js"

const router = Router()

router.post("/posts", verifyJWT, createPost);
router.put("/posts/:_id", verifyJWT, editPost);
router.delete("/posts/:_id", verifyJWT, deletePost);

export default router;