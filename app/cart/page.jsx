'use client'
import React, { useEffect, useState, useContext } from 'react'
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import Script from 'next/script'
import { useRouter } from 'next/navigation'
import {  cartItems, changeCartItems } from '@/lib/apis';
import Image from 'next/image';
import { adding,  processCartPayment } from '@/functions/commonFunctions';
import { AccountContext } from '@/apis/apicontext';



export default function Cart() {
    const [state, setState] = useState([])
    const router = useRouter()
    const {addRemove} = useContext(AccountContext)


    const allData = async () => {
    const {data} = await cartItems()
    return data &&  setState(data)
    }

    useEffect(() => {
        allData()
    }, [])

    const deletecourse = async (e, id, db) => {
        e.preventDefault()
        const { data } = await  adding(db,id )
        if(data){
        if(db == "cart") await  addRemove({ type: "DECR" });
        const value =  await state.filter((ab) => ab.courseId !== id)
        return  await value &&   setState(value)
       
         }
    }

    const changeLocation = async (e, id, add, rem) => {
        e.preventDefault()
       
        const { data } = await  changeCartItems(id, add, rem)
        if(data){
       await allData()
       if(add == "cart") await  addRemove({ type: "INCR" });
       else  if(rem == "cart") await  addRemove({ type: "DECR" });
       return
    }
    }

    const doPayment = async (e) => {
        e.preventDefault()
        if(!state) return false
        const newData =  await state.filter((av) => av.cart == "Cart")
        const data = await processCartPayment(e, newData)
        if (data == 'Login First') 
      
          return router.push("/authorization")
        else if(data > 0){
          await  addRemove({ type: "DECR" });
           await allData()
            return router.push('/')
            }
      }
    

    return (
        <>
         <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
            <div className="edu-cart-page-area edu-section-gap bg-color-white">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-12">
                                <div className="cart-table table-responsive mb--40">
                                    <table className="table align-middle">
                                        <thead>
                                            <tr>
                                                <th className="pro-thumbnail">Shopping Cart</th>
                                            
                                            </tr>
                                        </thead>
                                        {state && state.map((av,i) => {
                                            if (av.cart == "Cart") return (
                                                <tbody key={i}>
                                                    <tr>
                                                        <td className="pro-thumbnail">
                                                            <div className="row g-5">
                                                                <div className="col-lg-6 d-flex">
                                                                    <Image width={100} height={100} src={av.image ? av.image : "/instructor/course-details/instructor-2.jpg"} alt="Author Images" />

                                                                    <span><Link href={`/course/${av.course_link}`} prefetch> {av.name}</Link>
                                                                        <p className="author-title"> &#8377;{parseInt(av.total_price * ((100 - av.discount) / 100))}</p>
                                                                    </span>
                                                                </div>
                                                                <div className="col-lg-6 text-end">
                                                                    <div className="d-flex flex-column align-items-end">
                                                                        <button className="cart-btn" onClick={(e, a, i, k) => changeLocation(e, av.id, "wishlist", "cart")}>Wishlist</button>
                                                                        <button className="cart-btn" onClick={(e, a, i) => deletecourse(e, av.courseId, "cart")} >Remove</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>

                                                     
                                                    </tr>
                                                </tbody>
                                            )
                                        })}
                                    </table>
                                </div>
                        </div>
                    </div>

                    <div className="row g-5">
                        <div className="col-lg-6">
                            <div className="update-button-group text-start text-lg-end">
                            </div>
                        </div>
                        <div className="col-lg-6">

                            <div className="cart-summary">
                                <div className="cart-summary-wrap">
                                    <h4 className="title">Cart Totals</h4>
                                    <ul className="cart-summary-inner">

                                        <li><span className="subtitle">Total</span><span className="total">&#8377; {state ?  state.reduce((acc, ab) => {
                                            if (ab.cart === "Cart") {
                                                return acc + parseInt(ab.total_price * ((100 - ab.discount) / 100));
                                            } else {
                                                return acc;
                                            }
                                        }, 0) : 0}</span></li>
                                    </ul>
                                </div>
                                <div className="cart-summary-button-group mt--20 d-flex justify-content-between">
                                    <Link className="edu-btn btn-shade" href="/course" prefetch>Continue Shopping <FaArrowRight /> </Link>
                                    <button className="edu-btn text-center"  onClick={(e) => doPayment(e)}>Proceed To Checkout <FaArrowRight /></button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="" id='jtc-wishlist'></div>                    
                    <div className="row g-5 mt--20">
                        <div className="col-lg-12" >
                                <div className="cart-table table-responsive mb--40">
                                    <table className="table align-middle">
                                        <thead>
                                            <tr>
                                                <th className="pro-thumbnail">Wishlist</th>
                                            
                                            </tr>
                                        </thead>
                                        {state && state.map((av, i) => {
                                            if (av.cart == "Wish") return (
                                                <tbody key={i}>
                                                    <tr>
                                                        <td className="pro-thumbnail">
                                                            <div className="row g-5">
                                                                <div className="col-lg-6 d-flex">
                                                                    <Image width={100} height={100} src={av.image ? av.image : "/instructor/course-details/instructor-2.jpg"} alt="Author Images" />

                                                                    <span><Link href={`/course/${av.course_link}`} prefetch> {av.name}</Link>
                                                                        <p className="author-title">&#8377;{parseInt(av.total_price * ((100 - av.discount) / 100))}</p>
                                                                    </span>
                                                                </div>
                                                                <div className="col-lg-6 text-end">
                                                                    <div className="d-flex flex-column align-items-end">
                                                                        <button className="cart-btn" onClick={(e, a, i, k) => changeLocation(e, av.id, "cart", "wishlist")}>Add to cart</button>
                                                                        <button className="cart-btn" onClick={(e, a, i) => deletecourse(e, av.courseId, "wishlist")}>Remove</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                       
                                                    </tr>
                                                </tbody>
                                            )
                                        })}
                                    </table>
                                </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}



