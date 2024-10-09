"use client"
// pages/index.js or pages/home.js
import { useEffect, useState } from 'react';
import BannerAreaHome from "@/components/bannerAreaHome";
import FeaturedCourses from "@/components/featuredCourses";
import WhyChooseUs from "@/components/whyChooseUs";
import StudentPlaced from "@/components/studentPlaced";
import Testimonials from "@/components/testimonials";
import LatestBlogs from "@/components/latestBlogs";
import PopupForm from "@/components/popupForm";
import BackToTop from '@/components/backtotop';

export default function Home() {
    const [showPopup, setShowPopup] = useState(false);

    const handleClose = () => setShowPopup(false);
    const handleShow = () => setShowPopup(true);

    useEffect(() => {
        // Show the popup 10 seconds after the user visits the page
        const firstPopupTimeout = setTimeout(() => {
            handleShow();
        }, 10000); // 10 seconds

        // Show the popup every 5 minutes after the first popup
        const popupInterval = setInterval(() => {
            handleShow();
        }, 5 * 60 * 1000); // 5 minutes

        return () => {
            clearTimeout(firstPopupTimeout);
            clearInterval(popupInterval);
        };
    }, []);

    return (
        <>  
            <BannerAreaHome/>
            <WhyChooseUs/>
            <div>
                <FeaturedCourses/>
            </div>
            <StudentPlaced/>
            <Testimonials/>
            <LatestBlogs/>
            <PopupForm show={showPopup} handleClose={handleClose} />
            <BackToTop/>
        </>
    );
    
}
