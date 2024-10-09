"use client"
import React, {useState, useEffect } from 'react'
import Head from "next/head";
import Link from 'next/link';
import { setCookie } from 'cookies-next';
import { useParams,useRouter } from 'next/navigation'
import { nextTutorial, prevTutorial, tutorialChapter, tutorialTopic } from '@/lib/apis';
import "../../../../styles/tutorial.css"
import PrevNextButton from '@/components/prevNextButton';

export default function Page () {
  const { asPath } = useRouter();
  const [state, setState] = useState([])
  const [section, setSection] = useState([])
  const router = useParams()
  const navigate = useRouter();

  const {chapter,topic } = router
  const allChapters = async() => {
    if(topic == 'undefined') return navigate.push('/')
    setCookie('code', `${chapter}&&${topic}`);
      const {data} = await tutorialChapter(chapter)
      singleTopic()
     return data && setState(data)
  } 

  const singleTopic = async() => {
    const {data} = await tutorialTopic(topic)
    setCookie('code', `${chapter}&&${topic}`);
    return  data && setSection(data)
  }

  useEffect(() => {
    allChapters()
  },[chapter])

  useEffect(() => {
    singleTopic()
  },[topic])

  const [istutActive, setIstutActive] = useState(false);
    const toggleMenu = () => {
        setIstutActive(!istutActive);
  };


  const goToNextTutorial = async(goto) => {
    if(section.length > 0){
      const course = section && section[0].cource_id
      const id = section && section[0].id
if(goto == "Next"){
      const {data} = await nextTutorial(course, id)
   
if(data) return   navigate.push(`/tutorial/${chapter}/${data && data[0].link}`) 
else return 
    }else if(goto = "PREV"){
        const {data} = await prevTutorial(course, id)

if(data) return navigate.push(`/tutorial/${chapter}/${data && data[0].link}`)
else return
    }

  }else return ;
  }

  //Auto Save Changes

  return (
    <>
          <Head>
        <Link rel="canonical" href={`https://www.jtc.org${asPath}`} prefetch />
        <title>
       
        </title>
        <meta charSet="utf-8" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content={section.length > 0 && section[0].meta_description}
        />
        {/* <meta
          name="google-site-verification"
          content="fLT70DRZGdH5FUdrS8w1k2Zg_VTzNJGDF9ie9v4FAzM"
        /> */}
        <meta
          name="keywords"
          content={section.length > 0 && section[0].meta_keywords}
        />
        <meta
          property="og:title"
          content="About Us - Inventory Management Software Tools for OOH/DOOH Media Owners | OdoAds"
        />
        <meta
          property="og:siteName"
          content="OdoAds - Management Software for OOH/DOOH Media Owners/Vendors"
        />
        <meta
          property="og:description"
          content={section.length > 0 && section[0].meta_description}
        />
        <meta property="og:type" content="en_US" />
        <meta
          property="og:image"
          href="https://odoads.com/imgs/14.jpg"
        />
        <meta property="og:url" href={asPath} />
        <meta property="og:property" content="en_US" />
        <meta
          property="twitter:title"
          content="About Us - Inventory Management Software Tools for OOH/DOOH Media Owners | OdoAds"
        />
        <meta
          property="twitter:siteName"
          content="OdoAds - Management Software for OOH/DOOH Media Owners/Vendors"
        />
        <meta
          property="twitter:description"
          content="Here OdoAds provides OOH/DOOH Media Booking Management Software Tool for Media Owners/Vendors, That will help them to manage their all inventories and bookings. | OdoAds"
        />
        <meta property="twitter:type" content="en_US" />
        <meta
          property="twitter:image"
          href="https://odoads.com/imgs/14.jpg"
        />
        <meta property="twitter:url" href={asPath} />
        <meta property="twitter:property" content="en_US" />
      </Head>
    <div className="tut-header-nav">
      <span className={`tutorial-menu ${istutActive ? 'active' : ''}`} onClick={toggleMenu}>
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.59375 14.8438H41.4062M8.59375 25H41.4062M8.59375 35.1562H41.4062" stroke="white" strokeWidth="4.6875" strokeMiterlimit="10" strokeLinecap="round"/>
      </svg>
      </span>
      
    </div>
      <div className="edu-blog-details-area mt--20 bg-color-white">
       <div className="row w-100">
          <div className="col-lg-3 order-2 order-lg-1">
            <aside className={`edu-blog-sidebar ${istutActive ? 'active' : ''}`}>
              <div className="edu-blog-widget widget-categories">
                {state && state.map((el, i) => (
                <div key={i} className="inner">
                  <h6 className="widget-title">{el.category_name}</h6>
                  <div className="content">
                    <ul className="category-list">
                    {el.topic && el.topic.map((ab, j) => (
                      <li key={j}>
                        <Link 
                          href={`/tutorial/${chapter}/${ab.link}`} 
                          onClick={toggleMenu} 
                          className={ab.link === topic ? 'active-link' : ''}
                          prefetch
                        >
                          {ab.heading}
                        </Link>
                      </li>
                    ))}
                      </ul>
                  </div>
                </div>

                ))}
               
              </div>
            </aside>
          </div>
          <div className="col-lg-9 order-1 order-lg-2">
            <div className="blog-details-1">
          <PrevNextButton goToNextTutorial={goToNextTutorial}/>
              
               <div className="overview">
           {section && section.map((el, id) =>(
        <div key={id} style={{cssText : el.tutorial_css}} dangerouslySetInnerHTML={{ __html: el.tutorial_html }} />

           ))} 
          <PrevNextButton goToNextTutorial={goToNextTutorial}/>
        </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

