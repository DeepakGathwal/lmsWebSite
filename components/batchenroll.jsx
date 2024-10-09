import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Tnc from './tnc';
import { batchForm } from '@/lib/apis';

export default function Batchenroll({ show, setShow, id, course,...props}) {
    const [field, setField] = useState({
        name: "", phone: "", email: "", id: id, checkbox: false
    });
    const [errors, setErrors] = useState({
        name: "", phone: "", checkbox: ""
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setField(prevField => ({
            ...prevField,
            [name]: type === 'checkbox' ? checked : value
        }));
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
        if (!/^\d{10}$/.test(field.phone.trim())) {
            newErrors.phone = "Please enter a valid 10-digit phone number.";
            isValid = false;
        } else {
            newErrors.phone = "";
        }

        // Checkbox validation
        if (!field.checkbox) {
            newErrors.checkbox = "Please accept the terms and conditions.";
            isValid = false;
        } else {
            newErrors.checkbox = "";
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            await batchForm(field);
            setField({
                name: "", 
                phone: "",
                email: "",
                id: id,
                checkbox: false
            });
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                hireclose(false);
            }, 3000);
        }
    };

    const hireclose = () => {
        setShow(false);
    };


    return (
        <Modal show={show} onHide={hireclose} {...props} size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered className='popup-form-enq-auto-main'>
                    {submitted ? (
                        <div className="success-message">
                            <h5>Enrollment successful!</h5>
                            <p>Thank you for enrolling. We will get in touch with you soon.</p>
                        </div>
                    ) : (
                        <>
            <Modal.Header className='popup-enq-form-auto'>
                        <h5 className="mb-30">Enroll Now: Secure Your Spot!</h5>
                        <span className="fade-out main-btn-circle" onClick={hireclose}>╳</span>
                    </Modal.Header>
            <Modal.Body>
                <div className="container checkout-page-style">
                        <div className="login-form-box">
                            <form className="login-form" onSubmit={handleSubmit} id="batches1">
                                <div className="input-box mb--20">
                                    <input type="text" id="batches" name="batches" value={course} readOnly className='cursornodrop'/>
                                </div>
                                <div className="input-box mb--20">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        id="name4"
                                        name="name"
                                        onChange={handleChange}
                                        value={field.name}
                                    />
                                    {errors.name && <span className="error-message red">{errors.name}</span>}
                                </div>
                                <div className="input-box mb--20">
                                    <input
                                        type="tel"
                                        id="phone4"
                                        className="phone-input"
                                        name="phone"
                                        onChange={handleChange}
                                        placeholder="Mobile Number"
                                        value={field.phone}
                                    />
                                    {errors.phone && <span className="error-message red">{errors.phone}</span>}
                                </div>
                                <Tnc id={"checkbox-4"} field={field} setField={setField} errors={errors} />
                                <button className="rn-btn edu-btn w-100 mb--20" type="submit">
                                    <span>Enroll Now</span>
                                </button>
                            </form>
                        </div>
                </div>
            </Modal.Body>
            </>
                    )}
        </Modal>
    );
};


