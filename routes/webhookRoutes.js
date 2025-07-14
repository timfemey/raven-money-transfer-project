import { Router } from "express";
import {webhookHandler} from '../controllers/webhookController.js'

const router = Router();

router.post('/', webhookHandler);

export default router;
