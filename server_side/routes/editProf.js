import express from 'express';
import Student from '../models/Student.js'; // Import your Student model
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

// Update student profile
router.put('/students/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true // Run validators on update
    });

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: 'Error updating student profile', error });
  }
});

export default router;
