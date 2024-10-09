'use client'
import Image from 'next/image';
import React from 'react';
import { RiBookLine, RiShoppingBasket2Line, RiTrophyLine } from "react-icons/ri";

export default function Jtcwork() {
  const bannerStyle = {
    backgroundImage: `url('assets/images/bg/home-five-hiw.jpg')`,
  };

  return (
    <>
      <div className="eduvibe-home-five-progress edu-service-area edu-section-gap bg-image" style={bannerStyle}>
        <div className="container eduvibe-animated-shape">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center" >
                <span className="pre-title">What We Offer</span>
                <h3 className="title">How Does JTC Work?</h3>
              </div>
            </div>
          </div>
          <div className="row g-5 mt--20">
            <div className="service-card-single col-lg-4 col-md-6 col-12">
              <div className="service-card service-card-7 shape-bg-1">
                <div className="inner">
                  <div className="icon">
                    <RiBookLine />
                  </div>
                  <div className="content">
                    <h6 className="title">Choose Any Courses</h6>
                    <p className="description">Lorem ipsum dolor amet, consectetur adipiscing elited uspendisse varius enim</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="service-card-single col-lg-4 col-md-6 col-12">
              <div className="service-card service-card-7 shape-bg-2">
                <div className="inner">
                  <div className="icon">
                    <RiShoppingBasket2Line />
                  </div>
                  <div className="content">
                    <h6 className="title">Purchase Your Course</h6>
                    <p className="description">Lorem ipsum dolor amet, consectetur adipiscing elited uspendisse varius enim</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="service-card-single col-lg-4 col-md-6 col-12">
              <div className="service-card service-card-7 shape-bg-3">
                <div className="inner">
                  <div className="icon">
                    <RiTrophyLine />
                  </div>
                  <div className="content">
                    <h6 className="title">Great! Start Learn</h6>
                    <p className="description">Lorem ipsum dolor amet, consectetur adipiscing elited uspendisse varius enim</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .service-card-single:first-child::after {
            content: "";
            width: 155px;
            height: 43px;
            right: -19%;
            top: 40px;
            background-image: url('assets/images/shapes/arrow-down.png');
            background-size: cover;
            background-position: center center;
            position: absolute;
          }
          .service-card-single:last-child::after {
            content: "";
            width: 155px;
            height: 43px;
            right: -19%;
            top: 0;
            background-image: url('assets/images/shapes/arrow-top.png');
            background-size: cover;
            background-position: center center;
            position: absolute;
          }
        `}</style>
      </div>
    </>
  );
}
