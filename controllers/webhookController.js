import { db } from "../config/db.js";
import { Transaction } from "../models/transactionModel.js";
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
export async function webhookHandler(req, res) {
  const trx = await db.transaction();
  try {
    const webhookPayload = req.body;

    const { transaction_id, amount, sender_account, receiver_account, status } =
      webhookPayload; // Payload data

    if (
      !transaction_id ||
      !amount ||
      !sender_account ||
      !receiver_account ||
      !status
    ) {
      return res
        .status(400)
        .json({ message: "Invalid webhook payload.", status: false });
    }

    if (status == "success") {
      const sender = await trx("accounts")
        .where({ account_number: sender_account })
        .first();

      if (!sender) {
        throw new Error(`Sender account ${sender_account} not found.`);
      }

      if (sender.balance < amount) {
        throw new Error("Insufficient balance in sender account.");
      }

      const receiver = await trx("accounts")
        .where({ account_number: receiver_account })
        .first();

      if (!receiver) {
        throw new Error(`Receiver account ${receiver_account} not found.`);
      }

      // Update Sender account
      await trx("accounts")
        .where({ account_number: sender_account })
        .decrement("balance", amount);

      //Update receiver account
      await trx("accounts")
        .where({ account_number: receiver_account })
        .increment("balance", amount);

      // Add transaction
      Transaction.addTransaction(
        sender.id,
        "transfer",
        amount,
        receiver_account,
        "successful",
        transaction_id
      );

      await trx.commit(); 
    }

    res
      .status(200)
      .json({ message: "Webhook Event successfully handled!", status: false });
  } catch (error) {
    await trx.rollback();
    console.error("Error in webhook:", error.message);
    res.status(500).json({ message: `An Error Occured: ${error.message}` });
  }
}
