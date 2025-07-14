import { Router } from "express";
import { checkUser } from "../middleware/checkUser.js";
import { myBankAccount } from "../controllers/bankAccountController.js";

const router = Router();

router.get("/", checkUser, myBankAccount);

export default router;
