import { randomUUID } from "node:crypto";
import { db } from "../config/db.js";

export const Transaction = {
    /**
     *
     * @param {number} id
     * @param {'deposit' | 'transfer'} transaction_type
     * @param {number} amount
     * @param {number} receipent_account
     * @param {'pending' | 'failed' | 'successful'} status
     * @param {Date} created_at
     * @param {string} transaction_id
     */
    async addTransaction(
        id,
        transaction_type,
        amount,
        receipent_account,
        status, transaction_id
    ) {
        const transactionID = `txn-${randomUUID()}`;
        await db("transactions").insert({
            user_id: id,
            transaction_type: transaction_type,
            amount: amount,
            recipient_account: receipent_account,
            transaction_id: transaction_id=="" ?  transactionID: transaction_id,
            status: status, 
            created_at: new Date(),
        });
        return transactionID;
    },

    /**
     *
     * @param {number} id
     */
    async fetchAllDeposits(id) {
        const data = await db("transactions")
            .where({ user_id: id, transaction_type: "deposit" })
            .select("amount", "created_at", "status", "transaction_id")
            .orderBy("created_at", "desc");
        return data;
    },

    /**
     *
     * @param {number} id
     */
    async fetchTransfers(id) {
        const data = await db("transactions")
            .where({ id: id, transaction_type: "transfer" })
            .select(
                "amount",
                "recipient_account",
                "status",
                "transaction_id",
                "created_at"
            )
            .orderBy("created_at", "desc");

        return data;
    },

    /**
     *
     * @param {number} id
     */
    async fetchTransactionHistory(id) {
        const data = await db('transactions')
            .where({ user_id: id })
            .select('transaction_type', 'amount', 'recipient_account', 'status', 'transaction_id', 'created_at')
            .orderBy('created_at', 'desc');

        return data;
    }
};
