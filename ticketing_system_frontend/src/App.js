
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/login/Login';
import Signup from './pages/Signup/Signup';
import CustomerPage from './Components/CustomerPage';
import SupportEngineer from './Components/SupportEngineer';
import CreateTicketForm from './Components/CreateTicketForm';
import ViewTickets from './Components/ViewTickets';
import SupportEdit from './Components/SupportEdit';
import Profile from './Components/Profile';
import OpenTicket from './Components/OpenTicket';
import ClosedTicket from './Components/ClosedTicket';
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route  path="/" element={<Login/>} /> 
        <Route path="/signup" element={<Signup/>} /> 
        <Route path="/customer/:email" element={<CustomerPage />} />
        <Route path="/support/:email" element={<SupportEngineer/>}/>
        <Route path='/create-ticket/:email' element={<CreateTicketForm />} />
          <Route path='/view-tickets/:email' element={<ViewTickets />} />
<Route path="/support/edit/:ticketId" element={<SupportEdit/>} />
<Route path="/profile/:email" element={<Profile/>} />
<Route path='/open-tickets/:email' element={<OpenTicket/>}/>
<Route path='/closed-tickets/:email' element={<ClosedTicket/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
