import React from 'react'
import { RiTimeLine, RiHeartFill, RiStarFill, RiHeartLine } from 'react-icons/ri';
import { BsCartDashFill ,  BsCartPlus,  } from "react-icons/bs";
import { RiFolderVideoLine } from "react-icons/ri";
import Link from 'next/link';
import Image from 'next/image';

export default function CourseCard({ab , addOnCart, doPayment}){

 
  return (
    <div className="edu-card card-type-1 bg-white radius-small">
    <div className="inner">
        <div className="thumbnail">
            <Link href={`/ecourse/${ab.link}`} prefetch>
                <Image className="w-100" src={ab.image} alt="Course Meta" width={100} height={100} />
            </Link>
            <div className="top-position status-group left-top">
                <span className="eduvibe-status status-01">{ab.label}</span>
            </div>
            <div className="wishlist-top-right">
                <button className="wishlist-btn" onClick={(e, i) => addOnCart("whishlist", ab)}>{ab.wishStatus == 1 ?  <RiHeartFill/> : <RiHeartLine />}</button>
            </div>
            <div className="bottom-position status-group right-bottom">
                <span className="eduvibe-status status-01"> {ab.category}
                </span>
            </div>
        </div>
        <div className="content">
            <ul className="edu-meta meta-02">
                <li><RiFolderVideoLine /> {ab.total_videos > 0 ? ab.total_videos + " Lessons" : "0 Lessons"}</li>
                <li><RiTimeLine /> {ab.videoTime ??= "0h 0m 0s"}</li>
            </ul>
            <h6 className="title"> <Link href={`/ecourse/${ab.link}`} prefetch>{ab.name}</Link>
            </h6>
            <div className="card-top">
                <div className="edu-rating rating-default">
                    <div className="rating">
                        {ab?.rating && parseInt(ab.rating, 10) > 0 ? (
                            [...Array(parseInt(ab.rating, 10))].map((_, index) => (
                                <React.Fragment key={index}>
                                    <RiStarFill />
                                    &nbsp;
                                </React.Fragment>
                            ))
                        ) : (
                            <React.Fragment>
                                <RiStarFill />
                                &nbsp;
                            </React.Fragment>
                        )}
                    </div>
                    <span className="rating-count">({ab?.review ? parseFloat(ab?.review) : '1'})</span>
                </div>
            </div>
            <div className="card-bottom">
                <div className="price-list price-style-01">
                    <button className="edu-btn current-price" onClick={(e, i) => doPayment(e, ab)}>&#8377; {parseInt(ab.total_price * ((100 - ab.discount) / 100))}</button>
                    <div className="price old-price">&#8377; {ab.total_price}</div>
                </div>
                <button className='edu-btn btn-cart' onClick={(e, i) => addOnCart("cart", ab)}>{ab.cartStatus == 1 ? <BsCartDashFill  />  : <BsCartPlus /> }</button>
            </div>
        </div>
    </div>
</div>
  )
}
