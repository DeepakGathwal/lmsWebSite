'use client'
import React,{useEffect,useState} from 'react';
import { setCookie } from "cookies-next";
import { allTypesOfCourses } from '@/lib/apis';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


export default function CourseCategory()  {
    const router = useRouter()
   
    const [state, setState] = useState([])
    const allData = async() => {
        const {data} = await allTypesOfCourses();
        return data && setState(data)
      }
     
      useEffect(() => {
        allData()
      },[])


      const navigateToCoursePage = (id) => {
        setCookie('course', id)
        return router.push("/ecourse")

      }
  return (
    <>
      <div className="home-one-cat edu-service-area service-wrapper-1 edu-section-gap bg-white">
            <div className="container eduvibe-animated-shape">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title text-center">
                            <span className="pre-title">Course Categories</span>
                            <h3 className="title">Popular Topics To Learn</h3>
                        </div>
                    </div>
                </div>
                <div className="row g-5 mt--25">

                   {state && state.map((el, i) =>(

                <div key={i} className="col-lg-4 col-md-6 col-12">
                    <div className="service-card service-card-5" style={{cursor : 'pointer'}} onClick={(e) => navigateToCoursePage(el.id)}>
                         
                        <div className="inner">
                           <div className="icon">
                                <Image src={el.icon} alt="Service Images" width={100} height={75}/>
                            </div>
                            <div className="content">
                                <h6 className="title"><a>{el.category}</a></h6>
                                <p className="description">{el.courses + " Course"}</p>
                            </div>
                        </div>
                          
                    </div>
                 </div>

                   ))}
                  

                </div>
              

                <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
                    <div className="shape-image shape-image-1">
                        <Image width={110} height={99} src={"assets/images/shapes/shape-03-01.png"} alt="Shape Thumb" />
                    </div>
                    <div className="shape-image shape-image-2">
                        <Image width={205} height={118} src={"assets/images/shapes/shape-08.png"} alt="Shape Thumb" />
                    </div>
                    <div className="shape-image shape-image-3">
                        <Image width={87} height={116} src={"assets/images/shapes/shape-04-01.png"} alt="Shape Thumb" />
                    </div>
                    <div className="shape-image shape-image-4">
                        <Image width={51} height={63} src={"assets/images/shapes/shape-03-02.png"} alt="Shape Thumb" />
                    </div>
                </div>

            </div>
        </div>
    </>
  )
}

