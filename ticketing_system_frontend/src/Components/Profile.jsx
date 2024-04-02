import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
const Profile = () => {
  const { email } = useParams();
  const username = email;
  console.log(username)
  const [user, setUser] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await fetch(`http://localhost:4000/ticket/getAll/${username}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data.tickets)
      
      } else {
        setError('Failed to fetch tickets');
      }
    } catch (error) {
      setError('Error fetching tickets');
      console.error('Error fetching tickets:', error);
    }
  };
const fetchUsers=async()=>{
  
    try {
      const response = await fetch(`http://localhost:4000/api/user/${username}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data.user.fullName)
        setUser(data.user);
      } else {
        setError('Failed to fetch Users');
      }
    } catch (error) {
      setError('Error fetching Users');
      console.error('Error fetching users:', error);
    }
  };

  if (error) {
    return (
      <div>Error: {error}</div>
    );
  }


  return (
    <section className="vh-100"  >
    <MDBContainer className="py-5 h-100">
      <MDBRow className="justify-content-center align-items-center h-100">
        <MDBCol lg="6" className="mb-4 mb-lg-0">
          <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
            <MDBRow className="g-0">
              <MDBCol md="4" className="gradient-custom text-center text-white"
                style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                  alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                <MDBTypography tag="h5">{user.fullName}</MDBTypography>
                <MDBCardText>{user.role}</MDBCardText>
                <MDBIcon far icon="edit mb-5" />
              </MDBCol>
              <MDBCol md="8">
                <MDBCardBody className="p-4">
                  <MDBTypography tag="h6">Profile Details</MDBTypography>
                  <hr className="mt-0 mb-4" />
                  <MDBRow className="pt-1">
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Email</MDBTypography>
                      <MDBCardText className="text-muted">{user.userName}</MDBCardText>
                    </MDBCol>
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Role</MDBTypography>
                      <MDBCardText className="text-muted">{user.role}</MDBCardText>
                    </MDBCol>
                  </MDBRow>

                  

                 
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </section>
  );
};

export default Profile;
