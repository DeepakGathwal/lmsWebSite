'use client'
import React, { useEffect, useState } from 'react';
import { RiTimeLine } from 'react-icons/ri';
import { EcourseChapter, courseTopics } from '@/lib/apis';
import { Accordion, Modal} from 'react-bootstrap';
import { RiFolderVideoLine } from "react-icons/ri";

export default function CourseCurriculam({ id }) {
  const [activeTab, setActiveTab] = useState(null);
  const [posts, setPosts] = useState([]);
  const [topics, setTopics] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [videoSrc, setVideoSrc] = useState('');

  const allChapter = async () => {
      const { data } =  id > 0 && await EcourseChapter(id);
      return data && setPosts(data);
  };



  useEffect(() => {
    allChapter();
  }, [id]);

  const getcourseChapter = async (categoryId) => {
    if (categoryId === activeTab) 
      return setActiveTab(null);
    else {
      setActiveTab(categoryId);
      if (id > 0) {
        const { data } = await courseTopics(id, categoryId);
        return data ?  setTopics(data) : setTopics([])
      }
    }
  };



  const handlePreviewClick = (videoUrl) => {
    setVideoSrc(videoUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setVideoSrc('');
  };

  return (
    <>
      <Accordion className="edu-accordion-02">
        {posts.map((el, i) => (
          <Accordion.Item eventKey={i.toString()} className="edu-accordion-item" key={i}>
            <Accordion.Header onClick={() => getcourseChapter(el.id)}>
              <div key={i} className="d-flex justify-content-between w-100">
                <div className="course-curriculum-head">{el.chapter}</div>
                <div className="course-curriculam-length">
                  <RiFolderVideoLine />{el.videos} <RiTimeLine />{el.totalTime}
               
                </div>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              {activeTab === el.id && topics.map((ch, j) => (
                <ul key={j}>
                  <li>
                    <div className="text">
                      <RiFolderVideoLine /> {ch.topic}
                    </div>
                    <div className="preview"> 
                    {ch.videoLink && 
                      <div className="preview-video" onClick={() => handlePreviewClick(ch.videoLink)}>
                        preview
                      </div>
                      }
                      <div className="icon">
                        <RiTimeLine />{ch.time ? ch.time : '00:00'}
                      </div>
                    </div>
                  </li>
                  
                </ul>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <Modal show={showModal} onHide={handleCloseModal} centered className='preview-video-popup'>
       
        <Modal.Body >
        <span className="close video_Popup" onClick={handleCloseModal}>&times;</span>
          <iframe width={500} height={500} frameborder="0"  aria-controls='false' src={videoSrc} allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </Modal.Body>
      </Modal>
    </>
  );
};
