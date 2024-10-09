import React from 'react'
import Courses from '@/components/courses'
import Jtcwork from '@/components/jtcwork'
import CourseCategory from '@/components/coursesTypes'
import Coursebycategory from '@/components/coursebycategory'
import Bannerareaupdate from '@/components/bannerareaupdate'


export default function Home(){
  return (
    <>
        <Bannerareaupdate/>
        <CourseCategory/>
        <Courses/>
        <Jtcwork/>
        <Coursebycategory/>
    </>
  )
}
