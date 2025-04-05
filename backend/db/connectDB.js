import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Successfully connected to database", conn.connection.host)
    }catch(err){
        console.log(process.env.MONGO_URI)
        console.log("There was an error while connecting",err.message);
        process.exit(1) 
    }
}