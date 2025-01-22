import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function ChooseUPI() {
  const location = useLocation();
  const { orderDetails } = location.state || {};

  const [transactionId, setTransactionId] = useState('');
  const [showTransactionBox, setShowTransactionBox] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  if (!orderDetails) {
    return <div>Error: No order details available</div>;
  }

  const total = orderDetails.total;

  const googlePayLink = `https://pay.google.com/gp/p/ui/pay?pa=manoj7799076555@okicici&pn=manoj%20siva&tn=Payment%20for%20Order&am=${total}&cu=INR`;
  const phonePeLink = `https://upi.phonepe.com/pay?pa=yourname@ybl&pn=Your%20Name&tn=Payment%20for%20Order&am=${total}&cu=INR`;

  const handleLinkClick = () => {
    setShowTransactionBox(true);
  };

  const handleTransactionSubmit = async () => {
    if (transactionId.trim() === '') {
      setError('Transaction ID is required');
      return;
    }

    const payload = {
      name: orderDetails.name,
      email: orderDetails.email,
      transactionId: transactionId.trim(),
      totalAmount: orderDetails.total,
      items: orderDetails.items,
      status: 'Pending',
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_WEB_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccessMessage(true);
        setTransactionId('');
        setError('');
      } else {
        setError('Failed to submit transaction details.');
      }
    } catch (err) {
      setError('Error submitting transaction details.');
    }
  };

  const closeSuccessMessage = () => {
    setSuccessMessage(false);
  };

  return (
    <div className="container mt-5">
      <h3>Pay Using UPI</h3>
      <p>Total Amount: ₹{total}</p>

      <div className="mt-4">
        <a
          href={googlePayLink}
          className="btn btn-outline-primary me-3"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleLinkClick}
        >
          Pay with Google Pay
        </a>

        <a
          href={phonePeLink}
          className="btn btn-outline-primary me-3"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleLinkClick}
        >
          Pay with PhonePe
        </a>
      </div>

      {showTransactionBox && (
        <div className="mt-5">
          <h5>Enter your Transaction ID:</h5>
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            className="form-control mb-2"
            placeholder="Enter transaction ID"
          />
          {error && <p className="text-danger">{error}</p>}
          <button className="btn btn-success" onClick={handleTransactionSubmit}>
            Submit
          </button>
        </div>
      )}

      {successMessage && (
        <div
          className="modal-backdrop"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1050,
          }}
        >
          <div
            className="modal-content"
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
              maxWidth: '500px',
              width: '100%',
            }}
          >
            <h5 className="modal-title">Order Placed Successfully</h5>
            <p>Your order has been placed successfully. You will receive a final confirmation in 5 minutes.</p>
            <button className="btn btn-primary" onClick={closeSuccessMessage}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChooseUPI;
