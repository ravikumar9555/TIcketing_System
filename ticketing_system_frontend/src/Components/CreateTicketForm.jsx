import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBRadio } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateTicketForm = () => {
  const { email } = useParams();
  const username=email

  console.log(email)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [severity, setSeverity] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const data = {
   
      title: title,
      description: description,
      priority: priority,
      severity: severity
    };

    try {
      const response = await fetch(`http://localhost:4000/ticket/create/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        console.log('Ticket created successfully');
        toast.success('Ticket Created successfully!');
        setTitle('');
        setDescription('');
        setPriority('');
        setSeverity('');
      } else {
        console.error('Failed to create ticket');
        toast.error('Please check your credentials.', {
          
          autoClose: 2000 
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred'); 
    }
  };

  return (
    <div>
        <ToastContainer />
    <MDBContainer fluid className=''>
      <Navbar/>
      
      <MDBRow className='justify-content-center align-items-center m-5'>
        <MDBCol md='6' className='colCard'>
          
          <MDBCard className="registerCard my-5 mx-auto" style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='px-4'>
            <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5 text-center">Create Tickets</h3>
             
              <form onSubmit={handleSubmit}>
                <MDBInput
                  wrapperClass='mb-4 text-black'
                  label='Title '
                  placeholder='Title'
                  color='white'
                  size='lg'
                  id='titleInput'
                  type='text'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)} 
                />
                <MDBInput
                  wrapperClass='mb-4 text-black'
                  label='Description'
                  placeholder='Description'
                  size='lg'
                  id='descriptionInput'
                  type='text'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)} 
                />
      <select
  className="form-select mb-4 text-black"
  id="priorityInput"
  value={priority}
  onChange={(e) => setPriority(e.target.value)} 
>
  <option value="">Select Priority</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
</select>

<select
  className="form-select mb-4 text-black"
  id="severityInput"
  value={severity}
  onChange={(e) => setSeverity(e.target.value)} 
>
  <option value="">Select Severity</option>
  <option value="High">High</option>
  <option value="Low">Low</option>
</select>
                <div className="text-center">
                  <MDBBtn type="submit" rounded color='secondary'>Submit</MDBBtn>
                </div>
                
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </div>
  );
}

export default CreateTicketForm;
