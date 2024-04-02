import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBeer, FaDoorClosed, FaEdit, FaFolder, FaOpenid } from "react-icons/fa";

const Sidebar = ({ email }) => {
  return (
    <div className="sidebar">
      <ul>
        <li>
        
        <span style={{ marginRight: '0.5rem' }}>  <FaFolder /></span>
    
          <NavLink to={`/view-tickets/${email}`}>View Tickets</NavLink>
        </li>
        <li>
        <span style={{ marginRight: '0.5rem' }}>  <FaOpenid /></span>
          <NavLink to={`/open-tickets/${email}`}>Open Tickets</NavLink>
        </li>
        <li>
        <span style={{ marginRight: '0.5rem' }}>  <FaDoorClosed /></span>
          <NavLink to={`/closed-tickets/${email}`}>Closed Tickets</NavLink>
        </li>
        
        <li>
        <span style={{ marginRight: '0.5rem' }}>  <FaEdit /></span>
          <NavLink to={`/create-ticket/${email}`}>Create Ticket</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
