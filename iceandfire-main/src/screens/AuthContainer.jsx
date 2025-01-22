// AuthContainer.jsx

import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

function AuthContainer() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const openLoginModal = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const openSignupModal = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  return (
    <div>
      {/* This button will initially open the login modal */}
      <button onClick={openLoginModal} className="btn btn-primary">
        Login
      </button>
      {/* Render Login and Signup modals */}
      <Login 
        showModal={showLoginModal} 
        closeModal={() => setShowLoginModal(false)} 
        openSignupModal={openSignupModal}
      />
      <Signup 
        showModal={showSignupModal} 
        closeModal={() => setShowSignupModal(false)} 
        openLoginModal={openLoginModal}
      />
    </div>
  );
}

export default AuthContainer;
