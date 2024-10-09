'use client'
import React, { useState, useEffect, useContext } from 'react'
import { adding, addOnCartFunction, allCartItems, processPayment } from '@/functions/commonFunctions';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { AccountContext } from '@/apis/apicontext';
import CourseCard from './courseCard';

export default function Courses() {
    const router = useRouter()
    const { addRemove, initalState } = useContext(AccountContext)
    const [state, setState] = useState([])



    const allData = async () => {
        const cartItems = await allCartItems(0)
        return cartItems && setState(cartItems)
    }

    useEffect(() => {
        allData()
    }, [initalState])

    const bannerStyle = {
        // backgroundImage: `url(../../bg/home-two-about-us.jpg)`,
        backgroundColor: 'white',
        // position: 'relative',
        // zIndex: 2,
    };


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



    const doPayment = async (e, ab) => {
        const data = await processPayment(e, ab)
        if (data == 'Login First') {
            return router.push("/authorization")
        }
        else if (data > 0) return router.push(`/course/${e.link}`)
    }

    return (
        <>
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />

            <div className="edu-course-area eduvibe-home-three-course  bg-image edu-section-gap" style={bannerStyle}>
                <div className="container eduvibe-animated-shape">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title text-center" >
                                <span className="pre-title">Popular Courses</span>
                                <h3 className="title">Our Popular Courses</h3>
                            </div>
                        </div>
                    </div>

                    <div className="row g-5 mt--25">

                        {state && state.map((ab, i) => (

                            <div key={i} className="col-12 col-sm-12 col-xl-4 col-md-6">

                                <CourseCard ab={ab} addOnCart={addOnCart} doPayment={doPayment} />

                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </>
    )
}

