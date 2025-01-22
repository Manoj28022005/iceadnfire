import React, { useState } from 'react';
import ChangePassword from './ChangePassword';
import UpdateEmail from './UpdateEmail'; // Import the UpdateEmail component
import UpdatePhone from './UpdatePhone';

function Profile({ darkMode }) {
  const [showPassModal, setShowPassModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false); // State for email modal
  const [showPhoneModal, setShowPhoneModal] = useState(false); 

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.reload();
  };

  const handleChangePasswordClick = () => {
    setShowPassModal(true);
    document.querySelector('.dropdown-menu').classList.remove('show'); // Close dropdown
  };

  const handleUpdateEmailClick = () => {
    setShowEmailModal(true); // Open email modal
    document.querySelector('.dropdown-menu').classList.remove('show'); // Close dropdown
  };

  const handleUpdatePhoneClick=()=>{
    setShowPhoneModal(true); //Open phone modal
    document.querySelector('.dropdown-menu').classList.remove('show'); // Close dropdown
  };

  return (
    <>
      <div className="dropdown">
        <button
          className="btn dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            padding: '0',
            cursor: 'pointer'
          }}
        >
          <img
            src="https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg="
            alt="Profile"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
        </button>
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
          <li><a className="dropdown-item" href={`${process.env.REACT_APP_FRONT_URL}/my-orders`} style={{ fontWeight: 'normal' }}>My Orders</a></li>
          <li>
            <button className="dropdown-item" onClick={handleChangePasswordClick} style={{ fontWeight: 'normal' }}>
              Change Password
            </button>
          </li>
          <li>
            <button className="dropdown-item" onClick={handleUpdateEmailClick} style={{ fontWeight: 'normal' }}>
              Update Email
            </button>
          </li>
          <li>
            <button className="dropdown-item" onClick={handleUpdatePhoneClick} style={{ fontWeight: 'normal' }}>
              Update Phone number
            </button>
          </li>
          <li><a className="dropdown-item" href={`${process.env.REACT_APP_FRONT_URL}/support`} style={{ fontWeight: 'normal' }}>Support</a></li>
          <li><button className="dropdown-item" onClick={handleLogout} style={{ fontWeight: 'normal' }}>Logout</button></li>
        </ul>
      </div>

      {/* ChangePassword Modal */}
      <ChangePassword 
        darkMode={darkMode} // Pass the darkMode prop to the modal
        showPassModal={showPassModal} 
        setShowPassModal={setShowPassModal} 
      />

      {/* UpdateEmail Modal */}
      <UpdateEmail 
        darkMode={darkMode} 
        showEmailModal={showEmailModal} 
        setShowEmailModal={setShowEmailModal} 
      />

      <UpdatePhone
      darkMode={darkMode}
      showPhoneModal={showPhoneModal}
      setShowPhoneModal={setShowPhoneModal}
      />
    </>
  );
}

export default Profile;
