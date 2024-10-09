"use client"
import React, { useEffect, useState } from 'react'
import Counter from './counter';
import Image from 'next/image';
import { allChoosingPoint } from '@/lib/apis';
export default function WhyChooseUs() {
    const [state, setState] = useState([])
    const countersConfig = [
        { initialValue: 0, finalValue: 12, intervalDuration: 100 },
        
      ];
      const countersConfig1 =[
        { initialValue: 0, finalValue: 50 },
        
      ]
      const countersConfig2 =[
        { initialValue: 1800, finalValue: 2000 },
        
      ]
      const countersConfig3 =[
        { initialValue: 0, finalValue: 50 },
        
      ]

      const allData = async() => {
        const {data} = await allChoosingPoint();
     
        return setState(data);
       
      }

      
      useEffect(() => {
        allData()
      },[])
return (
    <>
    
    <div className="eduvibe-home-two-counter edu-counterup-area counterup-wrapper-1 edu-section-gapBottom edu-section-gapTop">
            <div className="container eduvibe-animated-shape">
                <div className="row gy-5 align-items-center">
                    <div className="col-lg-6 mob-place">
                        <div className="page-flex for-mob g-5 pr--75 pr_md--0 pr_sm--0">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                <div className="edu-counterup">
                                    <div className="inner">
                                        <div className="icon">
                                            <Image src="assets/images/icons/year.png" alt="Icons Images"width={60} height={60}/>
                                        </div>
                                        <div className="content">
                                            <h3 className="counter">
                                            {countersConfig.map((config, index) => (
                                                <Counter key={index} {...config} />
                                            ))}
                                                +
                                            </h3>
                                            <span>Year ESTD.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                <div className="edu-counterup">
                                    <div className="inner">
                                        <div className="icon">
                                            <Image src="assets/images/icons/courses.png" alt="Icons Images"width={60} height={60}/>
                                        </div>
                                        <div className="content">
                                            <h3 className="counter"><span className="odometer" data-count="50">{countersConfig1.map((config, index) => (
                                                <Counter key={index} {...config} />
                                            ))}</span>+
                                            </h3>
                                            <span>Courses</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                <div className="edu-counterup">
                                    <div className="inner">
                                        <div className="icon">
                                            <Image src="assets/images/icons/students.png" alt="Icons Images"width={60} height={60}/>
                                        </div>
                                        <div className="content">
                                            <h3 className="counter">{countersConfig2.map((config, index) => (
                                                <Counter key={index} {...config} />
                                            ))}+
                                            </h3>
                                            <span>Students</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                <div className="edu-counterup">
                                    <div className="inner">
                                        <div className="icon">
                                            <Image src="assets/images/icons/companies.png" alt="Icons Images"width={60} height={60}/>
                                        </div>
                                        <div className="content">
                                            <h3 className="counter">{countersConfig3.map((config, index) => (
                                                <Counter key={index} {...config} />
                                            ))}+
                                            </h3>
                                            <span>Companies</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-lg-6 mob-place">
                        <div className="choose-us-2">
                            <div className="inner">
                                <div className="section-title text-left" >
                                    <span className="pre-title" >Worldwide Our Achievement</span>
                                    <h3 className="title tg-svg">Why <span className="position-relative color-primary"><span className="svg-icon" id="svg-5"><svg width="100%" height="100%" viewBox="0 0 145 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.00016 15.2711C18.1407 8.34427 70.832 -1.93441 144.473 12.3652" stroke="currentcolor" strokeWidth="4" style={{strokeDasharray: "146, 148", strokeDashoffset: "0"}}></path>
                                    <path d="M26.2943 14.0041C38.9177 9.44643 77.3772 3.50055 130.227 16.1786" stroke="currentcolor" strokeWidth="2" style={{strokeDasharray: "106, 108", strokeDashoffset: "0"}}></path>
                                    </svg></span>Choose</span> Us</h3>
                                </div>
                                <ul className="jtcWhy">
									
                                    {state && state.map((el, i) => (
                                        <li key={i}>{el.point}</li>
                                        
                                    ))}
								</ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
                    <div className="shape-image shape-image-1">
                        <Image src="assets/images/shapes/shape-04-01.png" alt="Shape Thumb" width={87} height={116}/>
                    </div>
                    <div className="shape-image shape-image-2">
                        <Image src="assets/images/shapes/shape-11.png" alt="Shape Thumb" width={101} height={88}/>
                    </div>
                </div>
            </div>
        </div>
    
    </>
  )
}
