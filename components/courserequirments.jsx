'use client'
import React, { useEffect, useState } from 'react'
import { courseRequirement } from '@/lib/apis';
import {RiCheckboxCircleFill} from 'react-icons/ri'


export default function Requirments ({id}) {
    const [state, setState] = useState([])

    const allData = async() => {
      const {data} = id > 0 &&  await courseRequirement(id)
      return data && setState(data)
    }
  

  useEffect(() => {
    allData()
  },[id > 0])


  return (
            <ul className='list-style-1'>
                {state && state.map((ab,i) => (
  
  <li key={i}><RiCheckboxCircleFill className="icon-checkbox-circle-fill-solid"/>{ab.requirement}</li>
))}
   </ul>
  )
}
