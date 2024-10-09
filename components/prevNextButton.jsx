import React from 'react'
import { FaArrowLeft,FaArrowRight } from "react-icons/fa";

export default function PrevNextButton({goToNextTutorial}) {
  return (
    <div className="row g-5 mb--20">
    <div className="col-md-12 page-flex justify-content-between">
      <div className="load-more-btn">
                  <button className="edu-btn" href="courses.php" onClick={() => goToNextTutorial("PREV")}> <FaArrowLeft /> Previous</button>
              </div>
              <div className="load-more-btn">
                  <button className="edu-btn" href="courses.php" onClick={() => goToNextTutorial("Next")}>Next <FaArrowRight /></button>
              </div>
    </div>
 </div>
  )
}
