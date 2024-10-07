import express from 'express';
import Student from '../models/student.js'; // Import Student model
import { authenticateToken } from '../middlewares/auth.js'; // Middleware for authenticating JWT

const router = express.Router();

// Route for editing student profile
router.put('/edit-profile/:id', authenticateToken, async (req, res) => {
  const { id } = req.params; // Get the student ID from the request parameters
  const updates = req.body; // New profile data from the request body

  try {
    // Find the student by ID and update the document
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        $set: updates // Update only the fields provided
      },
      {
        new: true, // Return the updated document
        runValidators: true // Ensure validation rules are followed during update
      }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    return res.status(200).json({ message: 'Profile updated successfully', student: updatedStudent });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating profile', error });
  }
});

export default router;
