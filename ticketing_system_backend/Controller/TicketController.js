const Ticket = require("../Models/Ticket");
const User = require("../Models/User");

const createTicket = async (req, res) => {
  try {
 
  
    const { title, description, priority, severity} = req.body;

   
   

  
    const userName = req.params.username;
    console.log(userName)
   
    const user = await User.findOne({ userName });
    console.log(user)


    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

   
    const newTicket = new Ticket({
      title,
      description,
      priority,
      severity,
      user: user._id 
    });

   
    const savedTicket = await newTicket.save();

   
    res.status(201).json({
      success: true,
      message: 'Ticket created successfully',
      ticket: savedTicket
    });
  } catch (error) {
   
    console.error('Error creating ticket:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create ticket',
      error: error.message
    });
  }
};

const getAllTickets = async (req, res) => {
  try {
    // Fetch all tickets and populate the 'user' field with the username
    const tickets = await Ticket.find().populate('user');
    
    // Return the tickets
    res.status(200).json({ success: true, tickets });
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch tickets', error: error.message });
  }
};

const getUserBasedTickets = async (req, res) => {
    try {
        const userName = req.params.username;
        console.log(userName)
       
        const user = await User.findOne({ userName });
        console.log(user)

  
      // If user not found, return 404 status
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      // Fetch tickets associated with the user
      const tickets = await Ticket.find({ user: user._id });
      console.log(tickets,"null")
      
  
      // Return success response with tickets
      return res.status(200).json({ success: true, tickets });
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
      return res.status(500).json({ success: false, message: 'Failed to fetch user-based tickets', error: error.message });
    }
  };

  const getTicketById = async (req, res) => {
    try {
      const ticketId = req.params.ticketId; // Assuming ticketId is provided as a string
      console.log(ticketId);
  
      const ticket = await Ticket.findById(ticketId);
      console.log(ticket);
  
      if (!ticket) {
        return res.status(404).json({ success: false, message: 'Ticket not found' });
      }
  
      res.status(200).json({ success: true, ticket });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch ticket', error: error.message });
    }
  };

  const updateTicket = async (req, res) => {
    const { ticketId } = req.params;
    const updatedData = req.body; // Data to update the ticket
  
    try {
      const ticket = await Ticket.findByIdAndUpdate(ticketId, updatedData, { new: true });
  
      if (!ticket) {
        return res.status(404).json({ success: false, message: 'Ticket not found' });
      }
  
      res.status(200).json({ success: true, ticket });
    } catch (error) {
      console.error('Error updating ticket:', error);
      res.status(500).json({ success: false, message: 'Failed to update ticket', error: error.message });
    }
  };
  
module.exports = {
  createTicket,
  getAllTickets,
  getUserBasedTickets,
  getTicketById,
  updateTicket
};
