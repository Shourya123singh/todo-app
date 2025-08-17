
import User from "../model/user.model.js";
import { generateTokenAndSaveInCookies } from "../JWT/token.js";
import {z} from "zod";
import bcrypt from "bcryptjs";
const userSchema=z.object({
email:z.string().email({message:"invalid email"}),
password:z.string().min(6,{message:"chr should be more than 6 chr"}),
username:z.string().min(3,{message:"username should be more than 3 chr"})

})

export const signup =async(req,res)=>{
    try{
const {email,password,username}=req.body;
if(!email || !password || !username){
   return  res.status (400).json({message:"fill all the fields"})
}
const validation=userSchema.safeParse({email,password,username});
if(!validation.success){
const errorMessage=validation.error.errors.map((err)=>err.message)
return res.status(400).json({errors:errorMessage} );
}

const user=await User.findOne({email});
if(user){
   return  res.status(400).json({message:"user already exists"});
}
const hashpassword= await bcrypt.hash(password,10);
const newuser = new User({email,password:hashpassword,username});
await newuser.save()
if(newuser){
 const token =  await  generateTokenAndSaveInCookies(newuser._id,res);
    res.status(201).json({message:"user registered sucessfully",newuser,token});
}

}catch(error){
    console.log(error);
    res.status(500).json({message:"Error regestiring user"});
}
};





export const login= async(req,res)=>{
    const {email,password}=req.body;
    try{
  if(!email || !password){
 return res.status(400).json({message:"invalid credentials"});
  }
  
  const user= await User.findOne({email}).select("+password")

  if(!user || !(await bcrypt.compare(password,user.password))){
   return  res.status(400).json({
     message:"Invalid email or password"   
    });
  }
  const token=  await  generateTokenAndSaveInCookies(user._id,res);
  res.status(200).json({message:"User logged in successfully",user,token});
}catch(error){
    console.log(error);
    res.status(500).json({message:"Error looging in  user"});
}

};
 export const logout= async(req,res)=>{
    try{
        res.clearCookie("jwt",{
            path:"/",
        });
        res.status(200).json({message:"User logged out succesfully"});

    }catch(error){
        console.log(error);
        res.status(500).json({message:"error in logging out user"})
    }

}



