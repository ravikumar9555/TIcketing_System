const mongoose = require('mongoose');


const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  severity: {
    type: String,
    required: true,
    enum: ['Low', 'Medium', 'High'], 
  },
  status: {
    type: String,
    required: true,
    enum: ['Open', 'On Hold', 'Resolved', 'Closed'],
    default: 'Open', // Default status is 'Open'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// Create a model from the schema
const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
