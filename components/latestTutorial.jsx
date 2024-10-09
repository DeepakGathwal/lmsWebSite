import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import { tutorialCourse } from '@/lib/apis';

export default function ProgrammingAndFramework({ category, id }) {

    const [state, setState] = useState([])
    const allData = async () => {
        const { data } = await tutorialCourse(id);
        return  data && setState(data)
    }


    useEffect(() => {
        allData()
    }, [])
    const words = category.split(' ');
    const lastWord = words.pop();


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="section-title white-title sal-animate mb--40 mt--40">

                        <h3 className="title tg-svg">
                            {words.map((word, index) => (
                                <React.Fragment key={index}>
                                    <span>{word}</span>{' '}
                                </React.Fragment>
                            ))}
                            <span style={{ position: 'relative', display: 'inline-block', color: '#525FE1' }}>
                                {lastWord}
                                <svg width="14" height="14" viewBox="0 0 145 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.00016 15.2711C18.1407 8.34427 70.832 -1.93441 144.473 12.3652" stroke="currentColor" strokeWidth="4"></path>
                                    <path d="M26.2943 14.0041C38.9177 9.44643 77.3772 3.50055 130.227 16.1786" stroke="currentColor" strokeWidth="2"></path>
                                </svg>
                            </span>
                        </h3>
                    </div>
                </div>
                <div className="row">

                    {state && state.map((el, i) => (
                        <div key={i} className="col-md-2 col-6"  >
                           <Link href={`/tutorial/${el.link}/${el.topic}`} prefetch>
						   <div className="tutor_box">
                                <Image width={100} height={50} src={el.icon} alt={el.icon} />
                                <p>{el.name}</p>
                            </div>
						   </Link>
                        </div>
                    ))}


                
                </div>
            </div>
        </>
    )
}


