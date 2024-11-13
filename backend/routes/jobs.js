// routes/jobs.js
const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// GET all jobs (AcceptedJobs)
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new job (PostJobPage)
router.post('/', async (req, res) => {
  const job = new Job({
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    pay: req.body.pay,
    duration: req.body.duration,
    photos: req.body.photos,
  });

  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
