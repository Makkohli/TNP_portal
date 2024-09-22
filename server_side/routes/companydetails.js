import express from 'express';
import Company from '../models/company.js';
import { authenticateToken } from '../middlewares/auth.js'; // Import your authentication middleware
import { verifyAdmin } from '../middlewares/authAdmin.js'; // Middleware for checking if the user is admin

const router = express.Router();

// Admin can create a company
router.post('/add', authenticateToken, verifyAdmin, async (req, res) => {
  const {
    name, department, status, location, jobRole, placeOfPosting, isRemote, batch, ctc,
    cgpa, category, backlogs, allowedBranches, registrationLastDate, coordinators, jobDescription
  } = req.body;

  try {
    const newCompany = new Company({
      name,
      department,
      status,
      location,
      jobRole,
      placeOfPosting,
      isRemote,
      batch,
      ctc,
      cgpa,
      category,
      backlogs,
      allowedBranches,
      registrationLastDate,
      coordinators,
      jobDescription,
      createdBy: req.user.id // Admin's user ID from the token
    });



    await newCompany.save();
    return res.status(201).json({ message: 'Company added successfully', company: newCompany });
  } catch (error) {
    return res.status(500).json({ message: 'Error adding company', error });
  }
});

// Students and Admins can view the list of companies
router.get('/list', authenticateToken, async (req, res) => {
  try {
    const companies = await Company.find().populate('createdBy', 'email'); // Optionally show admin's email
    return res.status(200).json(companies);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching companies', error });
  }
});

// Students and Admins can view a specific company
router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const company = await Company.findById(id).populate('createdBy', 'email');
    if (!company) return res.status(404).json({ message: 'Company not found' });

    return res.status(200).json(company);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching company details', error });
  }
});

export default router;
