'use client'
import React, { useEffect, useState } from 'react'
import { addRating, courseReview } from '@/lib/apis'
import { RiStarFill} from 'react-icons/ri'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


export default function CourseReview({id}) {
    const [addReview, setAddreview] = useState(false)
    const router = useRouter()
    const [state, setState] = useState([])
    const [field,setFiled] =  useState({
        review : "", rating : ""
      })
 
 /** handel inputs */
 const handelChange = (e) => {
    setFiled({ ...field, [e.target.name]: e.target.value })
  }

  const handleRatingChange = (rating) => {
    setFiled({ ...field, rating: rating })
  }

const saveRating =  async(e) => {
  e.preventDefault()
  if(!field.rating) return false
    e.preventDefault()
    const {data} = id > 0 && await addRating(field, id)
    if(data == 'Login First')
      return router.push("/authorization")
   return allData()
}


const allData = async() => {
  const {data} = id > 0 && await courseReview(id)
  return data && setState(data)
}

const backgroundColors = [
    'FF5733',  '3357FF',  'FF8633', '8E33FF' ,'525FE1' 
];

useEffect(() => {
    allData()
},[id > 0])

  return (
    <>
      <div className="row row--30">
        <div className="col-lg-4">
          <div className="rating-box">
            <div className="rating-number">5.0</div>
            <div className="rating">
            {[...Array(5)].map((_, index) => (
              <RiStarFill key={index} className="icon-Star" />
            ))}
            </div>
            <span>{state && state.length} Review</span>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="review-wrapper">

          {[...Array(5)].map((_, index) => (
            <div key={index} className="single-progress-bar">
              <div className="rating-text">
                {index + 1} <RiStarFill  className="icon-Star" />
              </div>
              <div className="progress">
                <div className="progress-bar" role="progressbar" style={{ width: `${(index + 1) * 20}%` }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <span className="rating-value">1</span>
            </div>
            
            ))}
</div>
        </div>
      </div>
    <div className="comment-wrapper pt--40">
    <div className="d-flex flex-row justify-content-between section-title">
      <h5 className="mb--25">Reviews</h5>
      <button className="edu-btn btn-bg-alt text-center" onClick={() => setAddreview(!addReview)}>Add A Review</button>
    </div>
    <div className='conatiner p-2'>
      {addReview && 
     <>
        <form action="" method="post" onSubmit={saveRating} className='comment-form-style-1'>
          <div className='m-2'>
            <input className='form-control' type="text" placeholder='Write Review' name="review" id="" required  onChange={handelChange}/>
          </div>
          <div className='m-2 mt-4'>
          
            {/* <input className='form-control' type="text" name="rating" id="" required /> */}
            {/* <select  name="rating" id="" required onChange={handelChange}>
              <option selected disabled>Select Rating</option>
              <option value="1">
             1
                </option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select> */}
            <div className="rating">
            <label htmlFor="rating">Give Rating: &nbsp;</label>
                    {[...Array(5)].map((_, index) => (
                      <RiStarFill
                        key={index}
                        className={`icon-Star_add ${index < field.rating ? 'selected' : ''}`}
                        onClick={() => handleRatingChange(index + 1)}
                      />
                    ))}
                  </div>
          </div>
          <div className="read-more-btn">
            <input className='edu-btn text-center mb-5'  type="submit" value="Add Review" />
          </div>
        </form>
     </>
      }
      </div>

    {state && state.map((ab, i) =>(
    
    <div key={i} className="edu-comment">
       <div className="thumbnail">
       {ab.image
                ? <Image width={50} height={50} src={ab.image} alt="Comment Images" />
                : <Image width={50} height={50} src={`https://via.placeholder.com/50/${backgroundColors[i % backgroundColors.length]}/FFFFFF?text=${ab.name.charAt(0)}`} alt="Placeholder Image" />}
            </div>
      <div className="comment-content">
        <div className="comment-top">
          <h6 className="title">{ab.name}</h6>
          <div className="rating">
          {ab.rating && [...Array(ab.rating)].map((_, i) => (
              <RiStarFill key={i} className="icon-Star" />
            ))}
          </div>
        </div>
        <span className="subtitle">{ab.review}</span>
        {/* <p></p> */}
      </div>
    </div>
    

    ))}
    </div>
    </>
  )
}
