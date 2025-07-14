import { Router } from "express";
import { checkUser } from "../middleware/checkUser.js";
import {deposit} from '../controllers/depositController.js'
import {getDeposits, getTransactionHistory, getTransfers} from '../controllers/transactionController.js'

const router=Router();

router.post('/deposit', checkUser, deposit);

router.get('/deposits', checkUser, getDeposits);

router.get('/transfers', checkUser, getTransfers);

// Get all transaction history 
router.get('/history', checkUser, getTransactionHistory);


export default router;