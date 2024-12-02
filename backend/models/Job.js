const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  pay: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
  },
  picked: {
    type: Boolean,
    default: false
  },
  completed: {
    type: Boolean,
    default: false
  },
  datePosted: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Job', jobSchema);
