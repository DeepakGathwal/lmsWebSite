'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { RiFolderVideoLine, RiTimeLine } from 'react-icons/ri';
import { ProgressBar } from 'react-bootstrap'
import { buyProduct } from '@/lib/apis';


export default function ProfileLeaning () {
    const [state, setState] = useState([])
   
    const paymetDetails =  async() => {
        const {data} =  await buyProduct()
        return data && setState(data)
    }

      useEffect(() => {
        paymetDetails()
      },[])



  return (
    <div className='course-details-card'>
    <h5 className="title">My Learning</h5>
        <div className="row g-5">

            {state && state.map((el, i) => (
            <div key={i} className="edu-card card-type-4 radius-small">
                <div className="inner">
                    <div className="thumbnail">
                        <Link href={`/course/${el.java}`} prefetch>
                            <Image className="w-100" src={el.image} alt="Course Meta" width={100} height={100} />
                        </Link>
                        <div className="top-position status-group left-top">
                            <span className="eduvibe-status status-01">{el.label}</span>
                        </div>
                       
                        <div className="bottom-position status-group right-bottom">
                            <span className="eduvibe-status status-01"> {el.category}
                            </span>
                        </div>
                    </div>
                    <div className="content">
                        <div className="card-top">
                            <div className="author-meta">
                              
                            </div>
                        </div>
                        <ul className="edu-meta meta-03">
                            <li className="meta-lessons"><RiFolderVideoLine />{el.total_videos} Lessons</li>
                            <li className="meta-clock"><RiTimeLine />{el.videoTime}</li>
                            
                        </ul>
                        <h6 className="title">{el.name}
                        </h6>
                            <ProgressBar now={`${parseInt((el.total * 100) / el.videos)}%`} label={`${parseInt((el.total * 100) / el.videos)}%`}/>
                        </div>
                </div>
            </div>

            ))}

            <p>No Course Purchased</p>
        </div>
    </div>
  )
}
