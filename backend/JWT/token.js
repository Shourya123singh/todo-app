
import jwt from "jsonwebtoken"
import User from "../model/user.model.js";
export const generateTokenAndSaveInCookies= async (userid,res)=>{
   const token= jwt.sign({userid},process.env.JWT_SECRET_KEY,{
        expiresIn:"10d"
    })
    res.cookie("jwt",token,{
httpOnly:true,
secure:false,
sameSite:"lax",
path:"/"



    })
   await  User.findByIdAndUpdate(userid,{token})
};