const mongoose = require('mongoose');
const { Schema } = mongoose;

// schema model
const userSchema = new Schema({
  name: {
    type: String,
    required: false,  // name is optional
  },
  email: {
    type: String,
    trim: true,
    minlength: 3,
    required: true,  // email is required
  },
  photoURL: {
    type: String,
    required: false,  // photoURL is optional
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',  // default role is 'user'
    required: false,  // role is optional
  }
});

// create a model instance
const Users = mongoose.model('User', userSchema)
module.exports = Users;