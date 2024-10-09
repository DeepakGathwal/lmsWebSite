'use client'
import React, { useState, useEffect, useContext } from 'react'
import { FaArrowLeft, FaArrowRight,  } from 'react-icons/fa';
import Slider from 'react-slick';
import { adding, addOnCartFunction, allCartItems, processPayment } from '@/functions/commonFunctions';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { AccountContext } from '@/apis/apicontext';
import CourseCard from './courseCard';

export default function CoursesByID({id}) {
    const router = useRouter()
    const {addRemove, initalState} = useContext(AccountContext)
    const [state, setState] = useState([])
    
  

    const allData = async () => {
        const cartItems = await  allCartItems(id)

        return cartItems && setState(cartItems)
    }
    useEffect(() => {
        allData(id)
    }, [id, initalState])

  
    const SamplePrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <button
                className={`${className} slide-arrow prev-arrow`}
                style={{ ...style }}
                onClick={onClick}
            >
                <FaArrowLeft />
            </button>
        );
    }

    
    const SampleNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <button
                className={`${className} slide-arrow next-arrow`}
                style={{ ...style }}
                onClick={onClick}
            >
                <FaArrowRight />
            </button>
        );
    }


    const addOnCart = async (about, ab) => {
        const { data } = await adding(about, ab.id)
        if (data == 'Login First') 
            return router.push("/authorization")
        else {
            const value =  await addOnCartFunction(about, ab, state)
            await addRemove({ type: "INCR" });
            return value && setState(value)
        }

    }
   

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500,
        arrows: true,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 577,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };


    const doPayment = async (e, ab) => {
        const data = await processPayment(e, ab)
        if (data == 'Login First') 
            return router.push("/authorization")
        
        else if(data > 0) return router.push(`/course/${e.link}`)
    }



    return (
        <>
 <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

<div className="row">
                    <div className="col-lg-12 mt--40 mb_dec--20 slick-activation-wrapper service-activation-item5 edu-slick-arrow-top">
                        {state.length >= 4 ? (
                            <Slider {...settings}>
                                {state.map((item, i) => (
                                   <CourseCard key={i} ab={item} addOnCart={addOnCart} doPayment={doPayment}/>
                                ))}
                            </Slider>
                        ) : (
                            <div className="row">
                                {state.map((item, i) => (
                                    <div key={i} className="col-lg-4 col-md-6 mb-4">
                                       <CourseCard ab={item} addOnCart={addOnCart} doPayment={doPayment}/>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
        </>
    )
}
