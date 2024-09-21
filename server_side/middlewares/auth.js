import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Directly use the authHeader as the token
  const token = authHeader; 

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "Token required" });
  }


  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    
    req.user = user;  // Attach user object to request

    next();
  });
};
