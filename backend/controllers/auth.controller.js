import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

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

        res.status(201).json({success: "true",message: "User created Successfully" , user: {
            ...user._doc, //spreading user 
            password: undefined // setting password to null inorder to prevent from client getting password
        }
        })
    }catch(err){
        res.status(400).json({success: "false", error: err.message})
    }
}

const login = async (req,res)=>{
    res.send("login")
}

const logout = async (req,res)=>{
    res.send("login")
}

export {signup,login,logout}