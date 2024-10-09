import React,{useState, useEffect} from 'react'
import { allBatches } from '@/lib/apis';
import { FaRegClock , FaArrowRight} from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import Batchenroll from './batchenroll';

export default function Batches({coursename, router}) {
    const [state, setState]  = useState([])
    const [id, setId] = useState(null)
    const [course, setcourse] = useState(null)
    const [show, setShow] = useState(false)
    const allData = async() => {
        const {data} = await allBatches(coursename)
        return data &&  setState(data)
        // return  data  ? setState(data) : router.push('/')
        }

    const batchenrollshow = (id,course) => {
        setShow(true)
        setId(id)
        setcourse(course)
    }
      
useEffect(() => {
    allData()
},[coursename])

  return (
    <div className="edu-elements-area edu-section-gap edu-section-gapTop bg-color-white">
    <div className="container">
        <div className="row" id="upcomingBatches">
            <div className="section-title white-title">
                <h3 className="title tg-svg pb--40">JTC Upcoming <span className="position-relative color-primary"><span
                            className="svg-icon" id="svg-2"><svg width="100%" height="100%" viewBox="0 0 145 25"
                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.00016 15.2711C18.1407 8.34427 70.832 -1.93441 144.473 12.3652"
                                    stroke="currentcolor" strokeWidth="4"
                                    ></path>
                                <path d="M26.2943 14.0041C38.9177 9.44643 77.3772 3.50055 130.227 16.1786"
                                    stroke="currentcolor" strokeWidth="2"
                                    ></path>
                            </svg></span>Batches</span> </h3>
            </div>
        </div>
        <div className="row g-5 justify-content-center">
            {state && state.map((el, i) => (
            <div key={i} className="col-lg-12" >
                <div className="row section-hover">
                    <div className="col-lg-2">
                        <div className="edu-event event-list1 radius-small">
                            <div className="inner">

                                <div className="badge">{el.status !=  "Available" && el.status}</div>
                                <div className="batchdate" id="ID4">
                                    <div className="txtdate w-100">
                                        <h5 className="title">{el.date}
                                        <sup>{el.formatted_date}</sup>
                                        </h5>
                                        
                                    </div>
                                    <div className="w-100">
                                        <p className="text-center mr-9">{el.monthYear}</p>
                                    </div>
                                </div>
                            </div>	
                        </div>
                    </div>
                    <div className="col-lg-10">
                        <div className="edu-event event-list radius-small">
                            <div className="inner">
                                <div className="content">
                                    <div className="content-left">
                                        <h5 className="title">{el.cource}</h5>
                                        <ul className="event-meta">
                                            <li id="ID5"><FaRegClock className='clr-org'/> {el.time_to} to {el.time_from}</li>
                                            <li><IoLocationOutline className='clr-org'/>offline/online</li>
                                            <li id="ID6"><SlCalender className='clr-org'/>{el.week_days}</li>
                                        </ul>
                                    </div>
                                    <div className="read-more-btn">
                                        <button className="edu-btn popup-btn" onClick={(e, i) => batchenrollshow(el.id, el.cource)}>Enroll Now <FaArrowRight /></button>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>

            ))}
        </div>
        {show && <Batchenroll show={show} setShow={setShow} id = {id} course={course}/>}
    </div>
</div>
  )
}
