import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import rootRouter from "./routes/index.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

// MongoDB connection
async function connectDB() {
    try {
        await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("DB connected");
    } catch (error) {
        console.error("DB connection error:", error);
    }
}

// CORS configuration
const allowedOrigins = [
    'https://tnp-portal-lake.vercel.app',  // Frontend URL
    'http://localhost:3001'  // Local development URL
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,  // Allow credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 200,  // For legacy browser support
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.options('*', cors());  // Handle preflight requests for all routes

app.use("/api/v1", rootRouter); // Root router

// Start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
