import express from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { login, Logout, register, userProfile } from "../controller/auth.controller.js";
import User from "../model/user.model.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get('/profile',authenticateToken,userProfile )
router.post('/logout',authenticateToken,Logout)

export default router;