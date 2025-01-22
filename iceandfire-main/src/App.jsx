import React, { useEffect } from 'react';
import './App.css';
import Home from './screens/Home.jsx';
import Login from './screens/Login.jsx';
import Signup from './screens/Signup.jsx';
import Payment from './screens/Payment.jsx';
import Navbar from './components/Navbar.jsx';
import { CartProvider } from "./components/ContextReducer";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ChooseUPI from './screens/ChooseUPI.jsx';

function App() {
  useEffect(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
  }, []);

  return (
    <CartProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loginuser" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/chooseupi" element={<ChooseUPI />} />
            {/* <Route path="/cod" element={<COD />} /> */}

          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
