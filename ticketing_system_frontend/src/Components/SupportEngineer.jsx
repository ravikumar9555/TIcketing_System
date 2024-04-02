import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdb-react-ui-kit';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

const SupportEngineer = () => {
  const { email } = useParams();
  
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchTickets = async () => {
    try {
      const response = await fetch(`http://localhost:4000/ticket/all`);
      if (response.ok) {
        const data = await response.json();
        setTickets(data.tickets);
      } else {
        console.error('Failed to fetch tickets');
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    setModalOpen(true);
  };

  const handleRowClick = (ticket) => {
    
    window.location.href = `/support/edit/${ticket._id}`;
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Navbar email={email}/>
      <MDBContainer fluid>
        <MDBRow className='justify-content-center align-items-center m-5'>
          <MDBCol md='8'>
            <MDBCard className="my-5 mx-auto" style={{ borderRadius: '1rem' }}>
              <MDBCardBody className='px-4'>
                <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5 text-center">Support Engineer - Raise Tickets</h3>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th></th>
                    <th>Username</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Priority</th>
                      <th>Severity</th>
                     
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((ticket, index) => (
                      <tr key={index} onClick={() => handleRowClick(ticket)}>
                         <span style={{ marginRight: '0.5rem' }}>  <FaEdit/></span>
                         <td>{ticket.user.fullName}</td>
                        <td>{ticket.title}</td>
                        <td>{ticket.description}</td>
                        <td>{ticket.priority}</td>
                        <td>{ticket.severity}</td>
                       
                        <td>{ticket.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <MDBModal show={modalOpen} tabIndex='-1'>
        <MDBModalHeader>{selectedTicket ? selectedTicket.title : ''}</MDBModalHeader>
        <MDBModalBody>
          {selectedTicket && (
            <div>
              <p>Description: {selectedTicket.description}</p>
              <p>Priority: {selectedTicket.priority}</p>
              <p>Severity: {selectedTicket.severity}</p>
              <p>Username: {selectedTicket.user.userName}</p>
              
            </div>
          )}
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color='secondary' onClick={closeModal}>Close</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </div>
  );
}

export default SupportEngineer;
