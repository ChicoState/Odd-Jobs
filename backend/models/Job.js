const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
  datePosted: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Job', jobSchema);
