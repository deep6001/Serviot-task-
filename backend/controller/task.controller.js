import Task from "../model/task.model.js";
import User from "../model/user.model.js";
import { CreateTask } from "../validation/task.validation.js";


export const createTask = async (req,res)=>{
    try {
        const { title, description } = req.body;
        const { error } = CreateTask.validate({ title, description, userId: req.user._id });
        const task = new Task({ title, description, userId: req.user.id });
        await task.save();
        res.status(201).json({ message: "Task created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

 export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    const user = await User.findById(req.user.id);
    
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask= async (req, res) => {
    
  const Task_id = req.params.id;
  if(!Task_id){
    return res.status(400).json({ message: "Task id is required" });
  }
  try {
    const task = await Task.findByIdAndDelete(Task_id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
}

export const updateTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $set: req.body },      // only changed fields
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

