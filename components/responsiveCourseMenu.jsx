import { courcesList } from '@/lib/apis';
import Link from 'next/link';
import React, { useState } from 'react'

export default function ResponsiveCourseMenu({menuActive, categories}) {
    const [activeItem, setActiveItem] = useState(0);
    const [cources, setCources] = useState([])
    const handleItemClick = async (item) => {
        const { data } = await courcesList(item)
       
        setActiveItem(item);
        return data && setCources(data)
      };
  return (
    <div className={`course-menu ${menuActive ? 'active' : ''}`}>
            <ul className="menu col-flex">
              {categories && categories.map((el, i) => (
                <>
              
                  <li className="men-list" key={i} id={el.id}><Link onClick={() => handleItemClick(el.id)} className={activeItem === el.id ? 'active' : ''} href="#" prefetch>{el.category}</Link></li>

                      {activeItem == el.id && 
                            <div className="courses-button">
                              {cources && cources.map((ab, o) => (
          
          
                                <Link key={o} href={'/course/' + ab.link} prefetch className="course-link">
          
                                  {ab.name}
          
                                </Link>
          
                              ))}
                            </div>
                      }


                </>
              ))}
             
            </ul>
          </div>
  )
}

