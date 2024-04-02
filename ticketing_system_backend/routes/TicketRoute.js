const express = require('express');
const { createTicket, getAllTickets, getUserBasedTickets, getTicketById, updateTicket } = require('../Controller/TicketController');
const router = express.Router();


router.post("/create/:username",createTicket)
router.get("/getAll/:username",getUserBasedTickets)
router.get("/all",getAllTickets)
router.get("/getUserById/:ticketId",getTicketById)
router.put('/update/:ticketId', updateTicket);
module.exports = router;