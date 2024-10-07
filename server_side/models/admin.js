import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'admin',  // Default role for admins/coordinators
  },
}, { timestamps: true });

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
