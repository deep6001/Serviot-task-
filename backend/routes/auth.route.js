import express from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { login, register, userProfile } from "../controller/auth.controller.js";
import User from "../model/user.model.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get('/profile',authenticateToken,userProfile )

export default router;