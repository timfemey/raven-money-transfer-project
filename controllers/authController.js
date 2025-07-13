import {User} from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import validator from "validator";
// import {createVirtualAccount} from '../helpers/createVirtualAccount.js'

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
        const user={email:String(req.body.email),password:req.body.password,first_name:req.body.first_name, balance:0}
        
        if(!validator.isEmail(email)|| first_name==null || String(first_name).length<2 || password==null || String(password).length<8){
            return res.status(401).json({message:"Invalid Details Received",status:false})
        }

        const newUser=await User.create(user);
        // createVirtualAccount()
        res.status(201).json({message:"SignUp Successful!",status:true,user:{id:newUser.id,email}})
    
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
        const user=await User.findByEmail(String(email));
        if(!user || !(bcrypt.compareSync(String(password),user.password))){
            return res.status(401).json({message:"Invalid Credentials",status:false})
        }

        const token=jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:"1d"})
        res.status(200).json({message:"Login successful",token})
        
    } catch (error) {
        res.status(500).json({message:"Error logging in",status:false})
        console.error(error)
    }
}