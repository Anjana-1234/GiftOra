// Import mongoose to define our schema
const mongoose = require('mongoose');

// Define what one user document looks like in MongoDB
const userSchema = new mongoose.Schema({

  // User's full name
  name: {
    type: String,
    required: true,
  },

  // Email - must be unique so two accounts can't share one email
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // always store emails in lowercase to avoid duplicates like Test@x.com vs test@x.com
  },

  // Hashed password - we NEVER store the plain text password
  password: {
    type: String,
    required: true,
  },

}, {
  // Adds createdAt and updatedAt automatically
  timestamps: true,
});

// Create and export the User model
// Mongoose will create a "users" collection in MongoDB
module.exports = mongoose.model('User', userSchema);