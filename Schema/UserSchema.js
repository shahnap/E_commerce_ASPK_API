// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'active', // Can be 'active', 'inactive', etc.
  },
  sysTime: {
    type: Date,
    default: Date.now, // Automatically sets the current time
  },
});

module.exports = mongoose.model('User', UserSchema);
