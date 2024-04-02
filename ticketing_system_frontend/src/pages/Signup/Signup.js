import React, { useState } from 'react';

import { Link} from 'react-router-dom';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBRadio,MDBSelect } from 'mdb-react-ui-kit';
import "./signup.css";
import { toast } from 'react-toastify';
const Signup = () => {
 
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); 


  const handleSubmit = async(e) => {
    e.preventDefault();
    
    console.log("Full Name:", fullName);
    console.log("User Name:", userName);
    console.log("Password:", password);
    console.log("Role:", role);
    try {
      const response = await fetch('http://localhost:4000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          userName,
          password,
          role,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      
      setFullName('');
      setUserName('');
      setPassword('');
      setRole('');

      console.log('User created successfully');
      toast.success('User Created successfully!');
    } catch (error) {
      console.error('Error creating user:', error.message);
      toast.error('Check your credentails!');
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='justify-content-center align-items-center m-5'>
        <MDBCol md='6'>
          <MDBCard className="registerCard my-5 mx-auto" style={{ borderRadius: '1rem', maxWidth: '400px',backgroundColor:'black' }}>
            <MDBCardBody className='px-4'>

              <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5 text-white justify-content-center align-items-center text-center">SIGNUP</h3>

              <form onSubmit={handleSubmit}>
                <MDBInput 
                  wrapperClass='mb-4 text-white' 
                  label='Full Name' 
                  color='white' 
                  size='lg' 
                  id='form1' 
                  type='text'
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)} 
                />
                <MDBInput 
                  wrapperClass='mb-4 text-white' 
                  label='UserName' 
                  size='lg' 
                  id='form1' 
                  type='text'
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)} 
                />
                <MDBInput 
                  wrapperClass='mb-4 text-white' 
                  label='Password' 
                  size='lg' 
                  id='form1' 
                  type='text'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <MDBCol md='6' className='mb-4 text-white'>
                  <h6 className="fw-bold text-white">Role: </h6>
                  <MDBRadio 
                    name='role' 
                    id='inlineRadio1' 
                    value='Customer' 
                    label='Customer' 
                    inline 
                    onChange={() => setRole('Customer')} 
                  />
                  <MDBRadio 
                    name='role' 
                    id='inlineRadio2' 
                    value='Support Engineer' 
                    label='Support Engineer' 
                    inline 
                    onChange={() => setRole('Support Engineer')} 
                  />
                </MDBCol>
                <p className="mb-0 text-white">Back to<Link to="/" className="text-white-50 fw-bold"> Login Page</Link></p>
                {/* <MDBSelect 
                  className='mb-4' 
                  label='Role' 
                  options={[
                    { text: 'Customer', value: 'Customer' },
                    { text: 'Support Engineer', value: 'Support Engineer' }
                  ]}
                  value={role}
                  getValue={(value) => setRole(value)}
                /> */}


<div className="text-center"> 
                  <MDBBtn type="submit" rounded color='secondary'>Submit</MDBBtn>
                </div>
              </form>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md='4'>
          <img src="signup.png" className="img-fluid" alt="Login Image" />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Signup;
