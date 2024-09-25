import express from 'express';
import Student from '../models/student.js'; 
import { authenticateToken } from '../middlewares/auth.js'; // Authentication middleware

const router = express.Router();

// Add Resume (Upload)
router.post('/add-resume', authenticateToken, async (req, res) => {
  const { resume } = req.body;

  // Validate the resume format
  if (!resume || !resume.startsWith('data:application/pdf;base64,')) {
    return res.status(400).json({ message: 'Invalid resume format. Only PDFs are allowed.' });
  }

  try {
    // Retrieve the student document using the authenticated user's ID
    const student = await Student.findById(req.user.id);

    // Check if the student exists
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check if the student already has 3 resumes
    if (student.resumes.length >= 3) {
      return res.status(400).json({ message: 'You can upload a maximum of 3 resumes.' });
    }

    // Add the new resume (base64 encoded string)
    student.resumes.push(resume);
    await student.save();

    // Respond with success and the updated list of resumes
    return res.status(200).json({
      message: 'Resume added successfully',
      resumes: student.resumes
    });
  } catch (error) {
    // Handle any server errors
    return res.status(500).json({ message: 'Error adding resume', error });
  }
});

export default router;
