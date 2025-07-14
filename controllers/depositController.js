import { Account } from "../models/accountModel.js";
import { Transaction } from "../models/transactionModel.js";
import axios from "axios";

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
export async function deposit(req, res) {
  try {
    const { amount } = req.body;
    const userID = req.user.id; // user ID parsed from middleware

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid deposit amount." });
    }

    const acc_details = await Account.findAccountDetails(userID);

    if (!acc_details) {
      res
        .status(404)
        .json({ message: "Bank Account not found in database", status: false });
    }

    const transactionID = await Transaction.addTransaction(
      userID,
      "deposit",
      amount,
      acc_details.account_number,
      "pending",
      ""
    );

    const webhookData = {
      transaction_id: transactionID,
      amount: amount,
      sender_account: "external",
      receiver_account: acc_details.account_number,
      status: "success",
    };

    await axios.post(process.env.WEBHOOK_URL, webhookData, {
      headers: { "Content-Type": "application/json" },
    });

    res.status(200).json({
      message: "Deposit process has started",
      transaction_id: transactionID,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Error occured during deposit." });
    console.error(error);
  }
}
