import express from   "express";
import mongoose from  "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import todoRoute from "./routes/routes.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";

const app=express();
dotenv.config();
const port=process.env.port ||4004;
const DB_URI=process.env.MONGODB_URI;

app.use(express.json());
app.use(cors({
origin:process.env.FRONTEND_URL,
credentials:true,
methods:"GET,POST,PUT,DELETE",
allowedHeaders:["Content-Type","Authorization"]


}));
app.use(cookieParser());


try {
await mongoose.connect(DB_URI);
console.log("connected to mongo database");
} catch (error) {
    console.log(error);
}

app.use("/todo",todoRoute);
app.use("/user",userRoute);


app.listen(port,()=>{
    console.log(`Example port listening on port ${port}`);
});