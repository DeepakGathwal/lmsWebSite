"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import '../../styles/login.css';
import { signIn } from 'next-auth/react';
import SignInForm from '@/components/signInForm';
import SignUpForm from '@/components/signUpForm';
import ResetPasswordForm from '@/components/resetPasswordForm';
import SocialAuth from '@/components/socialAuth';
import Image from 'next/image';
import { forGetPassword, resetPassword } from '@/lib/apis';
// import { forGetPassword,  } from '@/lib/apis';

export default function Login() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') return router.push(`/`);
  }, [status]);

  const [posts, setPosts] = useState({ name: "", email: "", password: "" });
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [resetData, setResetData] = useState({ email: "", otp: "", newPassword: "", confirmNewPassword: "" });

  const handelChange = (e) => {
    setPosts({ ...posts, [e.target.name]: e.target.value });
  };

  const handleResetChange = (e) => {
    setResetData({ ...resetData, [e.target.name]: e.target.value });
  };

  const validateResetPasswordForm = () => {
    const { email, otp, newPassword, confirmNewPassword } = resetData;
  
    if (!otpSent) {
      if (!email) {
        return "Email is required.";
      }
      return null;
    }
  
    if (!otp || !newPassword || !confirmNewPassword) {
      return "All fields are required.";
    }
    
    // Password validation: 8-20 characters, must include uppercase, lowercase, number, and '@'
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@])[A-Za-z\d@]{8,20}$/;
    if (!passwordRegex.test(newPassword)) {
      return "New password must be 8-20 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one '@'.";
    }
  
    if (newPassword !== confirmNewPassword) {
      return "Passwords do not match.";
    }
  
    return null;
  };
  
  const handlePasswordResetSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateResetPasswordForm();
    if (validationError) {
      setMessage(validationError);
      return;
    }

    if (!otpSent) {
      const data = await forGetPassword(resetData.email);
      if (data.success) {
        setMessage([]);
        setOtpSent(true);
      } else {
        setMessage(data.message);
      }
    } else {
      const { data } = await resetPassword(resetData);
      if (data === "Profile Updated") {
        posts.email = resetData.email;
        posts.password = resetData.newPassword;
        setShowPopup(false);
        const result = await signIn('credentials', {
          redirect: false,
          email: resetData.email,
          password: resetData.newPassword,
        });
        if (result.ok) {
          setSuccessMessage("Password reset successfully.");
          setTimeout(() => {
            setSuccessMessage("");
            setShowPopup(false);
            setResetData({ email: "", otp: "", newPassword: "", confirmNewPassword: "" }); // Reset form fields
            // router.push('/');
          }, 3000); // Delay for 3 seconds to show success message
        } else {
          setMessage("Password reset but unable to sign in. Please try again.");
        }
      } else {
        setMessage(data);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage([]);
    const result = await signIn('credentials', {
      redirect: false,
      email: posts.email,
      password: posts.password,
    });
    if (result.ok) {
      setMessage(["Account Created Successfully"])
    } else {
      return setMessage("Email and Password do not match");
    }
  };

  return (
    <>
      <div className={`containers ${isSignUp ? 'sign-up-mode' : ''}`}>
        <div className="forms-container">
          <div className="signin-signup login-form-box">
            <SignInForm
              handelChange={handelChange}
              setMessage={setMessage}
              message={message}
              handleSubmit={handleSubmit}
              setIsSignUp={setIsSignUp}
              setShowPopup={setShowPopup}
            />
            <SignUpForm
              handelChange={handelChange}
              posts={posts}
              handleSubmit={handleSubmit}
              setMessage={setMessage}
              message={message}
              setIsSignUp={setIsSignUp}
            />
            <SocialAuth />
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3 className='text-center'>New to our community?</h3>
              <p>
                Discover a world of possibilities! Join us and explore a vibrant community where ideas flourish and connections thrive.
              </p>
              <button className="btn edu-btn-transparent btn-login" onClick={() => setIsSignUp(true)}>
                Sign up
              </button>
            </div>
            <Image
              src="https://i.ibb.co/6HXL6q1/Privacy-policy-rafiki.png"
              className="image"
              alt=""
              width={100}
              height={100}
            />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of Our Valued Members</h3>
              <p>
                Thank you for being part of our community. Your presence enriches our shared experiences. Let&apos;s continue this journey together!
              </p>
              <button className="btn edu-btn-transparent btn-login" onClick={() => setIsSignUp(false)}>
                Sign in
              </button>
            </div>
            <Image
              src="https://i.ibb.co/nP8H853/Mobile-login-rafiki.png"
              className="image"
              alt=""
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>

      {showPopup && (
        <ResetPasswordForm
          setShowPopup={setShowPopup}
          message={message}
          successMessage={successMessage}
          setMessage={setMessage}
          handleResetChange={handleResetChange}
          handlePasswordResetSubmit={handlePasswordResetSubmit}
          otpSent={otpSent}
          resetData={resetData} // Pass the resetData state if needed for further handling in ResetPasswordForm
        />
      )}
    </>
  );
}
