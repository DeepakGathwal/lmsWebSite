import React, { useState, useEffect } from 'react';
import { courseChapter, courseCatgories } from '@/lib/apis';

export default function CourceCategory({ coursename,router }){
    const [state, setState] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [activeTab, setActiveTab] = useState(null);

    const allData = async () => {
        const { data } = await courseCatgories(coursename);
        return data &&  setState(data)
        // return data  ? setState(data) : router.push('/');
    };

    useEffect(() => {
        allData();
    }, [coursename]);

    const getCourceChapter = async (categoryId) => {
        if (categoryId === activeTab) {
            // Toggle accordion
            setActiveTab(null);
        } else {
            setActiveTab(categoryId);
            const { data } = await courseChapter(categoryId);
            setChapters(data || []);
        }
    };

    return (
        <div className='col-md-7'>
            <div className="edu-card card-type-7 radius-small">
                <div className="inner">
                    <div className="accordion-style-2 acc-section">
                        <div className="accordion custom">
                            {state && state.map((el, i) => (
                                <div key={i} className="accordion-item">
                                    <div
                                        className={`accordion-title ${el.id === activeTab ? 'active' : ''}`}
                                        onClick={() => getCourceChapter(el.id)}
                                    >
                                        <h2 className="accordion-header accordion-button">{el.category_name}</h2>
                                    </div>
                                    {el.id === activeTab && (
                                        <div className="accordion-collapse">
                                            <div className="accordion-body module">
                                                {chapters && chapters.map((ch, j) => (
                                                    <div key={j}>
                                                        <h4>{ch.chapter}</h4>
                                                        <div className="list_mod">
                                                            {ch.topic && ch.topic.map((tp, k) => (
                                                                <p key={k}>{tp.topic}</p>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
