import { Router } from 'express'
const router = Router()
import { body } from "express-validator";
import { login, register,storedAvatar,fetchUsers,getCurrentUser } from '../controllers/authController.js'
import parsedToken from "../middleware/parsedToken.js"

router.post('/register',[
body("email").isEmail().withMessage("invalid email"),
body("password").isLength({min: 8}).withMessage("Password Too Short"),
body("username").isLength({min: 6}).withMessage("Username Too Short")
],register)

router.post('/login',
[
    body("email").isEmail().withMessage("invalid email"),
    ]
,login)


router.post("/setAvatar/:token",
parsedToken,
storedAvatar)

router.get("/fetchusers/:token",parsedToken, fetchUsers)

router.get("/getCurrentUser/:token",parsedToken, getCurrentUser)


export default router