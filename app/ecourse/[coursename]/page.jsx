'use client'
import React, { useContext, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Script from 'next/script'
import { BsCartDashFill, BsCartPlus } from "react-icons/bs";
import { RiBarChart2Line, RiFolderVideoLine, RiHeartFill, RiHeartLine, RiStarFill, RiTimeLine } from 'react-icons/ri'
import { LiaFileDownloadSolid } from "react-icons/lia";
import { PiCertificate } from 'react-icons/pi'
import { cartItems, singlecourse } from '@/lib/apis';

import CourceLearn from '@/components/courseLearn';
import Requirments from '@/components/courserequirments';
import CourceFaqs from '@/components/courseFaqs';
import CourseCurriculam from '@/components/courseCurriculam';
import CourceReview from '@/components/courseReview';
import { adding,  processPayment } from '@/functions/commonFunctions'
import { AccountContext } from '@/apis/apicontext'

export default function Page () {

  const [state, setState] = useState([])
  const router = useRouter()
  const { addRemove } = useContext(AccountContext)
  const param = useParams()
  const { coursename } = param


  const allData = async () => {
    const value = await cartItems()
    const cartItemsData = await value &&  await value.data
    const { data } = await singlecourse(coursename)
    
    data && cartItemsData && cartItemsData != "Login First" && cartItemsData.map((av) => {

      if (data[0].id == av.courseId && av.cart === "Cart") return data[0].cartStatus = 1

      if (data[0].id == av.courseId && av.cart === "Wish") return data[0].wishStatus = 1


    })


    return data && setState(...data)
  }

  const BannerStyle = {
    backgroundImage: `url(/assets/images/bg/breadcrumb-bg.jpg)`,
    height: "290px",
  }


  useEffect(() => {
    allData()
  }, [coursename])

  const addOnCart = async (about, ab) => {
    const { data } = await adding(about, ab.id)
    if (data == 'Login First') 
      return router.push("/authorization")
    
    else {
      if (about == "cart" && !state.cartStatus) {

        state.cartStatus = 1
      }
      else if (about == "cart" && state.cartStatus == 1) {

        delete state.cartStatus
      }
      if (about == "whishlist" && state.wishStatus == 1) {

        delete state.wishStatus
      }
      else if (about == "whishlist" && !state.wishStatus) {

        state.wishStatus = 1
      }


      await addRemove({ type: "INCR" });
      return state && setState(state)

    }

  }

  const doPayment = async (e) => {
    const data = await processPayment(e, state)
    if (data == 'Login First')
      return router.push("/authorization")


    else if (data > 0) return router.push(`/course/${coursename}`)
  }



  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="edu-breadcrumb-area breadcrumb-style-1 ptb--40 ptb_md--40 ptb_sm--40" style={BannerStyle}>
        <div className="container eduvibe-animated-shape">
          <div className="row">
            <div className="col-lg-8 col-md-8">
              <div className="breadcrumb-inner e-commerce text-start">
                <div className="page-title">
                  <h3 className="title">{state?.name}</h3>
                  <span className="title">{state?.category}</span>

                  <div className="author-meta">
                   

                    <div className="edu-rating rating-default">
                      <div className="rating">
                        {state?.rating && parseInt(state.rating, 10) > 0 ? (
                          [...Array(parseInt(state.rating, 10))].map((_, index) => (
                            <React.Fragment key={index}>
                              <RiStarFill />

                            </React.Fragment>
                          ))
                        ) : (
                          <React.Fragment>
                            <RiStarFill />
                            &nbsp;
                          </React.Fragment>
                        )}
                      </div>
                      <span className="rating-count">({state?.rating ? parseFloat(state?.rating) : 0})</span>
                      <span className="rating-count">({state?.review  ? state?.review  : 0  + " Review"})</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="edu-course-details-area bg-color-white edu-section-gapBottom e-commerce">
        <div className="container">
          <div className="row g-5">
            <div className="col-xl-8 col-lg-7">
              <div className="course-details-content">
                <div className="course-details-card e-commerce">
                  <div className="course-content">
                    <h5>Course Overview</h5>
                    {state?.description}
                    <br />
                    {/* What we learn from cource */}
                    {state && <CourceLearn id={state?.id} />}
                  </div>
                </div>
                <div className="course-details-card e-commerce mt--40">
                  <div className="course-content">
                    <h5>Course Curriculam</h5>
                    {state && <CourseCurriculam id={state?.id} />}

                  </div>
                </div>
                {/* Requirement to learn this cource */}
                <div className="course-details-card e-commerce mt--40">
                  <div className="course-content">
                    <h5>Prerequisits</h5>
                    {state && <Requirments id={state?.id} />}
                  </div>
                </div>
                {/* Course Instructur  */}
               
                {/* Cources Faq's */}
                <div className="course-details-card e-commerce mt--40">
                  <div className="course-content">
                    <h5>FAQ&apos;s</h5>
                    {state && <CourceFaqs id={state?.id} />}
                  </div>
                </div>
                {/* Cources Reviews */}
                <div className="course-details-card e-commerce mt--40">
                  <div className="course-content">
                    <h5>Reviews</h5>
                    {state && <CourceReview id={state?.id} />}
                  </div>
                </div>

              </div>
            </div>

            <div className="col-xl-4 col-lg-5">
              <div className="eduvibe-sidebar course-details-sidebar e-commerce">
                <div className="inner">
                  <div className="eduvibe-widget e-commece">
                    <div className="video-area">
                      <div className="thumbnail video-popup-wrapper">
                        <embed src={state?.video_link} type="video/webM" width="330" height="250" />
                      </div>

                    </div>
                    <div className="eduvibe-widget-details mt--15">
                      <div className="widget-content">
                        <div className="d-flex justify-content-between">
                          <div className="price-list price-style-02">
                            <div className="price current-price">&#8377;{state && parseInt(state.total_price * ((100 - state.discount) / 100))}</div>
                            <div className="price old-price">&#8377; {state?.total_price}</div>
                          </div>
                          <div className="wishlist-top-right">
                            <button className="wishlist-btn" onClick={(e, i) => addOnCart("whishlist", state)}>{state?.wishStatus == 1 ? <RiHeartFill /> : <RiHeartLine />}</button>

                          </div>
                        </div>
                        <div className="read-more-btn mt--15 mb--15 d-flex justify-content-between">

                          <button className="edu-btn btn-bg-alt text-center" type="button" onClick={(e) => doPayment(e)}>Buy Now</button>
                          <button className='edu-btn text-center course-cart-btn' onClick={(e, i) => addOnCart("cart", state)}>{state?.cartStatus == 1 ? <BsCartDashFill /> : <BsCartPlus />}</button>

                        </div>
                        <ul>
                          <li><span><RiTimeLine />Duration</span><span>{state?.videoTime}</span></li>

                          <li><span><RiFolderVideoLine />Lessons</span><span>{state?.total_videos}</span></li>

                          <li><span><RiBarChart2Line /> Skill Level</span><span>{state?.label}</span></li>

                          <li><span><LiaFileDownloadSolid className="icon-artboard-line" /> Resources</span><span>{state?.total_resourses}</span></li>

                          <li><span><PiCertificate />Certificate</span><span>{state?.certificates == 1 ? "Yes" : "No"}</span></li>

                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </>
  )
}
