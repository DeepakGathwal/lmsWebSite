import { executeQuery } from "@/conn/conn";
import { client } from "@/middelware/redisFile";
import { NextResponse } from "next/server";


// Get All Chossing Point
export async  function GET(req){
    const redisdata = await client.get("testimonials");
    if(!redisdata){
        const query =  `Select name, image, description, read_link from jtc_testimonials WHERE deleted_by = '0' `
        const data = await executeQuery(query);
        if(data.length > 0) {
        const value =  await JSON.stringify(data)
        await client.set("testimonials", value,{
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


// next Button 
export async function PUT(req){
  const {course, id} =  await req.json();
  const redisdata = await client.get(`next${course, id}`);
  if(!redisdata){
      const query =  `Select link from jtc_tutorials_topics WHERE id > "${id}" && deleted_by = '0' && cource_id = ${course} Order by id ASC Limit 1 `
      const data = await executeQuery(query);

      if(data.length > 0) {
      const value =  await JSON.stringify(data)
      await client.set(`next${course, id}`, value,{
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
  const {course, id} =  await req.json();
  const redisdata = await client.get(`prev${course, id}`);
  if(!redisdata){
      const query =  `Select link from jtc_tutorials_topics WHERE id < "${id}" && deleted_by = '0' && cource_id = ${course} Order by id DESC Limit 1 `
      const data = await executeQuery(query);

      if(data.length > 0) {
      const value =  await JSON.stringify(data)
      await client.set(`prev${course, id}`, value,{
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


export async function POST(req) {
  const {arrayOfLevel,arrayOfCategory, price} = await req.json()
  const redisdata = await client.get(`ecommers${[...arrayOfLevel,"Both",...arrayOfCategory, "AND", ...price]}`);
  if(!redisdata){
    let technologyFilter = ``
    if(arrayOfLevel.length > 0){
      technologyFilter = ` && courses.label IN (${arrayOfLevel})`
  
    }
    let categoryFilter = ``
    if(arrayOfCategory.length > 0){
     
      categoryFilter = `  && courses.category IN (${arrayOfCategory})`
    }

    let priceFilter =``
    if(price.length > 0){
      if(price[0] > 1009 && price[1] > 1509)
 
     priceFilter = ` && courses.total_price * ((100 - courses.discount) / 100)  BETWEEN ${price[0]} AND  ${price[1]}`
   
  }

    const query =  `SELECT courses.id,label.label,courses.name,courses.course_link as link, courses.image,courses.total_price, courses.discount,Date_Format(courses.created_at, "%d-%m-%y") as addedDate, courses.description,  category.category FROM jtc_ecommers_courses as courses LEFT JOIN jtc_ecommers_course_types as category ON category.id = courses.category  LEFT JOIN jtc_ecommers_course_label as label ON label.id = courses.label WHERE courses.deleted_by = 0  ${categoryFilter} ${technologyFilter} ${priceFilter} `
    const data = await executeQuery(query);

    if(data.length > 0) {
      for (let index = 0; index < data.length; index++) {
        const element = data[index].id;
      
      const newQuery = `Select (Select SUM(rating) / COUNT(rating) from jtc_ecommers_course_review WHERE course = '${element}') as rating,CONCAT(
HOUR(CAST(SEC_TO_TIME(SUM(video.timing)) AS TIME)), 'h ',
MINUTE(CAST(SEC_TO_TIME(SUM(video.timing)) AS TIME)), 'm ',
SECOND(CAST(SEC_TO_TIME(SUM(video.timing)) AS TIME)), 's'
) as totalTime, COUNT(video.id)  as videos from jtc_ecommers_course_chapter as chapter  LEFT JOIN jtc_ecommers_videos as video On FIND_IN_SET(chapter.id,  video.chapter_id ) && video.deleted_by = '0'  WHERE chapter.deleted_by = '0' && FIND_IN_SET( ${element},chapter.course_id)`
 
      const runQuery = await executeQuery(newQuery)
      if(runQuery.length > 0){
       data[index]["total_videos"] =   runQuery[0]?.videos 
           data[index]["videoTime"] =  runQuery[0]?.totalTime
       data[index]["rating"] = runQuery[0]?.rating 
    }
      }
    }

  const value =  await JSON.stringify(data)
  await client.set(`ecommers${[...arrayOfLevel,"Both",...arrayOfCategory, "AND", ...price]}`, value,{
    EX: process.env.REDIS_EXP,   
    NX: true
  });
  return NextResponse.json({data }, { success : true}, {status : 200})
}else{ 
  const value = await JSON.parse(redisdata)

  return NextResponse.json({data : value}, { success : true}, {status : 200})
}
}
