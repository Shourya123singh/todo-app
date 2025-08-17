import React from "react";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import {Route, Routes } from "react-router-dom";
import PageNotFound from "./Components/PageNotFound";
import { Navigate } from "react-router-dom";

const App = () => {
 const token= localStorage.getItem("jwt")
  return (
   <div>
<Routes>
<Route path= "/" element={token?<Home/>:<Navigate to={"/login"}/>}/>
<Route path= "/login" element={<Login/>}/>
<Route path= "/signup" element={<Signup/>}/>
<Route path= "*" element={<PageNotFound/>}/>


</Routes>





  </div>
  );
};

export default App;
