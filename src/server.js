"use strict";
require('dotenv').config();

// 3rd Party Resources
const express = require('express');
const bcrypt = require('bcrypt');
const Users = require('./models/users.model');
const bearer = require('./middlewares/bearer');
const basic = require('./middlewares/basic');

// Prepare the express app
const app = express();

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

app.post('/signup', async (req, res) => {
  try {
    // hash the password within the req body
    req.body.password = await bcrypt.hash(req.body.password, 5);
    // create the new user Record 
    const record = await Users.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(403).send("Error occurred");
  }
});

app.get('/user', bearer, (req, res) => {
  res.json({
    'message': 'You are authorized to view the user profile',
    'user': req.user
  });
});

app.post('/signin', basic, async (req, res) => {
  res.status(200).json(req.user);
});


module.exports = app;