import React from "react";
import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

const navigateTo=useNavigate()

  const handleRegister= async(e)=>{
    e.preventDefault();
    try {
      const {data}=await axios.post("http://localhost:4014/user/signup",{username,email,password},{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      })
      console.log(data)
      alert(data.message ||"User Registered sucessfully");
      navigateTo("/login")
      setUsername("")
      setEmail("")
      setPassword("")
      
      
    } catch (error) {
      console.log(error)
      alert(error.response.data.message ||"User registration failed");
    }
  }


  return (
    <div>
      <div>
        <div flex h-screen items-center justify-center bg-gray-100>
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-5 text-center">Signup</h2>
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label  className="block mb-2 font-semibold "htmlFor=""a>Username</label>
                <input className="w-full p-3 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="username"/>
              </div>

              <div>
                <label className="block mb-2 font-semibold " htmlFor="">Email</label>
                <input className="w-full p-3 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="String " value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your Email"  />
              </div>

              <div>
                <label className="block mb-2 font-semibold " htmlFor="">Password</label>
                <input  className="w-full p-3 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"type="password " value={password} onChange={(e)=>setPassword(e.target.value)}placeholder="Set your password" />
              </div>
              <button  type="submit" className=" mt-2 w-full bg-blue-600 text-white hover:bg-blue-900 duration-300 rounded-xl font-semibold p-3">Signup</button>
              <p className="mt-4 text-center text-gray-600">Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
