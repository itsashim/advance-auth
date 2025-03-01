import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res,userId)=>{
    // Generating JWT token
    const token = jwt.sign({userId},process.env.JWT_SECRET, {
        expiresIn: '1d'
    })

    // Setting up cookie
    res.cookie("token", token, {
        httpOnly: true, // This line prevent XSS attack
        secure: process.env.NODE_ENV === "production", // secures only in https
        sameSite: "strict", // This line prevents CSRF attack
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    return token;
};

