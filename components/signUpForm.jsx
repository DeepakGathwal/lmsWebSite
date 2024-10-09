"use client";
import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { matchOtp, registrationApi } from '@/lib/apis';

export default function SignUpForm({ handelChange, posts, setMessage, message, setIsSignUp, handleSubmit }) {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const validatePassword = (password) => {
    // Password validation: 8-20 characters, must include uppercase, lowercase, number, and '@'
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@])[A-Za-z\d@]{8,20}$/;
    return passwordRegex.test(password);
  };

  const register = async (e) => {
    e.preventDefault();
    
    if (!validatePassword(posts.password)) {
      setMessage("Password must be 8-20 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one '@'.");
      return;
    }
    
    // Clear previous messages
    setMessage("");

    const data = await registrationApi(posts);
    if (data.message === "verify the otp") {
      setOtpSent(true);
    } else {
      setMessage(data.message);
    }
  };

  const verifyAndRegister = async (e) => {
    e.preventDefault();
    const data = await matchOtp(otp, posts.email);
    if (data.message === "Account Verify") {
      await handleSubmit(e);
    } else {
      setMessage(data.message);
    }
  };

  return (
    <form action="post" className="sign-up-form" onSubmit={otpSent ? verifyAndRegister : register}>
      <h2 className="title">Sign up / <span onClick={() => setIsSignUp(false)}>Sign In</span></h2>
      <div className="input-field">
        <FaUser className="icon" />
        <input type="text" placeholder="Name" name="name" onChange={(e) => handelChange(e)} required />
      </div>
      <div className="input-field">
        <FaEnvelope className="icon" />
        <input type="email" placeholder="Email" name='email' onChange={(e) => handelChange(e)} required />
      </div>
      <div className="input-field">
        <FaLock className="icon" />
        <input type="password" placeholder="Password" name='password' onChange={(e) => handelChange(e)} required />
      </div>
      {otpSent && (
        <div className="input-field">
          <FaLock className="icon" />
          <input type="text" placeholder="Enter OTP" name='otp' value={otp} onChange={(e) => setOtp(e.target.value)} onClick={() => setMessage([])} />
        </div>
      )}
      <button type="submit" className='rn-btn edu-btn'>{otpSent ? "Verify OTP" : "Sign Up"}</button>
      {message && <p style={{ color: 'orange', margin: "0", padding: "0" ,maxWidth:"380px" }}>{message}</p>}
      <p className="social-text">Or Sign up with social platforms</p>
    </form>
  );
}
