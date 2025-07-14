import { Router } from "express";
import { checkUser } from "../middleware/checkUser.js";
import {sendMoney} from '../controllers/transferController.js'

const router=Router();

router.post('/sendMoney', checkUser, sendMoney); 

export default router;