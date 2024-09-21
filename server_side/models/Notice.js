import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin', // Assuming Admin model refers to admin users
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const Notice = mongoose.model('Notice', noticeSchema);
export default Notice;
