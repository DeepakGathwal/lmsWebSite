 "use client"
import React,{useState, useEffect} from 'react';
import "../globals.css"
import "../../styles/orbit.css";
import "../../styles/tutorialTopics.css";
import {  tutorialType } from '@/lib/apis';
import Image from 'next/image';
import LatestTutorial from '@/components/latestTutorial';

export default function Tutorial() {


    const [state, setState] = useState([])
    const allData = async() => {
        const {data} = await tutorialType();
        return data && setState(data)
      }
    

      useEffect(() => {
        allData()
      },[])

  return (
    <>
        <div className="hero-section">
            <div className="container">
                <div className="row-flex hero-pad space-between-row">
                    <div className="herocta align-items-center-column column-flex col-flex-start">
                        <div className="top-subhead">
                        Knowledge at Your Fingertips
                        </div>
                        <div className="hero-heading">
                        Explore our Extensive Range <br />
                        of <strong> Engaging Tutorials</strong>
                        </div>
                    </div>
                    <div className="herofig d-xl-block d-none">
                        <div className="orbitfig">
                            <div className="centerlogo">
                                <Image src="assets/images/orbitimage/logo.webp" alt="" className="logo" width={90} height={47}/>
                            </div>
                            <div className="first-orbit">
                                <span className="firstItem"></span>
                                <span className="secondItem"></span>
                                <span className="thirdItem"><Image src="assets/images/orbitimage/automation.svg" alt="" className="smaller-icon" width={50} height={50}/></span>
                            </div>
                            <div className="second-orbit">
                                <span className="firstItem"></span>
                                <span className="secondItem"></span>
                                <span className="thirdItem"><Image src="assets/images/orbitimage/webdevelopment.svg" alt="" className="mid-icon" width={68} height={68}/></span>
                                <span className="fourthItem"><Image src="assets/images/orbitimage/saleforce.svg" alt="" className="mid-icon" width={68} height={68}/></span>
                            </div>
                            <div className="third-orbit">
                                <span className="firstItem"></span>
                                <span className="secondItem"></span>
                                <span className="thirdItem"><Image src="assets/images/orbitimage/react.svg" alt="" className="large-icon" width={82} height={82}/></span>
                                <span className="fourthItem"><Image src="assets/images/orbitimage/javascript.svg" alt="" className="large-icon" width={74} height={74}/></span>
                                <span className="fifthItem"><Image src="assets/images/orbitimage/kubernotes.svg" alt="" className="large-icon" width={62} height={62}/></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <LatestTutorial category={"Latest Tutorial"} id = {0}/>

        {state && state.map((el, i) => (
            <div key={i}>
              <LatestTutorial category={el.category} id = {el.id}/>
            </div>

        ))}
    </>
  )
}
