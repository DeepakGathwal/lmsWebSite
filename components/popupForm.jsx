"use client"
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Tnc from './tnc';
import { enquiryForm, homeCourses } from '@/lib/apis';
import Link from 'next/link';

export default function PopupForm({ show, handleClose, ...props }) {
    const [field, setField] = useState({ name: '', phone: '', course: '' });
    const [errors, setErrors] = useState({});
    const [state, setState] = useState([]);
    const [check, setCheck] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    async function fetchData() {
        const { data } = await homeCourses();
        return data && setState(data);
    }
    useEffect(() => {
        fetchData();
    }, []);

    const handelChange = (e) => {
        const { name, value, type, checked } = e.target;
        setField({ ...field, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        // Name validation
        if (!/^[a-zA-Z\s]+$/.test(field.name)) {
            newErrors.name = "Name should contain alphabets only.";
            isValid = false;
        } else {
            newErrors.name = "";
        }

        // Phone validation
        if (!/^\d{10}$/.test(field.phone)) {
            newErrors.phone = "Please enter a valid 10-digit phone number";
            isValid = false;
        } else {
            newErrors.phone = "";
        }

        // Course validation
        if (field.course === "" || field.course === "Select Course") {
            newErrors.course = "Please select a course";
            isValid = false;
        } else {
            newErrors.course = "";
        }

        // Checkbox validation
        if (!check) {
            newErrors.checkbox = "Please accept the terms and conditions";
            isValid = false;
        } else {
            newErrors.checkbox = "";
        }

        setErrors(newErrors);
        return isValid;
    };


    const handelSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const data = await enquiryForm(field);
            setField({
                name: "",
                phone: "",
                course: "",
                email: ""
            });
            setCheck(false);

            if (data.success == true) {
                setSubmitted(true);
                setTimeout(() => {
                    setSubmitted(false);
                    handleClose(false);
                }, 3000);
            }
        }
    };


    return (
        <Modal show={show} onHide={handleClose} {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered className='popup-form-enq-auto-main'>
                {!submitted ? (
                    <>
            <Modal.Header className='popup-enq-form-auto'>
                <h3 className="mb-30">Get in Touch</h3>
                <span className="fade-out main-btn-circle" onClick={handleClose}>╳</span>
            </Modal.Header>
            <Modal.Body>
                <div className="container checkout-page-style">
                <div className="login-form-box">
            
                        <form className="login-form" id="downloadSyllabus" onSubmit={handelSubmit}>
                            <div className="input-box mb--20">
                                <input type="text" placeholder="Name" name="name" id="name6" onChange={handelChange} value={field.name} />
                                {errors.name && <span className="error-message red">{errors.name}</span>}
                            </div>
                            <div className="input-box mb--20">
                                <input type="tel" maxLength="10" id="phone" className="phone-input" name="phone" placeholder="Mobile Number" onChange={handelChange} value={field.phone} />
                                {errors.phone && <span className="error-message red">{errors.phone}</span>}
                            </div>
                            <div className="input-box mb--20">
                                <select name="course" id="courses3" className="courses valid" aria-invalid="false" value={field.course} onChange={handelChange}>
                                    <option>Select Course</option>
                                    {state && state.map((el, i) => (
                                        <option key={i} value={el.id}>{el.name}</option>
                                    ))}
                                </select>
                                {errors.course && <span className="error-message red">{errors.course}</span>}
                            </div>
                            <div className="input-box mb--20">
                                <input type="checkbox" id="checkbox-1" name="checkbox" checked={check} onChange={() => setCheck(!check)} />
                                <label htmlFor="checkbox-1">I accept the <Link href="/termsandcondition" prefetch>Terms &#38; Conditions</Link>.</label>
                                {errors.checkbox && <span className="error-message red">{errors.checkbox}</span>}
                            </div>
                            <button className="rn-btn edu-btn w-100 mb--20" type="submit">
                                <span>Enquire Now</span>
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
}
