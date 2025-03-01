import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Successfully connected to database", conn.connection.host)
    }catch(err){
        console.log("There was an error while connecting",err.message);
        process.exit(1) // 1 for failure and 0 for success
    }
}