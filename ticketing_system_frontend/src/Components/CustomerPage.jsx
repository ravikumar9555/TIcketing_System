import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useParams } from 'react-router-dom';
import ViewTickets from './ViewTickets';
const CustomerPage = () => {
  const { email } = useParams();
  console.log(email)
  return (
    <div>
      <Navbar email={email}/>
      <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 ">
        
        <Sidebar email={email} />
        </div>
        <div className="col-md-10">
          <ViewTickets/>
          
        </div>
      </div>
    </div>
      
    </div>
  );
}

export default CustomerPage;