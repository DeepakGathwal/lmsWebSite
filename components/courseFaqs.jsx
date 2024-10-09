'use client'
import { EcourseFaqs } from '@/lib/apis';
import React, { useEffect, useState } from 'react'
import { AccordionBody, AccordionHeader, AccordionItem } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

export default function CourseFaqs({id}) {
    const [state, setState] = useState([])

    const allData = async() => {
      const {data} = id > 0 && await EcourseFaqs(id)
  
      return data && setState(data)
    }
  
 
  
  useEffect(() => {
    allData()
  },[id > 0])
  return (
        <Accordion className='e-commerce-faq'>


            {state && state.map((ab, i) => (
          <AccordionItem key={i} eventKey={ab.id}>
            <AccordionHeader >{ab.point}</AccordionHeader>
            <AccordionBody ><p>{ab.description}</p></AccordionBody>
          </AccordionItem>

            ))}
        
        </Accordion>
  )
}

