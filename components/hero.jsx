"use client"
import React , {useRef, useState,useEffect} from 'react';
import "../styles/hero.css"
import Image from "next/image";
import Heroimg from "../public/assets/images/banner/aboutushero.svg"
import Floatimg from "../public/assets/images/banner/floathero.svg"
import Aboutuspost from "../public/assets/images/banner/aboutimg/aboutuspost.png";
import Aboutfour from "../public/assets/images/banner/aboutimg/shape-04-01.png";
import Aboutnine from "../public/assets/images/banner/aboutimg/badge.png";
import Shapeseven from "../public/assets/images/banner/aboutimg/shape-07.png"
import { aboutUS } from '@/lib/apis';
// import Aboutimagetwo from "../public/assets/images/banner/aboutimg/about-image-02.jpg"
export default function HeroSection() {
  const [state, setState] = useState([])
  const allData = async() => {
      const {data} = await aboutUS();
   
       return setState(data)
    }

    useEffect(() => {
      allData()
    },[])
    return (
      <>
        <div className="about-hero-section">
          <div className="container">
            <div className="row gy-5 row-flex hero-row">
              <div className="herocta col-lg-6 column-flex col-flex-start column">
                <h4 className="hero-subhead">
                  Providing best opportunity around the globe
                </h4>
                <h2 className="hero-mainhead">
                  25K+ Students <br></br>Trust Us
                </h2>
                <div className="cta-button row-flex">
                  <button className="filled">Explore Our Courses</button>
                  <button className="outlined">Our Tutorials</button>
                </div>
              </div>
              <div className="col-lg-6 heroinfographic column-flex align-items-center">
                <div className="inner">
                  <Image
                    src={Heroimg}
                    alt="passing student infographic"
                    className="infoimg"
                  />
                  <div className="float-img">
                    <Image
                      src={Floatimg}
                      alt="passing student infographic"
                      className="absoluteimg"
                    />
                  </div>
                </div>
                <div className="cta-button row-flex">
                  <button className="filled">Explore Our Courses</button>
                  <button className="outlined">Our Tutorials</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="about-section">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-6">
                <div className="abt-img">
                  <Image
                    className="mainimg"
                    src={Aboutuspost}
                    alt="About Main Thumb"
                  />
                  <div className="badge-inner">
                    <Image
                      className="badge-img"
                      src={Aboutnine}
                      alt="About Circle Thumb"
                    />
                  </div>
                  <div className="shape-image">
                    <Image src={Aboutfour} alt="Shape Thumb" />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 abt-text">
                <div className="inner">
                  <div className="title-top">
                    <span className="title">About Us</span>
                  </div>
                  {state && state.map((el, i) => (
                  <p key={i} className="description">
                   {el.description}
                  </p>

                  ))}
                
                  <div className="shape-bottom ">
                    <Image src={Shapeseven} alt="Shape Thumb" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
