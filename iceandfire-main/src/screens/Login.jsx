import React, { useState } from 'react';

function Login({ darkMode, showLoginModal, setShowLoginModal, openSignupModal }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(""); // Store error messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation before making the request
    if (!credentials.email || !credentials.password) {
      setErrorMessage("Email and Password are required.");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_WEB_URL}/api/loginuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      // Check if the response is OK (status 200)
      if (!response.ok) {
        setErrorMessage(`Error: ${response.status} - ${response.statusText}`);
        return;
      }

      const json = await response.json();

      if (json.success) {
        // Store email, authToken, and name in localStorage
        localStorage.setItem("email", credentials.email);
        localStorage.setItem("authToken", json.authToken);
        localStorage.setItem("name", json.name); // Store the name

        setCredentials({ email: "", password: "" });
        setShowLoginModal(false); // Close login modal on success
        setErrorMessage(""); // Clear error message if successful
      } else {
        setErrorMessage("Invalid credentials.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      {showLoginModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: 'block' }}
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className={`modal-content ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
              <div className="modal-header">
                <h5 className="modal-title">Login</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowLoginModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      name="email"
                      value={credentials.email}
                      onChange={onChange}
                      aria-describedby="emailHelp"
                      required
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      name="password"
                      value={credentials.password}
                      onChange={onChange}
                      required
                    />
                  </div>
                  {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  )}
                  <button type="submit" className="m-3 btn btn-primary">Submit</button>
                  <button type="button" className="m-3 btn btn-danger" onClick={openSignupModal}>
                    I'm a new user
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
