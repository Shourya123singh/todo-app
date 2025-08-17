import express from "express";
import {createTodo,deleteTodo,getTodos,updatetodos} from "../controller/todo.controller.js";
import { authenticate } from "../middleware/authorise.js";
const router=express.Router();
router.post("/create",authenticate,createTodo);
router.get("/fetch",authenticate,getTodos);
router.put("/update/:id",authenticate,updatetodos);
router.delete("/delete/:id",authenticate,deleteTodo);








export default router;