"use client"
import React,{useState, useEffect} from 'react';
import { usePathname } from 'next/navigation'
import { termsAndCondition } from '@/lib/apis';

export default function TermsAndCondition() {
  const path = usePathname()
  const [state, setState] = useState([])
  const allData = async() => {
      const {data} = await termsAndCondition(path);
      return setState(data)
    }
  
    useEffect(() => {
      allData()
    },[path])

  

  return (
   <>
    {state && state.map((el, i) => (
    
        <div key={i} className="m-5 p-5" style={{cssText : el.page_css}} dangerouslySetInnerHTML={{ __html: el.page_html }} />
      ))}
   </>
  )
}
