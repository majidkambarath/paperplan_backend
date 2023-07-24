import { Router } from "express";
import {ChatBotStart} from '../../controllers/Chat/Chat.js'
const router = Router()

router.post('/incoming',ChatBotStart)

export default router