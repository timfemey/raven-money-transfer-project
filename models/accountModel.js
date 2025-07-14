import { db } from "../config/db.js";
export const Account = {
    /**
     * 
     * @param {number} id 
     * @param {number} account_number 
     */
    async create(id, account_number) {
        await db("accounts").insert({ id: id, account_number: account_number, balance: 0 })
    },
    /**
     * 
     * @param {number} id 
     */
    async findAccountDetails(id) {
        const acc = await db("accounts").where({ id: id }).first()
        if (acc) {
            return { account_number: acc.account_number, balance: acc.balance }
        }
    },
 /**
     * 
     * @param {number} id 
     * @param {number} amount 
     */
    async updateBalance(id,amount){
        await db('accounts')
            .where({ id: id })
            .increment('balance', amount);
    }

}