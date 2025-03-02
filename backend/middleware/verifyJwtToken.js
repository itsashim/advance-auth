import jwt from "jsonwebtoken";

export const verifyJwtToken = async (req,res,next)=>{
    const token = req.cookies.token; // Extracting Token From cookie

    if(!token) return res.status(401).json({success: false, message:"Unauthorized- not token provided"})

    try {
    const decoded =  jwt.verify(token,process.env.JWT_SECRET);    
    if(!decoded) return res.status(401).json({success: false, message:"Unauthorized- invalid token"})
    console.log(decoded);
    req.userId = decoded.userId;
    next()
    } catch (error) {
    console.log("Error in verifyToken",error);
    res.status(500).json({success: false, message: error.message})        
    }
}