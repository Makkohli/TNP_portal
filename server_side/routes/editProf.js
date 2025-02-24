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

    // Return updated student details
    return res.status(200).json({
      message: 'Profile updated successfully',
      student: {
        _id: updatedStudent._id,
        name: updatedStudent.name,
        email: updatedStudent.email,
        bloodGroup: updatedStudent.bloodGroup,
        class10Percentage: updatedStudent.class10Percentage,
        class12Percentage: updatedStudent.class12Percentage,
        dateOfBirth: updatedStudent.dateOfBirth,
        gender: updatedStudent.gender,
        batch: updatedStudent.batch,
        degree: updatedStudent.degree,
        graduationGPA: updatedStudent.graduationGPA,
        category: updatedStudent.category,
        collegeEmail: updatedStudent.collegeEmail,
        personalEmail: updatedStudent.personalEmail,
        rollNumber: updatedStudent.rollNumber,
        branch: updatedStudent.branch,
        contactNumber: updatedStudent.contactNumber,
        alternateContactNumber: updatedStudent.alternateContactNumber,
        currentAddress: updatedStudent.currentAddress,
        permanentAddress: updatedStudent.permanentAddress,
        aadhaar: updatedStudent.aadhaar,
        panCard: updatedStudent.panCard,
        resumes: updatedStudent.resumes,
        semester1GPA: updatedStudent.semester1GPA,
        semester2GPA: updatedStudent.semester2GPA,
        semester3GPA: updatedStudent.semester3GPA,
        semester4GPA: updatedStudent.semester4GPA,
        semester5GPA: updatedStudent.semester5GPA,
        semester6GPA: updatedStudent.semester6GPA,
        semester7GPA: updatedStudent.semester7GPA,
        semester8GPA: updatedStudent.semester8GPA,
        finalCGPA: updatedStudent.finalCGPA,
        cgpaBeforeDrop: updatedStudent.cgpaBeforeDrop,
        graduationCGPA: updatedStudent.graduationCGPA,
        backlogs: updatedStudent.backlogs,
        bans: updatedStudent.bans,
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating profile', error });
  }
});

export default router;
