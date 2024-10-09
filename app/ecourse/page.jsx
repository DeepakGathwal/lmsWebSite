'use client'
import React, { useState, useEffect, useContext } from 'react';
import { Pagination } from "antd";
import { FaFilter, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import FontAwesome icons or any other icons library
import Slider from '@mui/material/Slider';
import { allFilters, allTypesOfCourses, coursesLavel } from '@/lib/apis';
import { getCookie, deleteCookie } from "cookies-next";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { AccountContext } from '@/apis/apicontext';
import { adding, allCartItems, processPayment } from '@/functions/commonFunctions';
import CourseCard from '@/components/courseCard';

export default function Course() {
    const router = useRouter();
    const [values, setValues] = useState([1009, 1509]);
    const [committedValues, setCommittedValues] = useState([1009, 1509]);
    const [selectedLevel, setSelectedILevel] = useState([]);
    const [selectedCat, setSelectedCat] = useState([]);
    const [sidebarVisible, setSidebarVisible] = useState(false); // Initially set to false
    const [state, setState] = useState([]);
    const [total, setTotal] = useState("");
    const { addRemove } = useContext(AccountContext);
    const [page, setPage] = useState(1);
    const [maxPrice, setMaxPrice] = useState(0);
    const [postPerpage, setPostPerPage] = useState(10);
    const [minPrice, setMinPrice] = useState(0);
    const [dublicate, setDublicate] = useState([]);
    const [label, setlavel] = useState([]);

    const [category, setCategory] = useState([]);

    const handleSlide = (event, newValues) => {
        setValues(newValues);
    };

    const handleSlideCommitted = async (event, newValues) => {
        setCommittedValues(newValues);
        const { data } = await allFilters(selectedLevel, selectedCat, newValues);
        if (data) {
            setDublicate(data);
            setState(data);
        }
    };

    const doPayment = async (e, ab) => {
        const data = await processPayment(e, ab);
        if (data === 'Login First') 
            return router.push("/authorization");
        
        else if(data > 0) return router.push(`/course/${e.link}`);
    };


    const allData = async () => {
        let id = 0;
        const cookie =  getCookie('course')
        if(cookie) id = cookie
        const cartItems = await allCartItems(id)

        cartItems && setDublicate(cartItems);
        const maxValue = cartItems && cartItems.map((av) => parseInt(av.total_price * ((100 - av.discount) / 100)));
        maxValue && setMaxPrice(Math.max(...maxValue));
        maxValue && setMinPrice(Math.min(...maxValue));
        allCategories();
        cartItems && setTotal(cartItems.length);
        deleteCookie("course")
        return cartItems && setState(cartItems);
    };

    const allLavel = async () => {
        const { data } = await coursesLavel();
        return data && setlavel(data);
    };

    const allCategories = async () => {
        const { data } = await allTypesOfCourses();
        allLavel();
        return data && setCategory(data);
    };

    useEffect(() => {
        allData();
    }, []);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 991) {
                setSidebarVisible(false);
            } else {
                setSidebarVisible(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const indexOfLastPage = page * postPerpage;
    const indexOfFirstPage = indexOfLastPage - postPerpage;
    const currentPosts = state && state.slice(indexOfFirstPage, indexOfLastPage);

    const addOnCart = async (about, ab) => {
        const { data } = await adding(about, ab.id)
        if (data == 'Login First') 

            return router.push("/authorization")


        else {

            const data = [...state]
            data.map((el) => {
                if (el.id == ab.id) {
                    if (about == "cart" && !ab.cartStatus) {

                        return ab.cartStatus = 1
                    }
                    else if (about == "cart" && ab.cartStatus == 1) {

                        return delete ab.cartStatus
                    }
                    if (about == "whishlist" && ab.wishStatus == 1) {

                        return delete ab.wishStatus
                    }
                    else if (about == "whishlist" && !ab.wishStatus) {

                        return ab.wishStatus = 1
                    }

                }
            })

            await addRemove({ type: "INCR" });
            return data && setState(data)

        }

    }

    const pricefilter = async (filter) => {
        let sortedData;
        if (filter === "high") {
            sortedData = dublicate.slice().sort((a, b) => a.total_price - b.total_price);
        } else if (filter === "low") {
            sortedData = dublicate.slice().sort((a, b) => b.total_price - a.total_price);
        } else sortedData = dublicate.filter((ab) => ab.total_price === 0);

        return sortedData && await setState(sortedData);
    };

    const datefilter = async (filter) => {
        let sortedData;
        if (filter === "new") {
            sortedData = dublicate.slice().sort((a, b) => new Date(a.addedDate) - new Date(b.addedDate));
        } else if (filter === "old") {
            sortedData = dublicate.slice().sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
        } 
        return sortedData && await setState(sortedData);
    };

    const filterData = async () => {
        if (selectedCat.length === 0 && selectedLevel.length === 0) {
            return allData();
        }
        const { data } = await allFilters(selectedLevel, selectedCat, values);

        if (data) {
            data && setDublicate(data);
            return data && setState(data);
        }
    };

    useEffect(() => {
        filterData();
    }, [selectedLevel, selectedCat]);

    function checkboxLavel(e) {
        let isSelected = e.target.checked;
        let value = e.target.value;
        if (isSelected) {
            setSelectedILevel([...selectedLevel, value]);
        } else {
            setSelectedILevel((prevData) => {
                return prevData.filter((id) => id !== value);
            });
        }
    }

    function checkboxCategory(e) {
        let isSelected = e.target.checked;
        let value = e.target.value;
        if (isSelected) {
            setSelectedCat([...selectedCat, value]);
        } else {
            setSelectedCat((prevData) => {
                return prevData.filter((id) => {
                    return id !== value;
                });
            });
        }
    }

    const onShowSizeChange = (current, pageSize) => {
        return setPostPerPage(pageSize);
    };

    const itemRender = (current, type, originalElement) => {
        if (type === "prev") {
            return <FaChevronLeft />; // Render FontAwesome icon for Previous
        }
        if (type === "next") {
            return <FaChevronRight />; // Render FontAwesome icon for Next
        }
        return originalElement;
    };

    return (
        <>
            <div className="edu-course-area eduvibe-home-two-course course-three-wrapper edu-section-gap bg-color-white">
                <div className="container eduvibe-animated-shape">
                    <div className="row g-5 align-items-center mb--30">
                        <div className="col-lg-6 col-6 col-md-6">
                            <div className="section-title text-start" >
                                <span className="pre-title">Who We Are</span>
                                <h3 className="title">We Offer The Best Courses</h3>
                            </div>
                        </div>
                        <div className="col-lg-6 col-6 col-md-6 d-flex justify-content-end">
                            <div className="button-group isotop-filter" style={{ marginLeft: "30%" }}>
                                <button className="edu-btn" onClick={toggleSidebar}>
                                    <FaFilter /> filter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="edu-course-area bg-color-white edu-section-gapBottom">
                <div className="container">
                    <div className="row g-5">
                        <div className={`mob-view order-1 col-lg-4 ${sidebarVisible ? '' : 'd-none'}`}>
                            <button className='edu-btn close-sidebar-mob' onClick={toggleSidebar}>X</button>
                            <aside className="edu-course-sidebar">
                                <div className="edu-course-widget widget-shortby">
                                    <div className="inner">
                                        <h5 className="widget-title">Sort By</h5>
                                        <div className="content">
                                            <div className="edu-form-check">
                                                <input type="radio" id="short-check1" name="courseDateSort" onChange={(e) => datefilter("new")} />
                                                <label htmlFor="short-check1">Newest</label>
                                            </div>
                                            <div className="edu-form-check">
                                                <input type="radio" id="short-check2" name="courseDateSort" onChange={(e) => datefilter("old")} />
                                                <label htmlFor="short-check2">Oldest</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="edu-course-widget widget-category mt--40">
                                    <div className="inner">
                                        <h5 className="widget-title">Sort by Categories</h5>
                                        <div className="content">
                                            {category && category.map((ab, i) => (
                                                <div key={i} className="edu-form-check">
                                                    <input type="checkbox" id={`category${ab.id}`} value={ab.id} onClick={(e) => checkboxCategory(e)} />
                                                    <label htmlFor={`category${ab.id}`} checked={selectedCat.includes(ab.category)}>{ab.category}<span>({ab.courses})</span></label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="edu-course-widget widget-shortby mt--40">
                                    <div className="inner">
                                        <h5 className="widget-title">Sort by Level</h5>
                                        <div className="content">
                                            {label && label.map((ac, i) => (
                                                <div key={i} className="edu-form-check">
                                                    <input type="checkbox" id={`label${ac.id}`} value={ac.id} onClick={checkboxLavel} />
                                                    <label htmlFor={`label${ac.id}`} checked={selectedLevel.includes(ac.label)}>{ac.label}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="edu-course-widget widget-shortby mt--40">
                                    <div className="inner">
                                        <h5 className="widget-title">Sort by Price</h5>
                                        <div className="content">
                                            <div className="edu-form-check">
                                                <input type="radio" id="price-check2" name="coursePriceSort" onChange={(e) => pricefilter("low")} />
                                                <label htmlFor="price-check2">Price: Low to High</label>
                                            </div>
                                            <div className="edu-form-check">
                                                <input type="radio" id="price-check3" name="coursePriceSort" onChange={(e) => pricefilter("high")} />
                                                <label htmlFor="price-check3">Price: High to Low</label>
                                            </div>
                                            <div className="edu-form-check">
                                                <input type="radio" id="price-check4" name="coursePriceSort" onChange={(e) => pricefilter("free")} />
                                                <label htmlFor="price-check4">Free</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="edu-course-widget widget-shortby mt--40">
                                    <div className="inner">
                                        <h5 className="widget-title">Filter By Price</h5>
                                        <div className="content">
                                            <div className="price_filter s-filter clear">
                                                <form action="#" method="GET">
                                                    <Box>
                                                        <Typography id="range-slider" gutterBottom>
                                                            Price: ₹{committedValues[0]} - ₹{committedValues[1]}
                                                        </Typography>
                                                        <Slider
                                                            value={values}
                                                            onChange={handleSlide}
                                                            onChangeCommitted={handleSlideCommitted}
                                                            valueLabelDisplay="auto"
                                                            min={minPrice}
                                                            max={maxPrice + 1000}
                                                            step={1000}
                                                            id="slider-range"
                                                            aria-labelledby="range-slider"
                                                        />
                                                        <Box className="slider__range--output">
                                                            <Box className="price__output--wrap">
                                                                <Box className="price--output">
                                                                    <Typography component="span">Price :</Typography>
                                                                    <input
                                                                        type="text"
                                                                        id="amount"
                                                                        value={`₹${committedValues[0]} - ₹${committedValues[1]}`}
                                                                        readOnly
                                                                    />
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>

                        <div className={`col-lg-${sidebarVisible ? '8' : '12'}`}>
                            <div className="row g-5">
                                {currentPosts && currentPosts.length > 0 ?
                                    state.map((ab, i) => (
                                        <div key={i} className={`col-12 col-sm-12 col-md-6 col-xl-${sidebarVisible ? '6' : '4'} col-lg-${sidebarVisible ? '6' : '4'}`}>
                                            <CourseCard ab={ab} addOnCart={addOnCart} doPayment={doPayment} />
                                        </div>
                                    )) :
                                    <h1>No Data</h1>
                                }
                            </div>

                            <div className="col-lg-12 mt--60">
                                <div className="details text-center mb-5">
                                    <span> Showing {page * postPerpage - postPerpage + 1} to {page * postPerpage} of {total} entries</span>
                                </div>
                                <Pagination
                                    onChange={(value) => setPage(value)}
                                    pageSize={postPerpage}
                                    total={total}
                                    current={page}
                                    showSizeChanger
                                    showQuickJumper
                                    onShowSizeChange={onShowSizeChange}
                                    itemRender={itemRender}
                                    className='edu-pagination'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
