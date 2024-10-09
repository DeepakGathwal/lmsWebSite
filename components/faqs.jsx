"use client"
import React,{useState, useEffect} from 'react';
import Image from "next/image";
import Accordion from 'react-bootstrap/Accordion';
import { courseFaqs } from '@/lib/apis';
import "../styles/faq.css";
import { IoCall } from "react-icons/io5";


export default function Faqs({coursename, router}) {
    const [state, setState] = useState([])

	const allFaqs = async() => {
		const {data} = await courseFaqs(coursename)
		return data &&  setState(data)
		// return data  ? setState(data) : router.push('/')
	}

	useEffect(() => {
	allFaqs()
	},[coursename])
    return (
        <>
            <div className="edu-accordion-area eduvibe-faq-page accordion-shape-1 edu-section-gap bg-color-white">
				<div className="wrapper">
					<div className="container eduvibe-animated-shape">
						<div className="row">
							<div className="col-lg-12">
								<div className="section-title white-title sal-animate text-center" 
									data-sal="slide-up" data-sal-duration="800">
									<span className="pre-title">Get General Answers</span>
									<h3 className="title tg-svg">FAQ <span className="position-relative color-primary"><span
										className="svg-icon" id="svg-2"><svg width="100%" height="100%" viewBox="0 0 145 25"
											fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M1.00016 15.2711C18.1407 8.34427 70.832 -1.93441 144.473 12.3652"
												stroke="currentcolor" strokeWidth="4"
											></path>
											<path d="M26.2943 14.0041C38.9177 9.44643 77.3772 3.50055 130.227 16.1786"
												stroke="currentcolor" strokeWidth="2"
											></path>
										</svg></span>Questions</span></h3>
								</div>
							</div>
						</div>



						<div className="tab-content" id="eduTabContent">
							<div className="tab-pane fade show active" id="edutabone" role="tabpanel"
								aria-labelledby="edutabone-tab">
								<div className="row g-5 mt--20">
										
											<div className='col-md-8'>
									<div className="accordion-style-2 acc-section">
                                                <Accordion>
                                                {state && state.map((el, i) =>(
												<Accordion.Item key={i} eventKey={el.id}>
													<Accordion.Header>{el.point}</Accordion.Header>
													<Accordion.Body>{el.description}
													</Accordion.Body>
												</Accordion.Item>
										
											))}
                                                </Accordion>
											</div>
									</div>
											<div className='col-md-4'>
												<div className="col-flex connectus">
                                                    <h3>Having any Queries?</h3>
                                                    <div className="fig">
                                                        <Image src="/assets/images/icons/connect-icon.svg" className='hello-call' alt="hello call us" width={20} height={20} />
                                                    </div>
                                                    <p>Connect with us</p>
                                                    <a href="tel:09990699111" >
                                                        <IoCall /> +91-999-0699-111
                                                    </a>
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
};
