import {Account} from "../models/accountModel.js"

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export function myBankAccount(req,res) {
     const userID = req.user.id; // Assuming the user is authenticated and we have the user ID

    try {
        const account= Account.findAccountDetails(userID)
        if(!account){
            return res.status(404).json({ message: 'This user does not have a Bank Account.', status:false });
        }
        res.status(200).json({
            account_number: account.account_number,
            balance: account.balance,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}