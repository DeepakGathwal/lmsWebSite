// 1 api

import { executeQuery } from "@/conn/conn";
import { NextResponse } from "next/server";
import { client } from "@/middelware/redisFile";



export async function GET(req){
const redisdata =  await client.get('newEcommersCategories')
if(!redisdata){
  const query =  `Select *, (Select count(id) from jtc_ecommers_courses WHERE category = jtc_ecommers_course_types.id && jtc_ecommers_courses.deleted_by = '0' ) as courses from jtc_ecommers_course_types`
        const data = await executeQuery(query);
        if(data.length > 0){
        const value =  await JSON.stringify(data)
        await client.set("newEcommersCategories", value,{
          EX: process.env.REDIS_EXP,   
          NX: true
        });
          return NextResponse.json({data},{success : true}, {status : 200})
        }
        else return NextResponse.json({message : "Data Empty"},{success : false}, {status : 206})
}else{ 
  const value = await JSON.parse(redisdata)
  return NextResponse.json({data : value}, { success : true}, {status : 200})
  }
}

export async function PATCH(req){
  const {id} =await req.json()

const redisdata =  await client.get(`EcommersCoursePage${id}`)
if(!redisdata){
  let findQuery = ''
  if(id > 0) findQuery  = ` && category.id = ${id}`

 const courseId = `SELECT courses.id,label.label,courses.name,courses.course_link as link, courses.image,courses.total_price, courses.discount,Date_Format(courses.created_at, "%d-%m-%y") as addedDate, courses.description, category.category FROM jtc_ecommers_courses as courses LEFT JOIN jtc_ecommers_course_types as category ON category.id = courses.category  LEFT JOIN jtc_ecommers_course_label as label ON label.id = courses.label WHERE courses.deleted_by = 0 ${findQuery}`



const data = await executeQuery(courseId)
 if(data.length > 0) {
    for (let index = 0; index < data.length; index++) {
      const element = data[index].id;
    
       const newQuery = `Select (Select SUM(rating) / COUNT(rating) from jtc_ecommers_course_review WHERE course = '${element}') as rating,CONCAT(
HOUR(CAST(SEC_TO_TIME(SUM(video.timing)) AS TIME)), 'h ',
MINUTE(CAST(SEC_TO_TIME(SUM(video.timing)) AS TIME)), 'm ',
SECOND(CAST(SEC_TO_TIME(SUM(video.timing)) AS TIME)), 's'
) as totalTime, COUNT(video.id)  as videos, COUNT(review.id) as review from jtc_ecommers_course_chapter as chapter Left join jtc_ecommers_course_review as review On review.course = ${element} and review.deleted_by = '0' LEFT JOIN jtc_ecommers_videos as video On FIND_IN_SET(chapter.id,  video.chapter_id ) && video.deleted_by = '0'  WHERE chapter.deleted_by = '0' && FIND_IN_SET( ${element},chapter.course_id)`

    const runQuery = await executeQuery(newQuery)
    if(runQuery.length > 0){
     data[index]["total_videos"] =   runQuery[0]?.videos 
         data[index]["videoTime"] =  runQuery[0]?.totalTime
     data[index]["rating"] = runQuery[0]?.rating 
  }
}



  const value =  await JSON.stringify(data)
  await client.set(`EcommersCoursePage${id}`, value,{
    EX: process.env.REDIS_EXP,   
    NX: true
  });
    return NextResponse.json({data},{success : true}, {status : 200})
  }
  else return NextResponse.json({message : "Data Empty"},{success : false}, {status : 206})
}else{ 
  const value = await JSON.parse(redisdata)
  return NextResponse.json({data : value}, { success : true}, {status : 200})
  
  }
}

export async function POST(req){
  const {id} = await req.json()
 
  const redisdata =  await client.get(`EcommersCategories${id}`)
if(!redisdata){
  const query =  `Select chapter.chapter, chapter.id , COUNT(video.id)  as videos, SEC_TO_TIME(SUM(video.timing)) as totalTime from jtc_ecommers_course_chapter as chapter  LEFT JOIN jtc_ecommers_videos as video On FIND_IN_SET(chapter.id,  video.chapter_id) && video.deleted_by = '0' WHERE chapter.deleted_by = '0' && FIND_IN_SET( ${id},chapter.course_id) GROUP BY 
    chapter.chapter, chapter.id`  

  const data =  await executeQuery(query)

 for (let index = 0; index < data.length; index++) {
  const element = data[index].totalTime;
    const timequery = `SELECT 
    CONCAT(
        HOUR(CAST('${element}' AS TIME)), 'h ',
        MINUTE(CAST('${element}' AS TIME)), 'm ',
        SECOND(CAST('${element}' AS TIME)), 's '
    ) AS time_in_hms`

     const executeApi =  await executeQuery(timequery)
    
    if(executeApi.length > 0) data[index]["totalTime"] = executeApi[0].time_in_hms;
        
  }

  const value =  await JSON.stringify(data)
  await client.set(`EcommersCategories${id}`, value,{
    EX: process.env.REDIS_EXP,   
    NX: true
  });
  return NextResponse.json({data},{success : true}, {status : 200})
}else{ 
  const value = await JSON.parse(redisdata)
  return NextResponse.json({data : value}, { success : true}, {status : 200})
  }
}

export async function PUT(req){
  const redisdata =  await client.get('EcommersLavel')
  if(!redisdata){
    const query =  `Select * from jtc_ecommers_course_label`
    const data = await executeQuery(query);
  
          if(data.length > 0) {
          const value =  await JSON.stringify(data)
          await client.set("EcommersLavel", value,{
            EX: process.env.REDIS_EXP,   
            NX: true
          });
            return NextResponse.json({data},{success : true}, {status : 200})
          }
          else return NextResponse.json({message : "Data Empty"},{success : false}, {status : 206})
  }else{ 
    const value = await JSON.parse(redisdata)
    return NextResponse.json({data : value}, { success : true}, {status : 200})
    }
}

