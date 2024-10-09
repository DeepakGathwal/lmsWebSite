import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { allRoles, joinUsForm } from '@/lib/apis';
import Tnc from './tnc';

export default function JoinUs ({ joinForm, setjoinForm, ...props }) {
    const [field, setField] = useState({
        name: "",
        phone: "",
        role: "",
        email: ""
    });
    const [errors, setErrors] = useState({});
    const [state, setState] = useState([]);
    const [check, setCheck] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        // Name validation
        if (!/^[a-zA-Z\s]+$/.test(field.name)) {
            newErrors.name = "Name should contain alphabets only.";
            isValid = false;
        }

        // Phone validation
        if (!/^\d{10}$/.test(field.phone)) {
            newErrors.phone = "Please enter a valid 10-digit phone number.";
            isValid = false;
        }

        // Role validation
        if (!field.role) {
            newErrors.role = "Please select a profile.";
            isValid = false;
        }

        // Checkbox validation
        if (!check) {
            newErrors.checkbox = "Please agree to the terms and conditions.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const hireclose = () => {
        setjoinForm(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setField({ ...field, [name]: value });
    };

    const allData = async () => {
        const { data } = await allRoles();
        if (data) {
            setState(data);
        }
    };

    useEffect(() => {
        allData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const data = await joinUsForm(field);
            setField({
                name: "",
                phone: "",
                role: "",
                email: ""
            });
            setCheck(false);

            if (data.success) {
                setSubmitted(true);
                setTimeout(() => {
                    setSubmitted(false);
                    hireclose();
                }, 3000);
            }
        }
    };

    return (
        <Modal show={joinForm} onHide={hireclose} {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered className='popup-form-enq-auto-main'>
            {!submitted ? (
                    <>
            <Modal.Header className='popup-enq-form-auto'>
                <h3 className="mb-30">Join Us Today</h3>
                <span className="fade-out main-btn-circle" onClick={hireclose}>╳</span>
            </Modal.Header>
            <Modal.Body>
                                <div className="container checkout-page-style" style={{ padding: 0 }}>
                                    <div className="login-form-box">
                                        
                                            <form className="login-form" onSubmit={handleSubmit} id="registrationForm2">
                                                <div className="input-box mb--20">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id="name3"
                                                        className="name"
                                                        onChange={handleChange}
                                                        placeholder="Enter your name"
                                                        value={field.name}
                                                    />
                                                    {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                                                </div>
                                                <div className="input-box mb--20">
                                                    <input
                                                        type="tel"
                                                        id="phone3"
                                                        name="phone"
                                                        className="phone-input"
                                                        onChange={handleChange}
                                                        placeholder="Enter your Mobile"
                                                        value={field.phone}
                                                    />
                                                    {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
                                                </div>
                                                <div className="input-box mb--20">
                                                    <select
                                                        name="role"
                                                        id="vacancy"
                                                        className="hiring_profile"
                                                        onChange={handleChange}
                                                        value={field.role}
                                                    >
                                                        <option value="">Select Profile</option>
                                                        {state && state.map((el, i) => (
                                                            <option key={i} value={el.id}>{el.role}</option>
                                                        ))}
                                                    </select>
                                                    {errors.role && <span style={{ color: 'red' }}>{errors.role}</span>}
                                                </div>
                                                <div className="input-box mb--20">
                                                    <input
                                                        type="checkbox"
                                                        id="checkbox-3"
                                                        name="checkbox"
                                                        checked={check}
                                                        onChange={() => setCheck(!check)}
                                                    />
                                                    <label htmlFor="checkbox-3">I accept the Terms &#38; Conditions.</label>
                                                    {errors.checkbox && <span style={{ color: 'red' }}>{errors.checkbox}</span>}
                                                </div>
                                                <button className="rn-btn edu-btn w-100 mb--20" type="submit">
                                                    <span>Join Now</span>
                                                </button>
                                            </form>
                                        
                                    </div>
                                </div>
            </Modal.Body>
            </>
                ) : (
                    <div className="thank-you-message">
                        <h3>Thank you for showing your interest!</h3>
                        <p>We will get back to you soon.</p>
                    </div>
                )}
        </Modal>
    );
};

