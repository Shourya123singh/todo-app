
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
export const  authenticate= async(req,res,next)=>{
  
    try{

        const token=req.cookies.jwt;
        if(!token){
            return res.status(401).json({message:"Unauthorized"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
       req.user= await User.findById(decoded.userId);
       next();
    }catch(error){
return res.status(401).json({message:""+error.message});
    }
    

};