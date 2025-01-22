// Navbar.jsx
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Cart from '../screens/Cart';
import Profile from '../screens/Profile';

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setDarkMode(false);
      document.body.classList.add('light-mode');
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      setDarkMode(false);
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      setDarkMode(true);
      localStorage.setItem('theme', 'dark');
    }
  };

  const openLoginModal = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const openSignupModal = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const openCartModal = () => {
    setShowCartModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("cart"); // Clear the cart on logout
    window.location.reload();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid d-flex justify-content-between">
          <NavLink className="navbar-brand fs-1 fst-italic d-flex align-items-center" to="/">
            <img src="logo1.jpg" alt="Logo" className="logo-image" />
            <b>Ice and Fire</b>
          </NavLink>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" style={{ color: 'white' }}>Home</NavLink>
              </li>
              {!localStorage.getItem("authToken") && (
                <>
                  <li className="nav-item">
                    <button className="btn btn-link nav-link" onClick={openLoginModal} style={{ color: 'white' }}>Login</button>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-link nav-link" onClick={openSignupModal} style={{ color: 'white' }}>Signup</button>
                  </li>
                </>
              )}
            </ul>
            <div className="d-flex align-items-center ms-auto">
              <button className="btn btn-light me-2" onClick={toggleTheme}>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
              {localStorage.getItem("authToken") && (
                <>
                  <button className="btn btn-primary me-2" onClick={openCartModal}>My Cart</button>
                  <Profile darkMode={darkMode}/>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Login 
        darkMode={darkMode} 
        showLoginModal={showLoginModal} 
        setShowLoginModal={setShowLoginModal} 
        openSignupModal={openSignupModal} 
      />
      <Signup 
        darkMode={darkMode} 
        showSignupModal={showSignupModal} 
        setShowSignupModal={setShowSignupModal} 
        openLoginModal={openLoginModal} 
      />
      <Cart
        darkMode={darkMode}
        showCartModal={showCartModal}
        setShowCartModal={setShowCartModal}
      />
    </>
  );
}

export default Navbar;
