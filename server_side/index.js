import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import rootRouter from "./routes/index.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Update CORS configuration to allow specific origins
const allowedOrigins = [
  'http://localhost:3001', // Your local environment
  'https://tnp-portal-lake.vercel.app', // Your Vercel deployment
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests from the specified origins
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, origin);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));
app.options('*', cors());  // Handle preflight requests for all routes

// MongoDB connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection error:", error);
  }
}

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/v1", rootRouter); // Root router

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
