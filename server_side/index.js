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
app.use(cors({ origin: '*' }));

// MongoDB connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection error:", error);
  }
}
app.options('*', cors());  

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
