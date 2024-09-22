import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  status: { type: String, default: 'Pending' }, // e.g., Pending, Active
  location: { type: String, required: true },
  jobRole: { type: String, required: true },
  placeOfPosting: { type: String, default: 'Remote' },
  isRemote: { type: Boolean, default: false },
  batch: { type: Number, required: true },
  ctc: { type: String, required: true }, // CTC or Stipend information
  cgpa: { type: Number, required: true }, // Minimum CGPA required
  category: { type: String, required: true }, // e.g., TECH, NON-TECH
  backlogs: { type: Number, required: true },
  allowedBranches: { type: [String], required: true }, // Array of allowed branches
  registrationLastDate: { type: Date, required: true },
  coordinators: { type: [{ name: String }], required: true }, // Coordinators’ details
  jobDescription: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true }, // Admin's user ID
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);
export default Company;
