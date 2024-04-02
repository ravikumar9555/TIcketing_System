import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';

const SupportEdit = () => {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch(`http://localhost:4000/ticket/getUserById/${ticketId}`);
        if (response.ok) {
          const data = await response.json();
          setTicket(data.ticket);
        } else {
          console.error('Failed to fetch ticket details');
        }
      } catch (error) {
        console.error('Error fetching ticket details:', error);
      }
    };

    fetchTicket();
  }, [ticketId]);

  const handleSubmit =async () => {
    try {
        const response = await fetch(`http://localhost:4000/ticket/update/${ticketId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            status: status,
            message: message
          })
        });
    
        if (response.ok) {
         
          toast.success('Ticket updated successfully!');
        } else {
          console.error('Failed to update ticket:', response.statusText);
         
          toast.error('Failed to update ticket');
        }
      } catch (error) {
        console.error('Error updating ticket:', error);
       
        toast.error('Error updating ticket');
      }
  };

  if (!ticket) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MDBContainer fluid>
        <MDBRow className='justify-content-center align-items-center m-5'>
         
            <MDBCard className='supportForm' style={{borderRadius: '1rem', maxWidth: '600px'}}>
              <MDBCardBody className='px-4' >
                <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5 text-center">Edit Ticket</h3>
                <MDBInput wrapperClass='mb-4' label='Title' size='lg' value={ticket.title} disabled />
                <MDBInput wrapperClass='mb-4' label='Description' size='lg' value={ticket.description} disabled />
                <MDBRow>
  <MDBCol md='6'>
    <MDBInput
      wrapperClass='mb-4'
      label='Priority'
      size='lg'
      value={ticket.priority}
      disabled
    />
  </MDBCol>
  <MDBCol md='6'>
    <MDBInput
      wrapperClass='mb-4'
      label='Severity'
      size='lg'
      value={ticket.severity}
      disabled
    />
  </MDBCol>
</MDBRow>
               
                <select
                  className="form-select mb-4 text-black"
                  id="statusInput"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Change Status</option>
                  <option value="Open">Open</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
                <MDBInput
  wrapperClass='mb-4'
  label='Feedback Message'
  size='lg'
  type='textarea'
  
  value={message}
  onChange={(e) => setMessage(e.target.value)}
/>
                <MDBBtn className='mb-4 text-center' size='lg' onClick={handleSubmit}>Submit</MDBBtn>
                
              </MDBCardBody>
            </MDBCard>
         
        </MDBRow>
      </MDBContainer>
      <ToastContainer />
    </div>
  );
};

export default SupportEdit;
