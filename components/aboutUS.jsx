'use client'
import React,{useState, useEffect} from 'react'
import { IoRibbon } from "react-icons/io5";
import { FaBookOpen, FaCalendarAlt, FaInfinity, FaRegSmile } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { componentData } from '@/lib/apis';
import { Image } from 'react-bootstrap';

export default function AboutUS(){
    const [state, setState] = useState([])

    const allData = async() => {
        const {data} = await componentData("about");
       const value = data && data[0]

        return value && setState(value)
      }

   
      useEffect(() => {
        allData()
      },[])

  return (
    <>
      <div className="edu-about-area about-style-3 edu-section-gap edu-section-gapTop edu-section-gapBottom bg-white">
            <div className="container eduvibe-animated-shape">
                <div className="row g-5 align-items-center">
                    <div className="col-lg-6 pr--80">
                        <div className="gappery-wrapper">
                            <div className="row g-5 align-items-end">
                                <div className="col-lg-5 col-md-6">
                                    <div className="gallery-image mt--85">
                                        <Image className="w-100" width={100} height={100} src={state && state.images && state.images.split("==,")[0] } alt="Gallery Images"/>
                                        <div className="icon-badge">
                                            <IoRibbon/>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-7 col-md-6">
                                    <div className="gallery-image">
                                        <Image className="w-100" width={100} height={100} src={state && state.images && state.images.split("==,")[1] } alt="Gallery Images"/>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="gallery-image gallery-image-3 text-center">
                                        <Image className="w-100" width={100} height={100} src={state && state.images && state.images.split("==,")[2] } alt="Gallery Images"/>
                                        <div className="student-like-status bounce-slide">
                                            <div className="inner">
                                                <div className="icon">
                                                    <FaRegSmile/>
                                                </div>
                                                <div className="content">
                                                    <h6 className="title">12K</h6>
                                                    <span className="subtitle">Total Students</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="inner">
                            <div className="section-title text-start" data-sal-delay="200" data-sal="slide-up" data-sal-duration="800">
                                <span className="pre-title">{state?.section}</span>
                                <h3 className="title">{state?.heading}</h3>

                            <p className="description mt--40" data-sal-delay="200" data-sal="slide-up" data-sal-duration="800">{state?.details}</p>
                            </div>
                            <div className="feature-style-5 row g-5">
                                <div className="col-lg-12 col-xl-6" data-sal-delay="200" data-sal="slide-up" data-sal-duration="800">
                                    <div className="edu-feature-list">
                                        <div className="icon">
                                            <FaCalendarAlt/>
                                        </div>
                                        <div className="content d-flex justify-content-center align-items-center">
                                            <h6 className="title">Flexible Classes</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-xl-6" data-sal-delay="200" data-sal="slide-up" data-sal-duration="800">
                                    <div className="edu-feature-list">
                                        <div className="icon">
                                            <MdSupportAgent/>
                                        </div>
                                        <div className="content d-flex justify-content-center align-items-center">
                                            <h6 className="title">Educator Support</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-xl-6" data-sal-delay="200" data-sal="slide-up" data-sal-duration="800">
                                    <div className="edu-feature-list">
                                        <div className="icon">
                                        <FaBookOpen className="icon-browser"/>
                                        </div>
                                        <div className="content d-flex justify-content-center align-items-center">
                                            <h6 className="title">Broad Selection</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-xl-6" data-sal-delay="200" data-sal="slide-up" data-sal-duration="800">
                                    <div className="edu-feature-list">
                                        <div className="icon">
                                            <FaInfinity className='icon-Lock' />
                                        </div>
                                        <div className="content d-flex justify-content-center align-items-center">
                                            <h6 className="title">Lifetime Acces</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="read-more-btn mt--60 mt_lg--30 mt_md--30 mt_sm--30" data-sal-delay="200" data-sal="slide-up" data-sal-duration="800">
                                <a className="edu-btn" href="about-us-1.html">Learn More <i className="icon-arrow-right-line-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
                    <div className="shape-image shape-image-1">
                        <Image  width={100} height={100} src={"assets/images/shapes/shape-21.png"} alt="Shape Thumb" />
                    </div>
                    <div className="shape-image shape-image-2">
                        <Image  width={100} height={100} src={"assets/images/shapes/shape-13-04.png"} alt="Shape Thumb" />
                    </div>
                    <div className="shape-image shape-image-3">
                        <Image width={100} height={100} src={"assets/images/shapes/shape-03-05.png"} alt="Shape Thumb" />
                    </div>
                    <div className="shape-image shape-image-4">
                        <Image width={100} height={100} src={"assets/images/shapes/shape-15-02.png"} alt="Shape Thumb" />
                    </div>
                </div>

            </div>
        </div>
    </>
  )
}
