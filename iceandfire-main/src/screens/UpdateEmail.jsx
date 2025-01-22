import React, { useState } from 'react';

function UpdateEmail({ darkMode, showEmailModal, setShowEmailModal }) {
  const [newEmail, setNewEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const email = localStorage.getItem("email");
      const response = await fetch(`${process.env.REACT_APP_WEB_URL}/api/sendOtp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: newEmail }), // Send new email for OTP
      });

      const json = await response.json();
      if (json.success) {
        setIsOtpSent(true);
        alert("OTP sent to your new email.");
      } else {
        setErrorMessage(json.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred while sending OTP.");
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const email = localStorage.getItem("email"); // Get old email
      const response = await fetch(`${process.env.REACT_APP_WEB_URL}/api/verifyOtp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldemail: email, newemail: newEmail, otp }), // Correctly pass old and new emails
      });

      const json = await response.json();
      if (json.success) {
        alert("Email updated successfully.");
        setShowEmailModal(false);
      } else {
        setErrorMessage("Invalid OTP.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred during verification.");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <>
      {showEmailModal && (
        <div className="modal fade show" style={{ display: 'block' }} role="dialog">
          <div className="modal-dialog" role="document">
            <div className={`modal-content ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
              <div className="modal-header">
                <h5 className="modal-title">Update Email</h5>
                <button type="button" className="btn-close" onClick={() => setShowEmailModal(false)}></button>
              </div>
              <div className="modal-body">
                {!isOtpSent ? (
                  <form onSubmit={handleSendOtp}>
                    <div className="mb-3">
                      <label className="form-label">Enter new email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? 'Sending...' : 'Send OTP'}
                    </button>
                    {errorMessage && <div className="text-danger">{errorMessage}</div>}
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp}>
                    <div className="mb-3">
                      <label className="form-label">Enter OTP</label>
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
      )}
    </>
  );
}

export default UpdateEmail;
