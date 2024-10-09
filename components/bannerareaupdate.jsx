'use client'
import {componentData } from '@/lib/apis';
import { Carousel, CarouselItem } from 'react-bootstrap'
import React,{useState, useEffect} from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';


// import bannerImage from '../../public/banner/home-one-banner.jpg'

export default function Bannerareaupdate() {
    
    const [state, setState] = useState([])
 
    const allData = async() => {
        const {data} = await componentData("Home");
    
        return data && setState(data)
      }

     
      useEffect(() => {
        allData()
      },[])


      const prevIcon = (
        <span className="custom-prev-icon">
          <FaArrowLeft size={30} />
        </span>
      );
    
      const nextIcon = (
        <span className="custom-next-icon">
          <FaArrowRight size={30} />
        </span>
      );
    
  return (
    <>
         
         <Carousel prevIcon={prevIcon} nextIcon={nextIcon}>
    {state && state.map((ab, i) => {
      if (ab.images) {
        return ab.images.split("==,").map((al, k) => (
          <CarouselItem key={`${i}-${k}`}>
            <Image src={al} width={2000} height={500} alt={`Slide ${k}`} />
          </CarouselItem>
        ));
      }else
      return null;
    })}
  </Carousel>
            
    </>
  )
}












