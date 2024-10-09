'use client'
import React from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';

export default function ResetPasswordForm({ setShowPopup, message, successMessage, setMessage, handleResetChange, handlePasswordResetSubmit, otpSent }){
  return (
    <div className="popup">
      <div className="popup-content reset-password">
        <span className="close" onClick={() => setShowPopup(false)}>&times;</span>
        <h4 className='title'>Reset Password</h4>
        {successMessage ? (
          <div className="success-message">
            <p>{successMessage}</p>
          </div>
        ) : (
          <form onSubmit={handlePasswordResetSubmit}>
            {!otpSent ? (
              <div className="input-field">
                <FaEnvelope className="icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleResetChange}
                  onClick={() => setMessage([])}
                  required
                />
              </div>
            ) : (
              <>
                <div className="input-field">
                  <FaLock className="icon" />
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    onChange={handleResetChange}
                    required
                  />
                </div>
                
                <div className="input-field">
                  <FaLock className="icon" />
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    onChange={handleResetChange}
                    required
                  />
                </div>
                <span className="form-text">
                  <span className="text-danger">*</span> Your password must be 8-20 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one &apos;@&apos;.
                </span>
                <div className="input-field">
                  <FaLock className="icon" />
                  <input
                    type="password"
                    name="confirmNewPassword"
                    placeholder="Confirm New Password"
                    onChange={handleResetChange}
                    required
                  />
                </div>
              </>
            )}
            <button type="submit" className="rn-btn edu-btn">
              {otpSent ? "Reset Password" : "Send OTP"}
            </button>
            {message && <p style={{ color: 'orange', margin: "0", padding: "0" }}>{message}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
