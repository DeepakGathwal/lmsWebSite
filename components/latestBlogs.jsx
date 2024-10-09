"use client"
import React from 'react'
import Link from 'next/link';
import { FaArrowRight } from "react-icons/fa6";
import Image from 'next/image';
import LatestBlogHeading from './latestBlogHeading';

export default function LatestBlogs() {
   
  return (
    <>
      
      <div className="eduvibe-home-two-blog edu-blog-area edu-section-gap bg-image">
            <div className="wrapper">
                <div className="container eduvibe-animated-shape">
                    <div className="row g-5">
                        <div className="col-xs-6 col-lg-6 col-md-6">
                            <div className="section-title text-start">
                                <span className="pre-title">Always Smart to Read Blogs</span>
                                <h3 className="title tg-svg">Latest <span className="position-relative color-primary"><span className="svg-icon" id="svg-3"><svg width="100%" height="100%" viewBox="0 0 145 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.00016 15.2711C18.1407 8.34427 70.832 -1.93441 144.473 12.3652" stroke="currentcolor" strokeWidth="4" ></path>
                                <path d="M26.2943 14.0041C38.9177 9.44643 77.3772 3.50055 130.227 16.1786" stroke="currentcolor" strokeWidth="2" ></path>
                                </svg></span>Blog</span></h3>
                            </div>
                        </div>
                        <div className="col-xs-6 col-lg-6 col-md-6">
                        <div className="view-more-btn text-end">
                           <Link href='/blog' className="edu-btn" prefetch>
                                Browse All Blogs  <FaArrowRight />
                           </Link>
                          
                        </div>
                    </div>
                    </div>
                    <LatestBlogHeading />
                       


                    <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
                        <div className="shape-image shape-image-1">
                            <Image src="assets/images/shapes/shape-13-06.png" alt="Shape Thumb" width={97} height={117}/>
                        </div>
                        <div className="shape-image shape-image-3">
                            <Image src="assets/images/shapes/shape-13-05.png" alt="Shape Thumb" width={57} height={62}/>
                        </div>
                        <div className="shape-image shape-image-4">
                            <Image src="assets/images/shapes/shape-25.png" alt="Shape Thumb" width={127} height={141}/>
                        </div>
                    </div>

                </div>

                <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
                    <div className="shape-image shape-image-2">
                        <Image src="assets/images/shapes/shape-24.png" alt="Shape Thumb" width={180} height={180}/>
                    </div>
                </div>
            </div>
        </div>
      
    </>
  )
}

