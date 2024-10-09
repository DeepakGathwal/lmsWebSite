'use client'
import React from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';


export default function SignInForm({ handelChange,  setMessage, message, setIsSignUp, setShowPopup, handleSubmit }) {
  


  return (
    <form action="#" className="sign-in-form login-form" onSubmit={handleSubmit}>
      <h2 className="title">Sign in / <span onClick={() => setIsSignUp(true)}>Sign Up</span></h2>
      <div className="input-field">
        <FaEnvelope className="icon" />
        <input type="email" name="email" placeholder="Email" onChange={handelChange} onClick={() => setMessage([])} required/>
      </div>
      <div className="input-field">
        <FaLock className="icon" />
        <input type="password" name='password' placeholder="Password" onChange={handelChange} onClick={() => setMessage([])} required/>
      </div>
      <button className="rn-btn edu-btn" type="submit">Sign in</button>
      {message && <p style={{ color: 'orange', margin: "0", padding: "0" }}>{message}</p>}
      <p className="social-text">Or Sign in with social platforms</p>
      <div className="input-box" >
        <a className="lost-password" style={{cursor : 'pointer'}} onClick={() => setShowPopup(true)}>Lost your password?</a>
      </div>
    </form>
  );
}
