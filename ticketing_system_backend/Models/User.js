const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Customer', 'Support Engineer'], 
    required: true
  },
  tickets: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket'
  }]
});


const User = mongoose.model('User', userSchema);

module.exports = User;
