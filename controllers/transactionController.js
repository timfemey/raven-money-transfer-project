import { Transaction } from "../models/transactionModel.js";

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
export async function getDeposits(req, res) {
  try {
    const userID = req.user.id;

    const deposits = await Transaction.fetchAllDeposits(userID);

    if (deposits.length === 0) {
      return res
        .status(404)
        .json({ message: "No deposit transactions found.", status: false });
    }

    res.status(200).json({ deposits: deposits });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Error getting deposists" });
  }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
export async function getTransfers(req, res) {
  try {
    const userId = req.user.id;

    const transfers = await Transaction.fetchTransfers(userId);

    if (transfers.length === 0) {
      return res
        .status(404)
        .json({ message: "No transfer transactions was found." });
    }

    res.status(200).json({ transfers: transfers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Error getting transfers" });
  }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
export async function getTransactionHistory(req, res) {
  try {
    const userID = req.user.id;

    const transactions = await Transaction.fetchTransactionHistory(userID);

    if (transactions.length === 0) {
      return res.status(404).json({ message: "No transaction history available" });
    }

    res.status(200).json({ transactions: transactions });
  } catch (error) {
    console.error(error);
     res.status(500).json({ status: false, message: "Error getting transaction history" });
  }
}
