'use client'
import React, {useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'


export default function HandelNavBar ({children}) {
    const location = usePathname()
    const [showNavbar, setShowNavbar] = useState(false)
  
    useEffect(() => {
      if (location === '/authorization' || location === '/forgetpassword') {
        setShowNavbar(false);
      } else if (location.match(/^\/course\/[^/]+\/[^/]+$/)) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
    }, [location]);
    
  return ( 
    <>
    {showNavbar && children}
    </>
    )
   
}
