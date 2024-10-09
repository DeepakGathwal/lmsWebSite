'use client'
import { courseLearn } from '@/lib/apis';
import React, { useEffect, useState } from 'react'
export default function CourseLear ({id}) {
    const [state, setState] = useState([])

    const allData = async() => {
      const {data} = id > 0 &&  await courseLearn(id)
      return data && setState(data)
    }
  
 
  
  useEffect(() => {
    allData()
  },[id > 0])
  
  return (
    <>
      <h5 className='mt-5'>What You’ll Learn From This Course</h5>                 
      <ul>
        {state && state.map((ab, i) => (
        <li key={i}>{ab.point}</li>   
        ))}
      </ul>
    </>
  )
}
