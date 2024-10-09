'use client'

import React, { useState, useEffect } from 'react';
import { allTypesOfCourses } from '@/lib/apis';


import CoursesByID from './courseByCategoryId';

export default function Coursebycategory(){
  // Example course items
  const [category, setcategory] = useState([])
  const allData = async () => {
    const { data } = await allTypesOfCourses();

    return data && setcategory(data)
  }

  useEffect(() => {
    allData()
  }, [])

  return (
    <>
      {category.map((cat) => {
        if (cat.courses > 0) return (
          <>
            <div className="eduvibe-home-five-cats edu-about-area about-style-5 edu-section-gap bg-color-white">
              <div className="container eduvibe-animated-shape">
                <div className="row g-5">
                  <div className="col-lg-12">
                    <div className="section-title">
                      <span className="pre-title">Course by Category</span>
                      <h3 className="title">{cat.category}</h3>
                      <CoursesByID id={cat.id} />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </>
        )
      })}
    </>
  );
};
