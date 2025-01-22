import React, { useState } from 'react';

const UpdatePhone = ({ darkMode, showPhoneModal, setShowPhoneModal }) => {
  const [newPhone, setNewPhone] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSendOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    // Logic to send OTP
    // On success:
    setIsOtpSent(true);
    setLoading(false);
    // On error:
    // setErrorMessage('Error message');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    // Logic to verify OTP
    // Handle success or error accordingly
  };

  return (
    showPhoneModal && (
      <div className="modal fade show" style={{ display: 'block' }} role="dialog">
        <div className="modal-dialog" role="document">
          <div className={`modal-content ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
            <div className="modal-header">
              <h5 className="modal-title">Update Phone Number</h5>
              <button type="button" className="btn-close" onClick={() => setShowPhoneModal(false)}></button>
            </div>
            <div className="modal-body">
              {!isOtpSent ? (
                <form onSubmit={handleSendOtp}>
                  <div className="mb-3">
                    <label className="form-label">New Phone Number:</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Sending...' : 'Request OTP'}
                  </button>
                  {errorMessage && <div className="text-danger">{errorMessage}</div>}
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp}>
                  <div className="mb-3">
                    <label className="form-label">Enter OTP:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                  {errorMessage && <div className="text-danger">{errorMessage}</div>}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UpdatePhone;
