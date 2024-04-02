import React from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';
import { NavLink } from 'react-router-dom';
import { FaEdit, FaLongArrowAltDown, FaPortrait, FaTicketAlt } from 'react-icons/fa';
import { FaUserCircle, FaArrowAltRight } from 'react-icons/fa';
const Navbar = ({ email }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         
        },
        
      });

      if (response.ok) {
        
        console.log('Logout successful');
        navigate('/');
      } else {
        console.error('Logout failed');
        
      }
    } catch (error) {
      console.error('Error:', error);
     
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
      <span style={{ marginRight: '0.2rem', marginLeft: '2rem', height: '200%', width: 'auto' }}>
  <FaTicketAlt />
</span>
        <span className="navbar-title">Ticketing System</span>
      </div>
      <div className="navbar-right">
      <div>
      <span style={{ marginRight: '0.5rem' }}>  <FaPortrait /></span>
      <NavLink className="navbar-username text-white" to={`/profile/${email}`}>
        {email}
      </NavLink>
    </div>
    <i class="fa-solid fa-arrow-right-from-bracket"></i>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
       
      </div>
    </nav>
  );
}

export default Navbar;
