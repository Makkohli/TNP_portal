import express from "express";
import jwt from "jsonwebtoken";
import { Student, Admin } from "../models/index.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Get token from headers
  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified; // Attach user info to the request
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// 📌 GET User Profile
router.get("/", verifyToken, async (req, res) => {
  try {
    const { id, role } = req.user; // Extract user ID and role from JWT

    // Fetch user from DB based on role
    const user = role === "student"
      ? await Student.findById(id).select("-password") // Exclude password
      : await Admin.findById(id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user); // Send user profile as response
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
