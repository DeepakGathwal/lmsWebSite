import { executeQuery } from "@/conn/conn";
import { NextResponse } from "next/server";
import { client } from "@/middelware/redisFile";

export async function GET(req){
 
  const { searchParams } = new URL(req.url)
  const id = await searchParams.get('id')
const redisdata =  await client.get(`Ecommerscourse${id}`)
if(!redisdata){
  const courseId = `SELECT courses.certificates,courses.banner,courses.video_link,courses.id,label.label,courses.name,courses.course_link as link, courses.image,courses.total_price, courses.discount,Date_Format(courses.created_at, "%d-%m-%y") as addedDate, courses.description, category.category FROM jtc_ecommers_courses as courses LEFT JOIN jtc_ecommers_course_types as category ON category.id = courses.category  LEFT JOIN jtc_ecommers_course_label as label ON label.id = courses.label WHERE courses.deleted_by = 0 && course_link = '${id}' `


const data = await executeQuery(courseId)
    if(data.length > 0) {
        const element = data[0].id
      
        const newQuery = `Select (Select SUM(rating) / COUNT(rating) from jtc_ecommers_course_review WHERE course = '${element}') as rating,Count(review.id) as totalrating,CONCAT(
    HOUR(CAST(SEC_TO_TIME(SUM(video.timing)) AS TIME)), 'h ',
    MINUTE(CAST(SEC_TO_TIME(SUM(video.timing)) AS TIME)), 'm ',
    SECOND(CAST(SEC_TO_TIME(SUM(video.timing)) AS TIME)), 's'
) as totalTime, COUNT(video.id)  as videos  from jtc_ecommers_course_chapter as chapter  Left join jtc_ecommers_course_review as review On review.course = ${element} and review.deleted_by = '0'  LEFT JOIN jtc_ecommers_videos as video On FIND_IN_SET(chapter.id,  video.chapter_id ) && video.deleted_by = '0' WHERE chapter.deleted_by = '0' && FIND_IN_SET( ${element},chapter.course_id)`
  
        const runQuery = await executeQuery(newQuery)
        if(runQuery.length > 0){
            data[0]["total_videos"] = runQuery[0]?.videos
          
            data[0]["videoTime"] = runQuery[0]?.totalTime
            data[0]["rating"] = runQuery[0]?.rating
            data[0]["review"] = runQuery[0]?.totalrating
                }
 
    const value =  await JSON.stringify(data)
    await client.set(`Ecommerscourse${id}`, value, {
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

export async function PUT(req){
 const {id} = await req.json()

const redisdata =  await client.get(`EcommerscourseLear${id}`)
if(!redisdata){
  const query =  `SELECT point FROM jtc_ecommers_course_learn WHERE FIND_IN_SET(${id},course_id)  > 0 `
        const data = await executeQuery(query);
        if(data.length > 0) {
        const value =  await JSON.stringify(data)
        await client.set(`EcommerscourseLear${id}`, value ,{
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
  const {id} = await req.json()
  const redisdata =  await client.get(`EcommerscourseRequirement${id}`)
  if(!redisdata){
    const query =  id && `SELECT requirement FROM jtc_ecommers_course_requirements WHERE FIND_IN_SET(${id},course_id)  > 0 `
          const data = await executeQuery(query);
          if(data.length > 0) {
          const value =  await JSON.stringify(data)
          await client.set(`EcommerscourseRequirement${id}`, value,{
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

const redisdata =  await client.get(`EcommerscourseFaqs${id}`)
if(!redisdata){
  const query =  id && `SELECT id,point,description FROM jtc_ecommers_faqs WHERE FIND_IN_SET(${id},faqs_about)  > 0 `
        const data = await executeQuery(query);
        if(data.length > 0) {
        const value =  await JSON.stringify(data)
        await client.set(`EcommerscourseFaqs${id}`, value,{
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

export async function DELETE(req){
  const { searchParams } = new URL(req.url)
  const id = await searchParams.get('id')
  const redisdata =  await client.get(`EcommerscourseReview${id}`)
if(!redisdata){
  const query = `Select user.name, user.image,review.review, review.rating, review.id from jtc_ecommers_course_review as review Inner Join jtc_ecommers_users as user On review.user = user.id WHERE review.course = '${id}' `
  const data =  await executeQuery(query)
  

  if(data.length > 0) {



    const value =  await JSON.stringify(data)
    await client.set(`EcommerscourseReview${id}`, value,{
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