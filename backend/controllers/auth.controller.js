import bcrypt from "bcryptjs";
import crypto from "crypto";

import { User } from "../models/user.model.js";
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendPasswordResetEmail, sendVerificationCode, sendWelcomeEmail } from "../mailtrap/mail.js";
import { getBaseUrl } from "../utils/getBaseUrl.js";

const signup = async (req,res)=>{
    const {email,password,name} = req.body;
    try{

        // If missing credentials
        if(!email || !password || !name){
            throw new Error("All fields are required");
        }

        // If user already exists
        const userAlreadyExists = await User.findOne({email});
        if(userAlreadyExists){
            throw new Error("User already exists!");
        }

        // Hasing password for security
        const hashPassword = await bcrypt.hash(password, 10);

        // Generating six digits Verification Code to send in email
        const verificationCode = generateVerificationCode();

        // Creating New User to save in DB
        const user = new User({
            email,
            password: hashPassword,
            name,
            verificationToken: verificationCode,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // Setting 24 hours
        })
        await user.save();

        // Generating JWT token for client validation and storing in cookie
        generateTokenAndSetCookie(res,user._id);

        await sendVerificationCode(email,verificationCode)

        res.status(201).json({success: "true",message: "User created Successfully" , user: {
            ...user._doc, //spreading user 
            password: undefined // setting password to null inorder to prevent from client getting password
        }
        })
    }catch(err){
        res.status(400).json({success: "false", error: err.message})
    }
}

const verifyEmail = async (req,res)=> {
    const {code} = req.body;

    const user = await User.findOne({
        verificationToken: code,
        verificationTokenExpiresAt: {$gt: Date.now()}
    })

    if(!user){
        return res.status(400).json({success: false, message: "Invalid or expired Validation Code"})
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    user.save();

    // Send Welcome Email
    await sendWelcomeEmail(user.email)
    res.status(200).json({success: true,message: "Mail sent successfully",user:{
        ...user._doc,
        password: undefined
    },
    })
}

const login = async (req,res)=>{
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
    if(!user){
        res.status(400).json({success:false, message: "User not found"})
    }
    const passwordCheck = await bcrypt.compare(password,user.password); 
    if(!passwordCheck){
        return res.status(401).json({success: false, message: "Invalid password"});
    }
    generateTokenAndSetCookie(res,user._id);

    user.lastLogin = Date();
    await user.save();
    res.status(200).json({success: true, message: "Success Login", user: {
        ...user._doc,
        password: undefined,
    }})

    }catch(err){
        console.error("There was an issue in login");
        res.status(400).json({success: false, message: err.message})
    }
}

const logout = async (req,res)=>{
    res.clearCookie("token");
    res.status(200).json({success: true,message: "successfully logged out"})
}

// Reset and Forgot Password

// Generates token and sends to client
const forgotPassword = async (req,res)=>{
    const {email} = req.body;
    try {
        const user = await User.findOne({email});

        if(!user){
            res.status(400).json({success: false, message: "User not found"})
        }

        // Generating Token for Reset password
        const resetToken = crypto.randomBytes(10).toString('hex');
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000
        console.log(resetToken,resetTokenExpiresAt);
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt
        user.save();

        await sendPasswordResetEmail(email,`${getBaseUrl()}/auth/api/reset-password/${resetToken}`);

        res.status(200).json({success: true, message: "password reset link sent to your email"})

    } catch (error) {
        console.error("Invalid or expired reset token",error)
        res.status(400).json({success: false,message: error.message});
    }
}
// Actual change in password
const resetPassword = async (req,res)=>{
    const {token} = req.params;
    const {password} = req.body;
    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: {$gt: Date.now()}
        })
        if(!user){
            return res.status(400).json({success: false, message: "No user found"});
        }
        const hashPassword = await bcrypt.hash(password,10);
        user.password = hashPassword;
        user.resetPasswordExpiresAt = undefined;
        user.resetPasswordToken = undefined;
        user.save();
        res.status(200).json({success:true,message:"Password changed successfully",user:{
            ...user._doc,
            password: undefined
        }})
    } catch (error) {
        console.error("There was an error resetting password",error);
        res.status(400).json({success: false, message: error.message})
    }
}

export {signup,login,logout,verifyEmail,forgotPassword,resetPassword
}