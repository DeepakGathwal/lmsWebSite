"use client"
import React, { useEffect, useState } from 'react'
import { Col, Nav, Row, Tab } from 'react-bootstrap'

import '../../styles/userprofile.css'
import Image from 'next/image';
import { profileData, profileUpdate, updateImage } from '@/lib/apis';
import PasswordField from '@/components/passwordField';
import ProfileProduct from '@/components/profileProduct';

export default function Page() {
    const [state, setState] = useState({
        name : "", phone : '', email : ""
    })
  
  

    const handleImageChange = async(e) => {
        const file = e.target.files[0];
        const form = new FormData()
        form.append('image', file)
        const data =  await  updateImage(form)
        if(data) return data && allData()
    };

    const updateProfile = async(e) => {
        e.preventDefault()
        const data =  await  profileUpdate(state)
     return data && allData()
    }

    const allData = async() => {
        const {data} = await profileData() 

        return data && setState(...data)
    }

     /** handel inputs */
  const handelChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

    useEffect(() => {
        allData()
    },[])

    return (
        <>
            <div className="edu-instructor-profile-area edu-section-gap bg-color-white">
                <div className="container">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
                        <Row className='mt--25'>
                            <Col sm={4}>
                                <div className="instructor-profile-left">
                                    <div className="inner">
                                        <div className="thumbnail">
                                            <Image src={state?.image ? state?.image : "assets/images/shapes/shape-03-05.png"}  alt="About Images" width={100} height={100}/>
                                        </div>
                                        <div className="profile-text">
                                            <h5 className="title">{state?.name}</h5>
                                        </div>
                                        <Nav variant="pills" className="flex-column nav nav-pills">
                                            <Nav.Item className='nav-item category-list'>
                                                <Nav.Link eventKey="profile" className='profile-navtabs'>Profile</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item className='nav-item category-list'>
                                                <Nav.Link eventKey="privacy" className='profile-navtabs'>Profile Password</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item className='nav-item category-list'>
                                                <Nav.Link eventKey="purchase" className='profile-navtabs'>My Purchase</Nav.Link>
                                            </Nav.Item>
                                           
                                        </Nav>
                                    </div>
                                </div>
                            </Col>
                            <Col sm={8}>
                                <div className="container">
                                    <Tab.Content>
                                        <Tab.Pane eventKey="profile">
                                            <div className='course-details-card e-commerce'>
                                                <h5 className="title">Basic Details</h5>
                                                <form className="rnt-contact-form rwt-dynamic-form row" onSubmit={updateProfile}>
                                                <div className="col-lg-12">
                                                        <div className="form-group">
                                                            <input type="text"  className="form-control form-control-lg" value={state?.name}  id="name" name="name" onChange={handelChange} placeholder="Name" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="form-group">
                                                            <input type="email"  className="form-control form-control-lg" value={state?.email} readOnly id="email" onChange={handelChange}  placeholder="Email" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="form-group">
                                                            <input type="text" className="form-control form-control-lg" value={state?.phone} name="phone" id="phone" onChange={handelChange} placeholder="Phone" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <button className="rn-btn edu-btn" name="submit" type="submit">
                                                            <span>Save Changes</span>
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>

                                            <div className='course-details-card e-commerce mt--25'>
                                                <h5 className="title">Profile pic</h5>
                                                <form className="rnt-contact-form rwt-dynamic-form row">
                                                    <div className="avatar-upload">
                                                        <div className="avatar-edit">
                                                            <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" onChange={(e) => handleImageChange(e)} />
                                                            <label htmlFor="imageUpload"></label>
                                                        </div>
                                                        <div className="avatar-preview">
                                                            <div
                                                                id="imagePreview"
                                                                style={{ backgroundImage: `url(${state?.image})` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                  
                                                </form>
                                            </div>

                                            
                                        </Tab.Pane>
                                       <PasswordField Tab={Tab}/>
                                       <Tab.Pane eventKey="learning">
                                     




                                    </Tab.Pane>
                                        <ProfileProduct Tab={Tab}/>
                                    </Tab.Content>
                                </div>
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>
            </div>
        </>
    )
}
