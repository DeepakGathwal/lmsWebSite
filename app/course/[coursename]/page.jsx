"use client"
import React, { useEffect, useState } from 'react';
import Batches from '@/components/batches';
import SyllybusDownload from '@/components/syllybusDownload';
import Testimonials from '@/components/testimonials';
import CourceCategory from '@/components/courceCategory';
import CourceVideo from '@/components/courceVideo';
import { useParams, useRouter } from 'next/navigation'
import { courseData } from '@/lib/apis';
import CourceJoinPoint from '@/components/courceJoinPoint';
import Faq from '@/components/faqs';
import Image from 'next/image';


export default function Page () {
	const params = useParams()
	const router = useRouter()
	const [state, setState] = useState([])
	const { coursename } = params
	const allCourseData = async () => {
		const { data } = await courseData(coursename)
		return data &&  setState(...data)
	}

	useEffect(() => {
		allCourseData()
	}, [coursename])

	return (
		<>

			<div className="edu-breadcrumb-area breadcrumb-style-1 bg-image">
				<div className="container-fluid eduvibe-animated-shape">
					<div className="row">

						<div className="breadcrumb-inner text-start">
							<Image width={1520} height={212} src={  state && state.banner ? state.banner : '/assets/images/bg/breadcrumb-bg.jpg'} alt='' className='breadCrumb_banner' />
							<div className="page-title">
								<h3 className="title" id="c_name">{state && state.name}</h3>
							</div>

						</div>
					</div>


				</div>
			</div>
			<div className="edu-course-details-area edu-section-gap bg-color-white">
				<div className="container">
					<div className="row g-5">
						<div className="col-xl-8 col-lg-7">
							<div className="course-details-content">
								<div className="course-details-card">
									<div className="course-content">
										<div className="section-title white-title sal-animate">

											<h3 className="title tg-svg">Course <span
												className="position-relative color-primary"><span className="svg-icon"
													id="svg-2"><svg width="100%" height="100%" viewBox="0 0 145 25"
														fill="none" xmlns="http://www.w3.org/2000/svg">
														<path
															d="M1.00016 15.2711C18.1407 8.34427 70.832 -1.93441 144.473 12.3652"
															stroke="currentcolor" strokeWidth="4"
														>
														</path>
														<path
															d="M26.2943 14.0041C38.9177 9.44643 77.3772 3.50055 130.227 16.1786"
															stroke="currentcolor" strokeWidth="2"
														>
														</path>
													</svg></span> Overview</span></h3>
										</div>
										<p>{state && state.description}</p>
										<CourceJoinPoint coursename={coursename} router={router}/>
									</div>
								</div>
							</div>
						</div>

						<div className="col-xl-4 col-lg-5">
							<div className="eduvibe-sidebar course-details-sidebar">
								<div className="inner">
									<div className="eduvibe-widget">
										<div className="video-area">
											<div className="thumbnail video-popup-wrapper">
												<embed type="video/webm" src={state && state.video_link} width={320} height={200} />
											</div>
										</div>
										<CourceVideo coursename={coursename} router={router}/>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>

			<div className="eduvibe-home-two-counter edu-counterup-area counterup-wrapper-1 edu-section-gap bg-color-white">
				<div className="container eduvibe-animated-shape">
					<div className="section-title white-title sal-animate">

						<h3 className="title tg-svg" >Course <span className="position-relative color-primary"><span
							className="svg-icon" id="svg-2"><svg width="100%" height="100%" viewBox="0 0 145 25"
								fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M1.00016 15.2711C18.1407 8.34427 70.832 -1.93441 144.473 12.3652"
									stroke="currentcolor" strokeWidth="4"
								></path>
								<path d="M26.2943 14.0041C38.9177 9.44643 77.3772 3.50055 130.227 16.1786"
									stroke="currentcolor" strokeWidth="2"
								></path>
							</svg></span> Curriculum</span></h3>
					</div>
					<div className="course-details-card mt--40">

						<div className="">
							<div className="row justify-content-between align-items-center">
								<CourceCategory coursename={coursename} router={router} />
								<SyllybusDownload coursename={coursename}/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Batches coursename={coursename} router={router}/>

			<Testimonials />
			<Faq coursename={coursename} router={router}/>
			
		</>
	)
}
