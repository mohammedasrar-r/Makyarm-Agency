const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    status: {
  type: String,
  enum: ['Pending', 'Completed'],
  default: 'Pending'
},
    date: { type: Date, default: Date.now }
  });
  
  const Submission = mongoose.model('Submission', submissionSchema);
  
  module.exports = Submission;