import express from 'express';
import Student from '../models/student.js'; 
import { authenticateToken } from '../middlewares/auth.js'; // Authentication middleware

const router = express.Router();

// Remove Resume
router.delete('/remove-resume', authenticateToken, async (req, res) => {
  const { index } = req.body; // Index of the resume to be removed

  try {
    // Retrieve the student document using the authenticated user's ID
    const student = await Student.findById(req.user.id);

    // Check if the student exists
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Validate the resume index
    if (index < 0 || index >= student.resumes.length) {
      return res.status(400).json({ message: 'Invalid resume index.' });
    }

    // Remove the resume at the specified index
    student.resumes.splice(index, 1);

    // Save the updated student document
    await student.save();

    // Respond with success and the updated list of resumes
    return res.status(200).json({
      message: 'Resume removed successfully',
      resumes: student.resumes
    });
  } catch (error) {
    // Handle any server errors
    return res.status(500).json({ message: 'Error removing resume', error });
  }
});

export default router;
