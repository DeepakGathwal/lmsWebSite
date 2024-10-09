import React,{useState, useEffect} from 'react'
import { coursePoint } from '@/lib/apis'
import Image from 'next/image'

export default function CourceJoinPoint ({ coursename,router }) {
    const [state, setState] = useState([])
    const allData = async () => {
        const { data } = await coursePoint(coursename)
        return data &&  setState(data)
    // return  data  ? setState(data) : router.push('/')
    }
    useEffect(() => {
        allData()
    }, [coursename])
    return (
        <>
            <div className="section-title text-left sal-animate">
                <span className="pre-title sal-animate" >Why to</span>
                <h3 className="title tg-svg">Join This <span
                    className="position-relative color-primary"><span className="svg-icon"
                        id="svg-5"><svg width="100%" height="100%" viewBox="0 0 145 25"
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
                        </svg></span> Course</span> </h3>
            </div>
            <div className="learnCourse">
                {state && state.map((el, i) => (
                    <div key={i} className="details_boxs">
                        <div className="detail_icons">
                            <Image src={el.icon} alt={el.description} width={36} height={32}/>
                        </div>
                        <div className="details_cont">
                            <p>{el.description}
                            </p>
                        </div>
                    </div>

                ))}
            </div>
        </>
    )
}
