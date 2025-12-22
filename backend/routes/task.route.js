import express from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { createTask, getAllTasks, getTaskById, deleteTask, updateTask } from "../controller/task.controller.js";
import Task from "../model/task.model.js";
const router = express.Router();

router.post("/", authenticateToken, createTask);
router.get("/", authenticateToken, getAllTasks);
router.get("/:id", authenticateToken, getTaskById);
router.delete("/:id", authenticateToken, deleteTask);
router.put("/:id", authenticateToken, updateTask);


export default router;