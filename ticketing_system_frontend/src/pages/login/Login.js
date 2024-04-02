import React, { useState } from 'react';
import "./login.css"
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,

}
from 'mdb-react-ui-kit';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { userName, role } = data.user; 
        console.log(`Logged in as ${userName} with role ${role}`);

      
        if (role === 'Customer') {
          navigate(`/customer/${email}`); 
        } else if (role === 'Support Engineer') {
          navigate(`/support/${email}`); 
        } else {
          console.error('Unknown role:', role);
        }
      } else {
        console.error('Login failed');
        toast.error('Please check your credentials.', {
          
          autoClose: 2000 
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }

  };

  return (
    <div>
      <ToastContainer />
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='10' md='5'>
          <img src="login (2).png" className="img-fluid" alt="Login Image" />
        </MDBCol>
        <MDBCol col='12'>
          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className="fw-bold mb-2 text-uppercase ">Login</h2>
              <p className="text-white-50 mb-5">Please enter your login details!</p>
              <form onSubmit={handleSubmit} >
                <MDBInput 
                  wrapperClass='mb-2 mx-2 w-100' 
                  labelClass='text-white' 
                  label='UserName' 
                  id='formControlLg' 
                  type='email' 
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                />
                <MDBInput 
                  wrapperClass='mb-4 mx-2 w-100' 
                  labelClass='text-white' 
                  label='Password' 
                  id='formControlLg' 
                  type='password' 
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <div className="text-center">
                <MDBBtn type="submit" className='mb-3' size='lg'>Login</MDBBtn></div>
              </form>
              <div>
                <p className="mb-0">Don't have an account? <Link to="/Signup" className="text-white-50 fw-bold">Sign Up</Link></p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </div>
  );
}

export default Login;
