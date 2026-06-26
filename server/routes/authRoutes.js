// Import express to create a router
const express = require('express');
const router = express.Router();

// Import bcrypt to hash and compare passwords
const bcrypt = require('bcryptjs');

// Import jwt to create login tokens
const jwt = require('jsonwebtoken');

// Import our User model
const User = require('../models/User');

// POST /api/auth/signup
// Creates a new user account
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if a user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'An account with this email already exists' });
    }

    // Hash the password before saving - "10" is the salt rounds (security strength)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user with the hashed password (never the plain one)
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // Create a JWT token so the user is logged in immediately after signing up
    const token = jwt.sign(
      { userId: savedUser._id }, // data stored inside the token
      process.env.JWT_SECRET,    // secret key used to sign it
      { expiresIn: '7d' }        // token stays valid for 7 days
    );

    // Send back the token and basic user info (never send the password back!)
    res.status(201).json({
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
    });

  } catch (error) {
    res.status(500).json({ message: 'Signup failed', error: error.message });
  }
});

// POST /api/auth/login
// Logs an existing user in
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      // Use a generic message - don't reveal whether email exists (security best practice)
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the typed password against the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create a JWT token for this login session
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

module.exports = router;