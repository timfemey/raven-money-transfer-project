import {User} from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import validator from "validator";
import {createUniqueAccount} from '../helpers/createUniqueAccount.js'
import { Account } from '../models/accountModel.js';

/**
 * Sign UP Users
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export async function signup(req,res) {
    try{
        if(!req.body){
            return res.status(401).json({message:"Invalid Details",status:false})
        }
        const user={email:String(req.body.email),password:req.body.password,name:req.body.name}
        
        if(!validator.isEmail(email)|| name==null || String(name).length<2 || password==null || String(password).length<8){
            return res.status(401).json({message:"Invalid Details Received",status:false})
        }

        if (User.userExist(user.email)) {
            return res.status(401).json({message:"This account exists already !",status:false})
        }

        const newUser=await User.create(user);

        const account_number=createUniqueAccount()
        await Account.create(newUser.id , account_number)

        res.status(201).json({message:"SignUp Successful!",status:true,account_number:account_number})
    
    }catch(error){
        res.status(500).json({message:"Error Signing Up",status:false})
        console.error(error)
        
    }
}

/**
 * LogIn Users
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export async function login(req,res) {
    try {
        const {email,password}=req.body;
        const user= User.findByEmail(String(email));
        if(!user || !(bcrypt.compareSync(String(password),user.password))){
            return res.status(401).json({message:"Invalid Login Details ",status:false})
        }

        const token=jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:"1d"})
        res.status(200).json({message:"Login successful",token})
        
    } catch (error) {
        res.status(500).json({message:"Error logging in",status:false})
        console.error(error)
    }
}