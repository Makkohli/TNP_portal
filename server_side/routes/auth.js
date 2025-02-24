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
        name: user.name,
        email: user.email,
        bloodGroup: user.bloodGroup,
        class10Percentage: user.class10Percentage,
        class12Percentage: user.class12Percentage,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        batch: user.batch,
        degree: user.degree,
        graduationGPA: user.graduationGPA,
        category: user.category,
        collegeEmail: user.collegeEmail,
        personalEmail: user.personalEmail,
        rollNumber: user.rollNumber,
        branch: user.branch,
        contactNumber: user.contactNumber,
        alternateContactNumber: user.alternateContactNumber,
        currentAddress: user.currentAddress,
        permanentAddress: user.permanentAddress,
        aadhaar: user.aadhaar,
        panCard: user.panCard,
        resumes: user.resumes, // Ensure resumes is part of the schema (use array or object as per your model)
        semester1GPA: user.semester1GPA,
        semester2GPA: user.semester2GPA,
        semester3GPA: user.semester3GPA,
        semester4GPA: user.semester4GPA,
        semester5GPA: user.semester5GPA,
        semester6GPA: user.semester6GPA,
        semester7GPA: user.semester7GPA,
        semester8GPA: user.semester8GPA,
        finalCGPA: user.finalCGPA,
        cgpaBeforeDrop: user.cgpaBeforeDrop,
        graduationCGPA: user.graduationCGPA,
        backlogs: user.backlogs,
        bans: user.bans,
  });
  
  } catch (error) {
    console.error("Validation error details:", error.errors);
    res.status(400).json({ message: "Validation Error", error: error.errors });
  }
});

export default router;
