"use client"
import React, { useState, useEffect } from 'react';
import { homeCourses, enquiryForm } from '@/lib/apis';
import Image from 'next/image';
import Link from 'next/link';

export default function BannerAreaHome() {
    const [state, setState] = useState([]);
    const [check, setCheck] = useState(false);
    const [field, setField] = useState({
        name: "",
        phone: "",
        course: "",
        email: ""
    });
    const [errors, setErrors] = useState({
        name: "",
        phone: "",
        course: "",
        email: "",
        checkbox: ""
    });
    const [submitted, setSubmitted] = useState(false);

    const texts = [
        "Start Better Learning Future From Here",
        "Dive into a World of Learning Excellence",
        "Begin Your Educational Journey Here",
        "Embark on a Journey of Excellence"
    ];

    const [index, setIndex] = useState(0);

    const allData = async () => {
        const { data } = await homeCourses();
        return data && setState(data);
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

    const handelChange = (e) => {
        setField({ ...field, [e.target.name]: e.target.value });
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

            if (data.success === true) {
                setSubmitted(true);
                setTimeout(() => {
                    setSubmitted(false);
                }, 5000);
            } else {
                // Handle error message from the API if needed
            }
        }
    };

    useEffect(() => {
        allData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    
    return (
        <>
            <div className="slider-area banner-style-1 bg-white height-650 d-flex align-items-center" >
                <div className="container eduvibe-animated-shape">
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-12 col-xl-6 my-4 forTablet">
                            <div className="inner">
                                <div className="content">
                                    <span className="pre-title" id="changingPreTitle">Your Future Starts Now</span>
                                    <h1 className="title" id="changingTitle">{texts[index]}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 col-xl-6 banner-right-content forTablet">
                            <div className="row g-5">
                                <div className="col-lg-9 col-md-6 col-sm-6 offset-lg-3 mob-justify">
                                    <div className="edu-card card-type-6 radius-small">
                                        <div className="inner">
                                            <div className="container checkout-page-style">
                                                <div className="login-form-box">
                                                    {!submitted ? (
                                                        <>
                                                            <h3 className="mb-30">Get in Touch</h3>
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
                                                                    <input type="checkbox" id="checkbox-6" name="checkbox" checked={check} onChange={() => setCheck(!check)} />
                                                                    <label htmlFor="checkbox-6">I accept the <Link href="/termsandcondition" prefetch>Terms &#38; Conditions</Link>.</label>
                                                                    {errors.checkbox && <span className="error-message red">{errors.checkbox}</span>}
                                                                </div>
                                                                <button className="rn-btn edu-btn w-100 mb--20" type="submit">
                                                                    <span>Enquire Now</span>
                                                                </button>
                                                            </form>
                                                        </>
                                                    ) : (
                                                        <div className="thank-you-message">
                                                            <h3>Thank you for showing your interest!</h3>
                                                            <p>We will get back to you soon.</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
                        <div className="shape shape-1"> <Image src="/assets/images/shapes/shape-01.png" alt="Shape Thumb" width={25} height={25} /></div>
                        <div className="shape shape-2"><Image src="/assets/images/shapes/shape-02.png" alt="Shape Thumb" width={52} height={58} /></div>
                        <div className="shape shape-3"><Image src="/assets/images/shapes/shape-03.png" alt="Shape Thumb" width={66} height={53} /></div>
                        <div className="shape shape-4"><Image src="/assets/images/shapes/shape-04.png" alt="Shape Thumb" width={113} height={150} /></div>
                        <div className="shape shape-5"><Image src="/assets/images/shapes/shape-05.png" alt="Shape Thumb" width={30} height={30} /></div>
                    </div>
                </div>
            </div>
        </>
    );
}
