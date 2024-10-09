import React, {useEffect, useState} from 'react'
import { FaFileDownload } from "react-icons/fa";
import { buyProduct } from '@/lib/apis'

export default function ProfileProduct({Tab}) {
    const [state, setState] = useState([])
    const allData = async() => {
        const {data} = await buyProduct()
        
        return data && setState(...data)

    }

    useEffect(() => {
        allData()
    },[])
    
  return (
    <Tab.Pane eventKey="purchase">
    <div className='course-details-card e-commerce'>
        <h5 className="title">My Purchase</h5>
            <div className="row g-5">
                <div className="col-lg-12">
                        <div className="cart-table table-responsive purchase-cart mb--40">
                            <table className="table align-middle">
                                <thead>
                                    <tr>
                                        <th className="pro-course">Course</th>
                                        <th className="pro-date">Date</th>
                                        <th className="pro-price">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
     
                                    <tr>
                                        <td className="pro-course">
                                            <a href="#">
                                                <span>{state?.name}</span>
                                            </a>
                                        </td>
                                        <td className="pro-date"><span>{state?.done_time}</span></td>
                                        <td className="pro-price"><span>{state?.currency} {state?.amount}</span></td>
                                        
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                </div>
            </div>
        </div>
</Tab.Pane>
  )
}
