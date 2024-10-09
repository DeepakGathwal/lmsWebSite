"use client"
import { useEffect, useState } from 'react';
import { IoIosArrowUp } from "react-icons/io";

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        setProgress(scrollPercent);
        setIsVisible(scrollTop > 200);
    };

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {isVisible && (
                <button 
                    onClick={handleClick} 
                    style={{
                        position: 'fixed',
                        right: '30px',
                        bottom: '30px',
                        height: '46px',
                        width: '46px',
                        border: '0',
                        cursor: 'pointer',
                        display: 'block',
                        borderRadius: '50px',
                        boxShadow: 'inset 0 0 0 2px #f8e3c3',
                        zIndex: 10000,
                        transform: 'translateY(15px)',
                        transition: 'all 200ms linear',
                        background: 'transparent',
                        padding: '0',
                    }}
                >
                    <svg 
                        viewBox="0 0 36 36"
                        style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <path
                            d="M18 1.0845
                               a 16.9155 16.9155 0 0 1 0 33.831
                               a 16.9155 16.9155 0 0 1 0 -33.831"
                            fill="none"
                            stroke="#FFA41B"
                            strokeWidth="2"
                            strokeDasharray={`${progress}, 100`}
                        />
                    </svg>
                    <IoIosArrowUp style={{ color :'#FFA41B' , fontSize:'30px'}}/>
                </button>
            )}
        </>
    );
}
