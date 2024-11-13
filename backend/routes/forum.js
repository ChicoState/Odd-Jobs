// routes/forum.js
const express = require('express');
const router = express.Router();
const ForumPost = require('../models/ForumPost'); // ForumPost schema needed

// POST a forum post
router.post('/', async (req, res) => {
  const post = new ForumPost({
    content: req.body.content,
    author: req.body.author,
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
