import { Account } from "../models/accountModel.js";
import { Transaction } from "../models/transactionModel.js";
import { randomUUID } from "node:crypto";
import axios from "axios"
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
export async function sendMoney(req,res) {
  const { amount, bank, bank_code, account_number, account_name, narration } =
    req.body;
  const userID = req.user.id;

  try {
    const bank_account = Account.findAccountDetails(userID);
    if (!bank_account) {
      return res.status(404).json({ message: "Bank account not found." });
    }

    if (bank_account.balance < amount) {
      return res.status(401).json({ message: "Insufficient Funds" });
    }

    const ref = `txn-${randomUUID()}`;

    const transferData = {
      amount,
      bank,
      bank_code,
      account_number,
      account_name,
      narration: narration || "Fund Transfer",
      reference: ref,
      currency,
    };

    // Send transfer POST request to raven atlas API
    const response = await axios.post(
      "https://integrations.getravenbank.com/v1/transfers/create",
      transferData,
      {
        headers: {
          Authorization: `Bearer ${process.env.RAVEN_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status==200 && response.data.status == "success") {
      await Account.updateBalance(userID, -amount);
      await Transaction.addTransaction(
        userID,
        "transfer",
        amount,
        account_number,
        "successful",
        ref
      );

      res.status(200).json({status:true,message:`Successfully started Transfer of ${amount} to ${account_name}`})
    }

    
  } catch (error) {
    console.error(error);

    await Transaction.addTransaction(userID,"transfer",amount,account_number,"failed")

    res
      .status(500)
      .json({
        status: false,
        message: "Failed to send money, an error occured!",
      });
  }
}
