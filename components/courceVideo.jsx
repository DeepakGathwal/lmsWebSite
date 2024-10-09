import React,{useState, useEffect} from 'react'
import { courceViodePoint } from '@/lib/apis'

export default function CourceVideo ({coursename, router}){
	const [state, setState]  = useState([])
    const allData = async() => {
        const {data} = await courceViodePoint(coursename)
		return data &&  setState(data)
        // return data ? setState(data) : router.push('/')
    }
useEffect(() => {
    allData()
},[coursename])
  return (
	<div className="eduvibe-widget-details mt--35">
	<div className="widget-content">
		<ul>
			{state && state.map((el, i) => (
				<li key={i}>{el.description}</li>

			))}

	</ul>

		<div className="read-more-btn mt--45">
			<a className="edu-btn btn-bg-alt w-100 text-center"
				href="#downloadSyllabus">Download Brochure</a>
		</div>

		<div className="read-more-btn mt--15">
			<a className="edu-btn w-100 text-center" href="#upcomingBatches">Enroll
				Now</a>
		</div>
	</div>
</div>
  )
}
