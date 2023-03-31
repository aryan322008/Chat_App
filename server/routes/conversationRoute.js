import { Router } from 'express'
const router = Router()
import { body } from "express-validator";
import {createUserConversationSchema,sendMessage} from '../controllers/msgController.js'
import parsedToken from "../middleware/parsedToken.js"

router.post('/createCollection',createUserConversationSchema)

router.post("/sendMessage", sendMessage)



export default router