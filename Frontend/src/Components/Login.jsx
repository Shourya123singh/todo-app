import React from "react";
import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";


const Login = () => {
  
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

const navigateTo=useNavigate();

  const handleRegister= async(e)=>{
    e.preventDefault();
    try {
      const {data}=await axios.post("http://localhost:4014/user/login",{email,password},{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        },
      })
      console.log(data)
      alert(data.message ||"User logged in sucessfully");
      
      localStorage.setItem("jwt",data.token);
      navigateTo("/");
      
      setEmail("");
      setPassword("");
      
      
    } catch (error) {
      console.log(error)
      alert(error.response.data.message ||"User logging in  failed");
    }
  }


  return (
    <div>
      <div>
        <div flex h-screen items-center justify-center bg-gray-100>
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-5 text-center">Login</h2>
            <form onSubmit={handleRegister}>
             

              <div>
                <label className="block mb-2 font-semibold " htmlFor="">Email</label>
                <input className="w-full p-3 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="String " value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your Email"  />
              </div>

              <div>
                <label className="block mb-2 font-semibold " htmlFor="">Password</label>
                <input  className="w-full p-3 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"type="password " value={password} onChange={(e)=>setPassword(e.target.value)}placeholder="Set your password" />
              </div>
              <button  type="submit" className=" mt-2 w-full bg-blue-600 text-white hover:bg-blue-900 duration-300 rounded-xl font-semibold p-3">Login</button>
              <p className="mt-4 text-center text-gray-600">NewUser? <Link to="/signup" className="text-blue-600 hover:underline">Signup</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}





export default Login;
