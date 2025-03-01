import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js"


dotenv.config(); // Facilitates the user of .env variables

const app = express();
const port = 5000
app.use(express.json())
app.use("/auth/api/",authRoutes);

app.listen(port,()=>{
    connectDB();
    console.log("Server is running on",port);
})

