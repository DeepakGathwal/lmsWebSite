"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { singleBlog } from '@/lib/apis'
import Image from 'next/image'
import { SlCalender } from "react-icons/sl";
import { SiOpenbadges } from "react-icons/si";

export default function Index(){
  const [state, setState] = useState([])
  const router = useParams()
  const {link} = router

  const allData = async()=>{
    const {data} = await singleBlog(link)
   return data &&  setState(data);
  }

  useEffect(() => {
    allData();
  },[link])

  return (
    <>
      {state && state.map((el,i) => (
        <>
        <div className="edu-breadcrumb-area breadcrumb-style-1 bg-image blog-detailed">
          <div className="container-fluid eduvibe-animated-shape">
            <div className="row">
                <div className="breadcrumb-inner text-start" style={{minHeight:'212px'}}>
                  <Image width={1500} height={100} src={el.banner} alt='' className='breadCrumb_banner' />
                  <div className="page-title">
                    <h3 className="title" id="c_name">{el.name}</h3>
                  </div>
              </div>
            </div>
			    </div>
		    </div>
        <div className="edu-blog-details-area edu-section-gap bg-color-white">
            <div className="container">
                <div className="row g-5">
                    <div className="col-lg-10 offset-lg-1">
                        <div className="blog-details-1 style-variation3">

                            <div className="content-blog-top">

                                <div className="content-status-top d-flex flex-wrap justify-content-between mb--30 align-items-center">
                                    <div className="status-group mt_sm--10">
                                        {/* <a href="https://jtcindia.org/blog" className="eduvibe-status status-05 color-primary w-600">Education</a> */}
                                        <span className="eduvibe-status status-05 color-primary w-600"><SiOpenbadges />&nbsp;{el.category}</span>
                                    </div>
                                    <ul className="blog-meta mt_sm--10">
                                    <li><SlCalender />&nbsp;{el.addedAt}</li>
                                    </ul>
                                </div>

                                <h4 className="title">{el.name}</h4>

                                <div className="thumbnail block-alignwide blog-thumb-banner">
                                    <Image className="radius-small w-100 mb--30" src={el.icon} alt="Blog Images" width={40} height={40}/>
                                </div>
                            </div>

                            <div className="blog-main-content">
                                <blockquote className="blockquote-style-1">“{el.heading}”
                                    <Image className="quote-image" src="/assets/images/icons/quote-2.png" alt="Quote Images" height={60} width={60}/>
                                </blockquote>
                                <div className="content"
                                style={{cssText : el.blog_css}} dangerouslySetInnerHTML={{ __html: el.blog_html }} >
                                </div>
                                
                        <iframe width="560" height="315" src={el.video_link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

                          </div>
                    </div>
                  </div>
              </div>
            </div>
        </div>
      
        </>
      ))}
    </>
  )
}
