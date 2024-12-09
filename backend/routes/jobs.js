// routes/jobs.js
const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// GET all jobs (AcceptedJobs)
router.get('/', async (req, res) => {
  try {
    const { date, minPay, maxPay, distance, time } = req.query;
    const query = {};
    if (date) {
      query.datePosted = { $gte: new Date(date) };
    }
    if (minPay || maxPay) {
      query.pay = {};
      if (minPay) query.pay.$gte = Number(minPay);
      if (maxPay) query.pay.$lte = Number(maxPay);
    }
    if (time) {
      query.duration = { $lte: Number(time) };
    }
    const jobs = await Job.find(query);
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST a new job (PostJobPage)
router.post('/', async (req, res) => {
  const job = new Job({
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    pay: Number(req.body.pay),
    duration: Number(req.body.duration),
    photos: req.body.photos,
  });

  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/:id/pick', async (req, res) => {
  try {
    const { userId } = req.body;
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (job.picked) {
      return res.status(400).json({ error: 'Job is already picked' });
    }
    job.picked = true;
    await job.save();
    res.json({ message: 'Job picked successfully', job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
