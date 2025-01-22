import React, { useState } from 'react';

function ChangePassword({ darkMode, showPassModal, setShowPassModal }) {
  const [credentials, setCredentials] = useState({
    oldpassword: "",
    newpassword1: "",
    newpassword2: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.newpassword1 !== credentials.newpassword2) {
      alert("New passwords do not match.");
      return;
    }

    try {
      const email = localStorage.getItem("email");
      console.log("Auth Token:", localStorage.getItem("authToken"));
      console.log("Email:", email);
      console.log("Request Body:", {
        email,
        oldpassword: credentials.oldpassword,
        newpassword: credentials.newpassword1
      });

      const response = await fetch(`${process.env.REACT_APP_WEB_URL}/api/changePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          email: email,
          oldpassword: credentials.oldpassword,
          newpassword: credentials.newpassword1
        })
      });

      const json = await response.json();
      if (json.success) {
        alert("Password updated successfully.");
        setShowPassModal(false);
      } else {
        alert("Old password is incorrect or update failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the password.");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      {showPassModal && (
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
                <h5 className="modal-title">Update Password</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowPassModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="oldpassword" className="form-label">Enter old password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="oldpassword"
                      name="oldpassword"
                      value={credentials.oldpassword}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="newpassword1" className="form-label">Enter new password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="newpassword1"
                      name="newpassword1"
                      value={credentials.newpassword1}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="newpassword2" className="form-label">Confirm new password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="newpassword2"
                      name="newpassword2"
                      value={credentials.newpassword2}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <button type="submit" className="m-3 btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChangePassword;
