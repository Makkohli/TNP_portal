import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    default: 'student',  // Default role for admins/coordinators
  },
  // New personal details
  bloodGroup: { type: String },
  class10Percentage: { type: Number },
  class12Percentage: { type: Number },
  dateOfBirth: { type: Date },
  gender: { type: String },
  batch: { type: Number },
  degree: { type: String },
  graduationGPA: { type: Number },
  category: { type: String },
  collegeEmail: { type: String },
  personalEmail: { type: String },
  rollNumber: { type: String },
  branch: { type: String },
  contactNumber: { type: String },
  alternateContactNumber: { type: String },
  currentAddress: { type: String },
  permanentAddress: { type: String },
  aadhaar: { type: String },
  panCard: { type: String },
  resume: { type: String }, // Store resume file name or URL
  // Academic details
  semester1GPA: { type: Number },
  semester2GPA: { type: Number },
  semester3GPA: { type: Number },
  semester4GPA: { type: Number },
  semester5GPA: { type: Number },
  semester6GPA: { type: Number },
  semester7GPA: { type: Number },
  semester8GPA: { type: Number },
  finalCGPA: { type: Number },
  cgpaBeforeDrop: { type: Number },
  graduationCGPA: { type: Number },
  backlogs: { type: Number },
  bans: { type: Number }
}, { timestamps: true }); // This will automatically add createdAt and updatedAt fields

const Student = mongoose.model('Student', studentSchema);

export default Student;
