import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { courcesList } from '@/lib/apis';
export default function Megamenu({ categories,  setMegaMenu }) {
    const [cources, setCources] = useState([])
    const handleTabMouseEnter = async(id) => {
        const { data } = await courcesList(id)
     
        return data && setCources(data)
       
    };
    useState(()=> {
        handleTabMouseEnter(1)
    },[])
    return (
        <>
            <div className="mega-menu row-flex" onMouseLeave={(e) => setMegaMenu(false)}>
                <div className="column-flex course-hover">
                    <ul>
                        {categories && categories.map((el, i) => (
                            <>
                                <li key={i} id={el.id} onMouseEnter={() => handleTabMouseEnter(el.id)}><Link href="/" prefetch>{el.category}</Link></li>
                            </>
                        ))}
                    </ul>
                </div>
                <div className="row-flex hover-results" id="contentOne"  style={{ display : 'grid'  }} >
                    {cources && cources.map((el, o) => (

                        <div key={o} className="course-card">
                            <Link href={'/course/' + el.link} className="cardlinks column-flex" prefetch>
                                <Image src={el.icon} alt={el.name} width={20} height={20} className="courseIcon" />
                                <h3>{el.name}</h3>
                            <div class="ag-courses-item_bg"></div>
                                <div className="details">
                                    <span className="info">{el.name}</span>
                                </div>
                            </Link>
                        </div>

                    ))}

                </div>

            </div></>
    )
}
