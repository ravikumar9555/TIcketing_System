import React from 'react'
import  { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';
const OpenTicket = () => {
    const { email } = useParams();
    const username = email;
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetchTickets();
    }, []);
  
    const fetchTickets = async () => {
      try {
        const response = await fetch(`http://localhost:4000/ticket/getAll/${username}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data.tickets[0].status)
          setTickets(data.tickets);
        } else {
          setError('Failed to fetch tickets');
        }
      } catch (error) {
        setError('Error fetching tickets');
        console.error('Error fetching tickets:', error);
      }
    };
  
    if (error) {
      return (
        <div>Error: {error}</div>
      );
    }
  
    return (
      <MDBContainer fluid>
        
        
        <MDBRow className='justify-content-center align-items-center m-5'>
          <MDBCol md='8'>
            <MDBCard className="my-5 mx-auto" style={{ borderRadius: '1rem' }}>
              <MDBCardBody className='px-4'>
                <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5 text-center">Open Tickets</h3>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Severity</th>
                        <th>Created At</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
  {tickets.filter(ticket => ticket.status === 'Open').map((ticket, index) => (
    <tr key={index}>
      <td>{ticket.title}</td>
      <td>{ticket.description}</td>
      <td>{ticket.priority}</td>
      <td className={ticket.severity === 'High' ? 'high-severity' : 'low-severity'}>
        {ticket.severity}
      </td>
      <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
      <td>{ticket.status}</td>
    </tr>
  ))}
</tbody>
                  </table>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
}

export default OpenTicket
