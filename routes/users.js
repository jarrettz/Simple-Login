const express = require('express');
const { update } = require('../models/user');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

// Create a user
router.post('/users', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({ 
      username: req.body.username ,
      password: hashedPassword
    })
  
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

module.exports = router;