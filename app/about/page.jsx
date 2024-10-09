import React from 'react';         
import "../globals.css";
import HeroSection from "../../components/hero";
import WhyChooseUs from "@/components/whyChooseUs";
import StudentPlaced from "@/components/studentPlaced";
import Testimonials from "@/components/testimonials";
import LatestBlogs from "@/components/latestBlogs";

// const inter = Inter({ subsets: ["latin"] });



export default function YourPage () {
  return (
   <>
 
   <HeroSection />
    <WhyChooseUs/>
    <StudentPlaced/>
    <Testimonials/>
    <LatestBlogs/>
   </>
  );
};
