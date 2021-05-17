const express = require('express');
const { update } = require('../models/user');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Login
router.post('/login', async (req, res) => {
  let user;
  await User.findOne({username: req.body.username}, (err,obj) => {
    console.log(obj); 
    user = obj;
  });
  if (user == null) {
    return res.status(400).send('Cannot find user')
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.status(200).send('Success')
    } else {
      res.status(400).send('Incorrect Password')
    }
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
});

module.exports = router;