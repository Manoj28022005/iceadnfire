import React from 'react';
import { useCart } from '../components/ContextReducer';
import { useNavigate, useLocation } from 'react-router-dom';


function Payment({ user }) {
  const cartItems = useCart();
  const navigate = useNavigate();
  const location = useLocation(); // useLocation hook to get the current location and state
  const { totalPrice } = location.state || {}; // Access state from location

  const handlePaymentOption = async (option) => {
    const confirmation = window.confirm(`You selected: ${option}. Confirm order?`);
    if (!confirmation) return;

    const user = {
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      authToken: localStorage.getItem('authToken'),
    };

    const orderDetails = {
      name: user.name,
      email: user.email,
      authToken: user.authToken,
      items: cartItems,
      total: totalPrice,
    };

    switch (option) {
      case 'UPI':
        navigate('/chooseupi', { state: { orderDetails } });
        return;

      case 'Cash on Delivery':
        navigate('/cod', { state: { orderDetails } });
        return;

      // Add any other cases here if needed
    }
  };

  return (
    <div className="container mt-5">
      <h3>Choose Payment Option</h3>
      <button className="btn btn-outline-primary mt-3" onClick={() => handlePaymentOption('Cash on Delivery')}>
        Cash on Delivery
      </button>
      <button className="btn btn-outline-primary mt-3 ms-3" onClick={() => handlePaymentOption('UPI')}>
        UPI
      </button>
    </div>
  );
}

export default Payment;
