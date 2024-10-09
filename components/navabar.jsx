'use client'
import React, { useState, useEffect, useContext, useRef } from 'react';
import { footerData, loginAPi, allCourceTypes, courcesList, homeCourses } from '@/lib/apis';
import { signOut, useSession } from "next-auth/react";
import { usePathname } from 'next/navigation'
import Megamenu from "./megamenu";
import { FaUser, FaShoppingCart, FaGripLines, FaTimes} from "react-icons/fa";
import { useRouter } from 'next/navigation';
import '@/styles/navbar.css';
import '@/styles/Header.css';
import { AccountContext } from '@/apis/apicontext';
import Link from 'next/link';
import Image from 'next/image';
import HireFromUs from './hireFromUs';
import JoinUs from './joinUs';
import Test from './enquiryForm';
import ResponsiveCourseMenu from './responsiveCourseMenu';

export default function Navbar(){
  const path = usePathname()
  const [isActive, setIsActive] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const [mess, setMessage] = useState([])
  const [categories, setCategories] = useState([])
  const [megaMenu, setMegaMenu] = useState(false)
  const [links, setLinks] = useState([])
  const [show, setShow] = useState(false)
  const [Hireshow, setHireShow] = useState(false)
  const [joinForm, setjoinForm] = useState(false)


  const { initalState } = useContext(AccountContext);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const [user, setUser] = useState([]);

  const navigate = useRouter();


  const allCourseType = async () => {
    setMessage([])
    const { data } = await allCourceTypes()
    return data && setCategories(data);
  }


  const allData = async () => {
    const { data } = await loginAPi();
    allCourseType()
    return data && setUser(data)
  };


  useEffect(() => {
    allData()
  }, [session])
  const handleScroll = () => {
    if (window.scrollY > 250) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };


  const loginPage = () => {
    navigate.push('/authorization');
  };

  const handleUserRegistrationClick = () => {
    if (user === "Login First") {
      loginPage();
    } else {
      setShowProfileDropdown(!showProfileDropdown);
    }
  };



  const navbar = async () => {
    const { data } = await footerData('navbar')
    return data && setLinks(data[0].links);
  }

  

  const navBarFunction = async (link) => {
    if (link == "/courses") return setMegaMenu(!megaMenu)
    else if (link == "/hire") {
      setHireShow(true)
      setMessage([])
      return setMegaMenu(false)
    } else if (link == "/join") {
      setjoinForm(true)
      setMessage([])
      return setMegaMenu(false)
    } else {
      setMegaMenu(false)
      setMessage([])
      return router.push(link)
    }
  }

  const navBarFunctionRes = async (link) => {
    if (link == "/courses") return setMenuActive(!menuActive);
    else if (link == "/hire") {
      setHireShow(true)
      setMessage([])
      return setMenuActive(false)
    } else if (link == "/join") {
      setjoinForm(true)
      setMessage([])
      return setMenuActive(false)
    } else {
      setMenuActive(false)
      setMessage([])
      return router.push(link)
    }
  }
  useEffect(() => {
    setMessage([])
    return setMegaMenu(false)
  }, [path])

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

 



  useEffect(() => {
    navbar();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);




  return (
    <>
      <nav className={`main-nav edu-header header-sticky ${isSticky ? 'sticky' : ''}`}>
        <div className="logo">
          <Link href="/" prefetch>
            <Image src={"/assets/images/logo/logo.webp"} alt="Logo" width={100} height={100} />
          </Link>
        </div>

        <div className="d-none d-xl-block">
          <nav className="mainmenu-nav">
            <ul className="mainmenu">
              {links && links.map((el, i) => {
                if (el.explore == "1") return (

                  <>
                    <li key={i} className="has-droupdown" onClick={() => navBarFunction(el.nav_link)}>{el.name}</li>
                  </>
                )
              })}
            </ul>
          </nav>
        </div>


        <div className="registration" style={{ cursor: 'pointer' }}>
          <div className="d-flex-mob d-xl-flex">
            {user !== "Login First" && (
              <div className="cart-logo" onClick={() => navigate.push('/cart')}>
                <a className="white-box-icon"><FaShoppingCart /><span>{initalState}</span></a>
              </div>
            )}
            <div className="user-registration" onClick={handleUserRegistrationClick}>
              <a className="edu-btn btn-medium left-icon header-button">
                <FaUser /> {user ? user : "Login / Register"}
              </a>
              {user !== "Login First" && showProfileDropdown && (
                <div className="profile-dropdown" onMouseLeave={() => setShowProfileDropdown(false)}>
                  <ul>
                    <li onClick={() => navigate.push('/profile')}>My profile</li>
                    <li onClick={() => signOut()}>Logout</li>
                  </ul>
                </div>
              )}
            </div>
            <Test show={show} setShow={setShow} setMessage={setMessage} />
            <HireFromUs Hireshow={Hireshow} setHireShow={setHireShow} setMessage={setMessage} />
            <JoinUs joinForm={joinForm} setjoinForm={setjoinForm} setMessage={setMessage} />
            <div className="user-registration2" onClick={handleUserRegistrationClick}>
              <a className="white-box-icon"><FaUser /></a>
              {user !== "Login First" && showProfileDropdown && (
                <div className="profile-dropdown" onMouseLeave={() => setShowProfileDropdown(false)}>
                  <ul>
                    <li onClick={() => navigate.push('/profile')}>My profile</li>
                    <li onClick={() => signOut()}>Logout</li>
                  </ul>
                </div>
              )}
            </div>
            <div className="mobile-menu-bar ml--15 ml_sm--5 d-block d-xl-none">
              <div className="hamberger">
                <button className="white-box-icon hamberger-button" onClick={toggleMenu}>
                {isActive ? <FaTimes /> : <FaGripLines />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
   
      {megaMenu && <Megamenu categories={categories} setMegaMenu={setMegaMenu} />
      }
      <div id="mega-mob" className={`mega-pop-menu ${isActive ? 'active' : ''}`}>
        <ul className="menu col-flex">
          {links && links.map((el, i) => {
            if (el.explore == "1") return (

              <>
                <li key={i} className="men-list" onClick={() => navBarFunctionRes(el.nav_link)}>{el.name}</li>
                {menuActive && el.nav_link == "/courses" && <ResponsiveCourseMenu menuActive={menuActive} categories={categories}/>}
              </>
            )
          })}
        
        </ul>
      </div>
    </>
  );
};
