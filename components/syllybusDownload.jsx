import React, { useState, useRef } from 'react';
import Tnc from './tnc';
import { brochureForm } from '@/lib/apis';

export default function SyllybusDownload({ coursename }){
    const [field, setField] = useState({
        name: "", phone: "", course: coursename, checkbox: false
    });
    const [errors, setErrors] = useState({
        name: "", phone: "", checkbox: ""
    });
    const [thankYouMessage, setThankYouMessage] = useState(""); // State for thank you message
    const formRef = useRef(null);

    const handelChange = (e) => {
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
        if (!/^\d{10}$/.test(field.phone.trim())) {
            newErrors.phone = "Please enter a valid 10-digit phone number";
            isValid = false;
        } else {
            newErrors.phone = "";
        }

        // Checkbox validation
        if (!field.checkbox) {
            newErrors.checkbox = "Please accept the terms and conditions";
            isValid = false;
        } else {
            newErrors.checkbox = "";
        }

        setErrors(newErrors);
        return isValid;
    };

    const submitForm = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            field.course = coursename;
            try {
                await brochureForm(field);
                // Reset form fields
                setField({
                    name: "", phone: "", course: coursename, checkbox: false
                });

                // Display thank you message
                setThankYouMessage("Syllabus Download Successful. Thank you!");

                // Clear thank you message after 5 seconds
                setTimeout(() => {
                    setThankYouMessage("");
                }, 5000);

                // Clear form elements
                const form = formRef.current;
                if (form) {
                    form.reset();
                }
            } catch (error) {
                // Handle errors here if needed
               return false
            }
        }
    };

    return (
        <>
            <div className="col-md-4" id="downloadSyllabus">
                <div className="edu-card card-type-7 radius-small">
                    <div className="inner">
                        <div className="container checkout-page-style" style={{ padding: "0" }}>
                            <div className="login-form-box">
                                <h6 className="mb-30">Download Curriculum</h6>
                                <form className="login-form" onSubmit={submitForm} id="downloadSyllabus_java" ref={formRef}>
                                    <div className="input-box mb--20">
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            name="name"
                                            id="name7"
                                            value={field.name}
                                            onChange={handelChange}
                                        />
                                        {errors.name && <span className="error-message red">{errors.name}</span>}
                                    </div>
                                    <div className="input-box mb--20">
                                        <input
                                            type="tel"
                                            id="phone7"
                                            className="phone-input"
                                            name="phone"
                                            placeholder="Mobile Number"
                                            value={field.phone}
                                            onChange={handelChange}
                                        />
                                        {errors.phone && <span className="error-message red">{errors.phone}</span>}
                                    </div>
                                    <Tnc id={"checkbox-7"} field={field} setField={setField} errors={errors} />

                                    <button className="rn-btn edu-btn w-100 mb--20" type="submit">
                                        <span>Download Curriculum</span>
                                    </button>
                                </form>
                                {thankYouMessage && (
                                    <div className="text-center" id="message">
                                        {thankYouMessage}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
