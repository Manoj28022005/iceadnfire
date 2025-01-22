import React, { useState } from "react";

function Signup({ darkMode, showSignupModal, setShowSignupModal, openLoginModal }) {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
    phone: ""
  });
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isOtpSent || !otpVerified) {
      alert("Please verify your email address.");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_WEB_URL}/api/createuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation,
          phone: credentials.phone
        })
      });

      const json = await response.json();
      if (json.success) {
        alert("Signup successful. Now login with your credentials.");
        setCredentials({ name: "", email: "", password: "", geolocation: "", phone: "" });
        setOtp(""); // Clear OTP input after successful signup
        setIsOtpSent(false);
        setOtpVerified(false);
        setShowSignupModal(false);
        openLoginModal();
      } else {
        alert("Enter valid credentials.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const onSendOTP = async () => {
    if (!credentials.email) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_WEB_URL}api/sendOtp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: credentials.email })
      });

      const json = await response.json();
      if (json.success) {
        setOtpMessage("OTP sent to your email address.");
        setIsOtpSent(true);
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const onVerifyOTP = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_WEB_URL}/api/verifyOtp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: credentials.email, otp })
      });

      const json = await response.json();
      if (json.success) {
        setOtpVerified(true);
        setOtpMessage("Email verified successfully.");
      } else {
        setOtpMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <>
      {showSignupModal && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }} aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className={`modal-content ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
              <div className="modal-header">
                <h5 className="modal-title">Signup</h5>
                <button type="button" className="btn-close" onClick={() => setShowSignupModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={credentials.name}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={credentials.email}
                      onChange={onChange}
                      required
                    />
                    <button type="button" className="btn btn-primary mt-2" onClick={onSendOTP}>
                      Send OTP
                    </button>
                    {otpMessage && <p className="mt-2">{otpMessage}</p>}
                  </div>
                  {isOtpSent && (
                    <div className="mb-3">
                      <label htmlFor="otp" className="form-label">Enter OTP</label>
                      <input
                        type="text"
                        className="form-control"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                      />
                      <button type="button" className="btn btn-primary mt-2" onClick={onVerifyOTP}>
                        Verify OTP
                      </button>
                    </div>
                  )}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={credentials.password}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="geolocation" className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="geolocation"
                      value={credentials.geolocation}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number (Optional)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={credentials.phone}
                      onChange={onChange}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={!isOtpSent || !otpVerified}>Signup</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Signup;
