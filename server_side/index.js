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
    'https://tnp-portal-lake.vercel.app',  // Add your production frontend URL
    'http://localhost:3001'  // Keep your local URL for development
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not ' +
                        'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
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

app.use("/api/v1", rootRouter); // Root router

// Start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
