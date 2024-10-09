import React, { useState } from 'react';
import { passwordUpdate } from '@/lib/apis';

export default function PasswordField({ Tab }) {
    const [password, setPassword] = useState({
        lastPassword: "",
        password: "",
        confirmPassword: ""
    });
    const [message, setMessage] = useState(""); // State for messages

    const handleChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    };

    // Password validation function
    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@])[A-Za-z\d@]{8,20}$/;
        return regex.test(password);
    };

    const changePassword = async (e) => {
        e.preventDefault();

        if (!validatePassword(password.password)) {
            setMessage("New password must be 8-20 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one '@'.");
            return;
        }

        if (password.password !== password.confirmPassword) {
            setMessage("New password and confirmation do not match.");
            return;
        }

        try {
            await passwordUpdate(password);
            setMessage("Password updated successfully.");
            setTimeout(() => setMessage(""), 3000); 
            setPassword({
                lastPassword: "",
                password: "",
                confirmPassword: ""
            }); // Reset form data
        } catch (error) {
            setMessage("An error occurred while updating the password.");
        }
    };

    return (
        <Tab.Pane eventKey="privacy">
            <div className='course-details-card e-commerce'>
                <h5 className="title">Profile Password</h5>
                <form className="rnt-contact-form rwt-dynamic-form row" onSubmit={changePassword}>
                    <div className="col-lg-12">
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control form-control-lg"
                                name="lastPassword"
                                value={password.lastPassword}
                                id="cpassword"
                                placeholder="Enter Your Current Password"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control form-control-lg"
                                name="password"
                                value={password.password}
                                id="npassword"
                                placeholder="Enter Your New Password"
                                onChange={handleChange}
                            />
                            <span className="form-text">
                                <span className="text-danger">*</span>Password must be 8-20 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one &apos;@&apos;.
                            </span>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control form-control-lg"
                                name="confirmPassword"
                                value={password.confirmPassword}
                                id="cnpassword"
                                placeholder="Confirm Your New Password"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <button className="rn-btn edu-btn" name="submit" type="submit">
                            <span>Save Changes</span>
                        </button>
                    </div>
                    {message && <div className="col-lg-12 mt-3"><p className="message">{message}</p></div>}
                </form>
            </div>
        </Tab.Pane>
    );
};
