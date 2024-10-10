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
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


app.use(cors({
  origin: ['http://localhost:3001', 'https://tnp-portal-backend.onrender.com/' ]  // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow credentials (cookies, headers, etc.)
}));

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
