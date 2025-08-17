
import React  from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const Home = () => {
  const  [todos,setTodos]=useState([]);
   const [error,setError]=useState(null);
  const  [loading,setLoading]=useState(false);
  const navigateTo=useNavigate();
const[newTodo,setNewTodo]=useState("");
  useEffect(()=>{
const fetchtodos=async()=>{
  try{
    setLoading(true)
    const response=await axios.get("http://localhost:4014/todo/fetch",{
      withCredentials:true,
      headers:{
        "Content-Type":"application/json",
      },
     
    });
    console.log(response.data.todos)
    setTodos(response.data.todos)
    setError(null);
  }catch(error){
    setError("failed to fetch todo")
  }finally{
    setLoading(false)
  }
}

fetchtodos();


  },[]);


  const todoCreate= async()=>{
    if(!newTodo)return;
    try {
      const response=await axios.post("http://localhost:4014/todo/create",{
        "text":newTodo,
        "completed":false
      },{
        withCredentials:true
      })
      console.log(response.data.newTodo);
      setTodos([...todos,response.data.newTodo])
      setNewTodo("");
      
      
    } catch (error) {
      setError("failed to create todo")
    }
  
  };


  const todoStatus=async (id)=>{
const  todo=todos.find((t)=>t._id===id)
try{
 const response=await axios.put(`http://localhost:4014/todo/update/${id}`,{
...todo,
completed:!todo.completed
 },{
  withCredentials:true
 });
 console.log(response.data);
 setTodos(todos.map((t)=>(t._id===id?response.data.todo:t)))

}catch(error){
setError("Failed to resolve error")
}
  }
  const logout=async()=>{
try{
await axios.get("http://localhost:4014/user/logout")
alert("user got logout sucessfully");
navigateTo("/login");

localStorage.removeItem("jwt");

}
catch(error){
alert("logout failed");
}
  }
  


  const TodoDelete =  async (id)=>{
    try {
       await axios.delete(`http://localhost:4014/todo/delete/${id}`,{
        withCredentials:true
       })
       setTodos(todos.filter((t)=>t._id!==id))
    } catch (error) {
      setError("failed to delete todo");
    }

  }

const remainingTodos=todos.filter((todo)=>!todo.completed).length;





  
  return  (

    <div className=" my-10 bg-gray-100 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6">
<h1 className="text-2xl font-semibold text-center">Todo App</h1>
<div className=" flex mb-4">
  <input type="text" placeholder="Add a new Todo" value={newTodo} onChange={(e)=>setNewTodo(e.target.value)} onKeyPress={(e)=>e.key==="Enter " && todoCreate()}className="flex-grow p-2 border rounded-l-md focus:outline-none" />
  <button onClick={todoCreate} className="bg-blue-600 rounded-r-md text-white px-4 py-2 hover:bg-blue-900 duration-300">Add</button>
</div>
{loading?(<div className="text-center justify-center"><span className="text-center justify-center">Loading...</span></div>):error?(<div>{error}</div>):(
  <ul className="space-y-2">

  </ul>
)}
<ul className="space-y-2">


{todos.map((todo,index)=>(
  <li key={todo._id || index  } className="flex items-center justify-between p-3 bg-gray-100 rounded-md"> 
<div className="flex items-center">
<input type="checkbox" checked={todo.completed} onChange={()=>todoStatus(todo._id)} className="mr-2"/>
<span className={`${todo.completed ?"line-through text-gray-500 font font-semibold":""} ` }>{todo.text}</span>

</div>
<button onClick={()=>TodoDelete(todo._id)} className="text-red-500 hover:text-red-800 duration-300">Delete</button>

</li>


))}




</ul>
<p className="mt-4 text-center text-sm text-gray-700">{remainingTodos} Todos remaining</p>
<button  onClick={()=>logout()} className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800 duration-500 mx-auto block">Logout</button>

    </div>
  )
  
}




export default Home;
