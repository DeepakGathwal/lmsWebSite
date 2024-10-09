"use client"
import Image from "next/image";
import React from "react";
import { FaArrowRight, FaInfinity, FaClock, FaGraduationCap, FaBookOpen } from 'react-icons/fa';
export default function OurServices (){

    // Custom prev and next buttons
    const PrevArrow = (props) => {
        const { onClick } = props;
        return (
            <button className="slick-prev" onClick={onClick}>
                Previous
            </button>
        );
    };

    const NextArrow = (props) => {
        const { onClick } = props;
        return (
            <button className="slick-next" onClick={onClick}>
                Next
            </button>
        );
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />
    };

    return (
        <>
            <div className="eduvibe-home-four-service edu-service-area edu-section-gap bg-color-white position-relative border-bottom-1">
                <div className="container eduvibe-animated-shape">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title text-center" >
                                <span className="pre-title">See What We Have</span>
                                <h3 className="title">Learn When You Want,<br />Where You Want</h3>
                            </div>
                        </div>
                    </div>


                <div className="row eduvibe-about-one-service g-5 mt--20">

                    <div className="col-lg-3 col-md-6 col-12" >
                        <div className="service-card service-card-3 text-left shape-bg-1 bg-grey">
                            <div className="inner">
                                <div className="icon">
                                    <a >
                                        <FaGraduationCap className="icon-Destination"/>
                                    </a>
                                </div>
                                <div className="content">
                                    <h6 className="title"><a >Expert Instructors</a></h6>
                                    <p className="description">Benefit from courses taught by industry professionals, ensuring high-quality and practical learning experiences.</p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="service-card service-card-3 text-left shape-bg-2 bg-grey">
                            <div className="inner">
                                <div className="icon">
                                    <a >
                                        <FaBookOpen className="icon-browser"/>
                                    </a>
                                </div>
                                <div className="content">
                                    <h6 className="title"><a >Broad Selection</a></h6>
                                    <p className="description">Explore a wide range of courses covering diverse topics to suit your interests and career goals.</p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12" >
                        <div className="service-card service-card-3 text-left shape-bg-3 bg-grey">
                            <div className="inner">
                                <div className="icon">
                                    <a >
                                        <FaInfinity className='icon-Lock' />
                                    </a>
                                </div>
                                <div className="content">
                                    <h6 className="title"><a >Lifetime Access</a></h6>
                                    <p className="description">Gain lifelong access to our courses, empowering you to learn freely, revisit content, and master new skills without time limits.</p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="service-card service-card-3 text-left shape-bg-4 bg-grey">
                            <div className="inner">
                                <div className="icon">
                                    <a >
                                        <FaClock className="icon-Settings"/>
                                    </a>
                                </div>
                                <div className="content">
                                    <h6 className="title"><a >Flexible Learning</a></h6>
                                    <p className="description">Learn at your own pace and convenience, fitting learning into your schedule wherever you are.</p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
                    <div className="shape-image shape-image-1">
                        <Image src="assets/images/shapes/shape-29.png" alt="Shape Thumb" width={100} height={100}/>
                    </div>
                    <div className="shape-image shape-image-2">
                        <Image src="assets/images/shapes/shape-03-06.png" alt="Shape Thumb" width={100} height={100}/>
                    </div>
                    <div className="shape-image shape-image-3">
                        <Image src="assets/images/shapes/shape-02-06.png" alt="Shape Thumb" width={100} height={100}/>
                    </div>
                    <div className="shape-image shape-image-4">
                        <Image src="assets/images/shapes/shape-19-02.png" alt="Shape Thumb" width={100} height={100}/>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
