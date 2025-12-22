import { hashPassword } from "../helper/auth.helper.js";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import { loginSchema, registerSchema } from "../validation/auth.validation.js";
import bcrypt from "bcrypt";
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    const { error } = registerSchema.validate({ name, email, password });
    
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
     const { email, password } = req.body;

     const{error} = loginSchema.validate({email,password});
     if(error){
         return res.status(400).json({message:error.details[0].message});
     }
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "Invalid email or password" });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid) {
                return res.status(400).json({ message: "Invalid email or password" });
            }
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.cookie('token', token, { 
                httpOnly: true ,
                maxAge: 24 * 60 * 60 * 1000,
                sameSite: 'none',
                secure: true
            });
            res.status(200).json({ token, message: "Login successful" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
}

export const userProfile = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        loggedIn: false,
        message: "User not authenticated",
      });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        loggedIn: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      loggedIn: true,
      message: "User fetched successfully",
      user,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      loggedIn: false,
      message: error.message,
    });
  }
};

export const Logout = (req,res)=>{
    res.clearCookie('token');
    res.status(200).json({message:"Logout successful"});
}
