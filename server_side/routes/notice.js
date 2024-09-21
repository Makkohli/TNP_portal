import express from 'express';
import Notice from '../models/Notice.js';
import { authenticateToken } from '../middlewares/auth.js';
import { verifyAdmin } from '../middlewares/authAdmin.js';
import { noticeSchema } from '../zodSchema/noticeSchema.js'; // Import the notice schema

const router = express.Router();

// Admin can create a notice/event
router.post('/create', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    // Validate incoming data using Zod
    const validatedData = noticeSchema.parse(req.body);
    const { title, description } = validatedData;

    // Ensure req.user exists
    if (!req.user || !req.user.id) {
      return res.status(403).json({ message: "User not authorized" });
    }

    const newNotice = new Notice({
      title,
      description,
      createdBy: req.user.id // Correctly assign the user's ID to createdBy
    });

    await newNotice.save();
    return res.status(201).json({ message: 'Notice created successfully', notice: newNotice });
  } catch (error) {
    console.error("Validation error details:", error.errors);
    return res.status(400).json({ message: 'Error creating notice', error: error.errors });
  }
});

// Students and Admins can view the list of notices/events
router.get('/list', authenticateToken, async (req, res) => {
  try {
    const notices = await Notice.find().populate('createdBy', 'email');
    return res.status(200).json(notices);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching notices', error });
  }
});

export default router;
