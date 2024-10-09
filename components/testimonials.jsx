"use client"
import React , {useRef, useState,useEffect} from 'react';
import { alltestimonials } from '@/lib/apis';
import Slider from "react-slick";
import Image from 'next/image';

export default function Testimonials() {
    const [state, setState] = useState([])
    const allData = async() => {
        const {data} = await alltestimonials();
     
        return setState(data)
      }

     
    let sliderRef = useRef(null);

    var settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        arrows: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }, 
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }, 
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
      };
      useEffect(() => {
        allData()
      },[])
  return (
    <>
      
     <div className="eedu-testimonial-area eduvibe-home-two-testimonial bg-color-white testimonial-card-box-bg edu-section-gap position-relative bg-image">
            <div className="container eduvibe-animated-shape">
                <div className="row g-5">
                    <div className="col-lg-12">
                    <div className="section-title text-left mb--20 mt--20">
                                    <span className="pre-title">Testimonials</span>
                                    <h3 className="title tg-svg">Our Student <span className="position-relative color-primary"><span className="svg-icon" id="svg-5"><svg width="100%" height="100%" viewBox="0 0 145 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.00016 15.2711C18.1407 8.34427 70.832 -1.93441 144.473 12.3652" stroke="currentcolor" strokeWidth="4" ></path>
                                    <path d="M26.2943 14.0041C38.9177 9.44643 77.3772 3.50055 130.227 16.1786" stroke="currentcolor" strokeWidth="2" ></path>
                                    </svg></span>Feedback</span> </h3>
                                </div>
                    </div>
                </div>

                <div className="edu-testimonial-activation testimonial-item-3 mt--40 edu-slick-button">
                <Slider ref={slider => {
          sliderRef = slider;
        }} {...settings}>
            {state && state.map((el, i) => (
                    <div key={i} className="testimonial-card-box">
                        <div className="inner">
                            <div className="client-info">
                                <div className="thumbnail">
                                    <Image src={el.image} alt={el.name} width={55} height={55}/>
                                </div>
                                <div className="content">
                                    <h6 className="title">{el.name}</h6>
                                </div>
                            </div>
                            <p className="description">{el.description}<a href={el.read_link} target="_blank">Read More...</a></p>
                        </div>
                    </div>

            ))}
                   
                </Slider>

                </div>

                <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
                    <div className="shape-image shape-image-1">
                        <Image src="/assets/images/shapes/shape-23.png" alt="Shape Thumb" width={59} height={116}/>
                    </div>
                    <div className="shape-image shape-image-2">
                        <Image src="/assets/images/shapes/shape-14-02.png" alt="Shape Thumb" width={77} height={80}/>
                    </div>
                </div>

            </div>
        </div>
   

    </>
  )
}
