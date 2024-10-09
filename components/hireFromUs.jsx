import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Tnc from './tnc';
import { hireUsForm, homeCourses } from '@/lib/apis';

export default function HireFromUs({ Hireshow, setHireShow, ...props }) {
    const [field, setField] = useState({
        name: "", phone: "", company: "", course: "", designation: "", email: ""
    });
    const [state, setState] = useState([]);
    const [errors, setErrors] = useState({});
    const [check, setCheck] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const allData = async () => {
        const { data } = await homeCourses();
        if (data) {
            setState(data);
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        // Name validation
        if (!/^[a-zA-Z\s]+$/.test(field.name.trim())) {
            newErrors.name = "Name should only contain alphabets.";
            isValid = false;
        }

        // Phone validation
        if (!/^\d{10}$/.test(field.phone)) {
            newErrors.phone = "Please enter a valid 10-digit phone number.";
            isValid = false;
        }

        // Company validation
        if (!field.company.trim()) {
            newErrors.company = "Please enter your company name.";
            isValid = false;
        }

        // Designation validation
        if (!field.designation.trim()) {
            newErrors.designation = "Please enter your designation.";
            isValid = false;
        }

        // Course validation
        if (!field.course || field.course === "Select Course") {
            newErrors.course = "Please select a course.";
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setField({ ...field, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const data = await hireUsForm(field);
            setField({
                name: "", phone: "", company: "", course: "", designation: "", email: ""
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

    const hireclose = () => {
        setHireShow(false);
    };

    useEffect(() => {
        allData();
    }, []);

    return (
        <Modal show={Hireshow} onHide={hireclose} {...props} size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered className='popup-form-enq-auto-main'>
            {!submitted ? (
                <>
                    <Modal.Header className='popup-enq-form-auto'>
                        <h3 className="mb-30">Hire From Us</h3>
                        <span className="fade-out main-btn-circle" onClick={hireclose}>╳</span>
                    </Modal.Header>
                    <Modal.Body>
                            <div className="container checkout-page-style" style={{ padding: 0 }}>
                                <div className="login-form-box">
                                    <form className="login-form" onSubmit={handleSubmit} id="registrationForm1">
                                        <div className="input-box mb--20">
                                            <input
                                                type="text"
                                                name="name"
                                                id="name2"
                                                className="name"
                                                onChange={handleChange}
                                                placeholder="Enter your name"
                                                value={field.name}
                                            />
                                            {errors.name && <span className="error-message red">{errors.name}</span>}
                                        </div>
                                        <div className="input-box mb--20">
                                            <input
                                                type="tel"
                                                id="phone2"
                                                name="phone"
                                                className="phone-input"
                                                onChange={handleChange}
                                                placeholder="Enter your Mobile"
                                                value={field.phone}
                                            />
                                            {errors.phone && <span className="error-message red">{errors.phone}</span>}
                                        </div>
                                        <div className="input-box mb--20">
                                            <input
                                                type="text"
                                                name="company"
                                                id="company_name"
                                                onChange={handleChange}
                                                className="comName"
                                                placeholder="Enter your Company Name"
                                                value={field.company}
                                            />
                                            {errors.company && <span className="error-message red">{errors.company}</span>}
                                        </div>
                                        <div className="input-box mb--20">
                                            <input
                                                type="text"
                                                name="designation"
                                                id="designation"
                                                onChange={handleChange}
                                                className="designation"
                                                placeholder="Enter your Designation"
                                                value={field.designation}
                                            />
                                            {errors.designation && <span className="error-message red">{errors.designation}</span>}
                                        </div>
                                        <div className="input-box mb--20">
                                            <select
                                                name="course"
                                                id="courses"
                                                className="courses valid"
                                                aria-invalid="false"
                                                onChange={handleChange}
                                                value={field.course}
                                            >
                                                <option>Select Course</option>
                                                {state && state.map((el, i) => (
                                                    <option key={i} value={el.id}>{el.name}</option>
                                                ))}
                                            </select>
                                            {errors.course && <span className="error-message red">{errors.course}</span>}
                                        </div>
                                        <div className="input-box mb--20">
                                            <input
                                                type="checkbox"
                                                id="checkbox-2"
                                                name="checkbox"
                                                checked={check}
                                                onChange={() => setCheck(!check)}
                                            />
                                            <label htmlFor="checkbox-2">I accept the Terms & Conditions.</label>
                                            {errors.checkbox && <span className="error-message red">{errors.checkbox}</span>}
                                        </div>
                                        <button className="rn-btn edu-btn w-100 mb-20" type="submit">
                                            <span>Hire Now</span>
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
