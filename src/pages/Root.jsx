import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

function Root() {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const navigate = useNavigate();

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    // Implement admin login functionality here
    try {
      const response = await axios.post('http://localhost:3001/admin-login', { email: adminEmail, password: adminPassword });
      const token = response.data.token;
      setAdminEmail('');
      setAdminPassword('');
      setIsAdminModalOpen(false);
      localStorage.setItem('adminToken', token);
      navigate('/admin-page');
      window.location.reload();
    } catch (error) {
      console.log('Unable to log in as admin');
    }
  };

  return (
    <div>
      <nav className='navRoot'>
        <img 
          className='logoHeader' 
          src='/src/img/100-logo.png' 
          alt="Admin Logo" 
          onClick={() => setIsAdminModalOpen(true)} 
          style={{ cursor: 'pointer' }} // Add a pointer cursor to indicate it's clickable
        />
      </nav>
      <Outlet />

      {/* Admin Login Modal */}
      <Modal
        isOpen={isAdminModalOpen}
        onRequestClose={() => setIsAdminModalOpen(false)}
        contentLabel="Admin Login"
        className="admin-modal"
        overlayClassName="admin-modal-overlay"
      >
        <h2>Admin Login</h2>
        <form onSubmit={handleAdminSubmit}>
          <div>
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              required
              placeholder='Admin Email'
            />
          </div>
          <div>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              required
              placeholder='Admin Password'
            />
          </div>
          <button type="submit">LOG IN</button>
          <button type="button" onClick={() => setIsAdminModalOpen(false)}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
}

export default Root;
