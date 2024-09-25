import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { signupSchema, loginSchema } from '../zodSchema/index.js';
import { Student, Admin } from '../models/index.js';
import dotenv from 'dotenv';
dotenv.config();


const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;



// Signup as Student or Admin
router.post("/signup", async (req, res) => {
  try {
    const validatedData = signupSchema.parse(req.body);
    const { name, email, password, role = 'student' } = validatedData;

    const userExists = role === 'student' 
      ? await Student.findOne({ email }) 
      : await Admin.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} already exists` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = role === 'student'
      ? new Student({ name, email, password: hashedPassword })
      : new Admin({ name, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully` });
  } catch (error) {
    res.status(400).json({ message: "Validation Error", error: error.errors });
  }
});

// Login as Student or Admin
router.post("/login", async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { email, password, role } = validatedData;

    const user = role === 'student'
      ? await Student.findOne({ email })
      : await Admin.findOne({ email });

    if (!user) return res.status(400).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} not found` });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} logged in successfully`,
      token,
      role, // Include the role in the response
     _id: user._id,
  });
  
  } catch (error) {
    console.error("Validation error details:", error.errors);
    res.status(400).json({ message: "Validation Error", error: error.errors });
  }
});

export default router;
