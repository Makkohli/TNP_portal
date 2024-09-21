import express from 'express';
import authRouter from './auth.js';
import noticeRouter from './notice.js'; // New route for notices

const router = express.Router({ mergeParams: true });

router.get("/", (req, res) => {
  res.send("API is working");
});

router.use("/auth", authRouter);

router.use("/notices", noticeRouter); // Add notice routes

export default router;
