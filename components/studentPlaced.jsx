"use client"
import { homeCompany } from '@/lib/apis';
import React, { useRef, useState, useEffect } from 'react';
import Slider from "react-slick";
import Image from 'next/image';

export default function StudentPlaced() {
    const [state, setState] = useState([])
    const allData = async () => {
        const {data} = await homeCompany();
     
       return setState(data)
    }
    useEffect(() => {
        allData()
    }, [])
    let sliderRef = useRef(null);
    
    var settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <>

            <div className="eduvibe-home-five-course slider-dots edu-course-area edu-section-gapTop edu-section-gapBottom bg-image">
                <div className="container eduvibe-animated-shape">
                    <div className="row g-5">
                        <div className="col-lg-6 col-md-12">
                            <div className="section-title text-start">
                                <span className="pre-title">Companies</span>
                                <h3 className="title tg-svg">JTC <span className="position-relative color-primary"><span className="svg-icon" id="svg-3"><svg width="100%" height="100%" viewBox="0 0 145 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.00016 15.2711C18.1407 8.34427 70.832 -1.93441 144.473 12.3652" stroke="currentcolor" strokeWidth="4" ></path>
                                    <path d="M26.2943 14.0041C38.9177 9.44643 77.3772 3.50055 130.227 16.1786" stroke="currentcolor" strokeWidth="2" ></path>
                                </svg></span>Candidate</span> Placed</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row g-5 mt--10">
                        <div className="col-lg-12">
                            <div className="slick-activation-wrapper course-activation-3 edu-slick-button">
                                <Slider ref={slider => {
                                    sliderRef = slider;
                                }} {...settings}>

                                    {state && state.map((el, i) => (
                                        <div key={i} className="single-slick-card">
                                            <div className="edu-card card-type-5 radius-small">
                                                <div className="inner">
                                                    <Image src={el.icon} alt="companies" width={36} height={49}/>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </Slider>
                            </div>
                        </div>
                    </div>

                    <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
                        <div className="shape-image shape-image-1">
                            <Image src="assets/images/shapes/shape-13-10.png" alt="Shape Thumb" width={143} height={130}/>
                        </div>
                        <div className="shape-image shape-image-3">
                            <Image src="assets/images/shapes/shape-15-03.png" alt="Shape Thumb" width={76} height={47}/>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}
