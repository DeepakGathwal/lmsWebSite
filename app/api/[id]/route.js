// 2 spaces pending 

import { NextResponse } from "next/server";
import { client } from "@/middelware/redisFile";
import { executeQuery } from "@/conn/conn";


export async  function GET(req, context){
    const {id} = context.params;
    const redisdata = await client.get(`blog${id}`);
    if(!redisdata){
        const query =  `Select blog.video_link,blog.heading,blog.banner,blog.blog_html,blog.blog_css,blog.id,blog.name,category.name as category, blog.icon, Date_Format(blog.created_at, '%d-%M-%Y') as addedAt from jtc_blogs as blog Left Join jtc_blog_category as category On category.id = blog.blog_category Where blog.deleted_by = '0' && blog.link = "${id}"  `
        const data = await executeQuery(query);
        if(data.length > 0) {
        const value = await JSON.stringify(data)
        await client.set(`blog${id}`, value,{
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


// get static pages from websites
export async  function PATCH(req, context){
  const {id} = context.params;
  const redisdata = await client.get(id);
  if(!redisdata){
      const query =  `Select page_css,page_html from jtc_website_links WHERE nav_link = '/${id}' `
      const data = await executeQuery(query);
      if(data.length > 0) {
      const value =  await JSON.stringify(data)
      await client.set(id, value,{
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

export async function POST(req, context){
  const {id} = context.params;
  const redisdata = await client.get(`category${id}`);
  if(!redisdata){
    const courceIdQuery = `Select id from jtc_courses WHERE link = '${id}'`
    const courceId = await executeQuery(courceIdQuery)
   
    if(courceId.length > 0){
      const newid = courceId[0].id
    const query =  `Select id, category_name from jtc_course_category WHERE  FIND_IN_SET(${newid},course_id ) && deleted_by = '0' `
      const data = await executeQuery(query);

      if(data.length > 0) {
      const value =  await JSON.stringify(data)
      await client.set(`category${id}`, value,{
        EX: process.env.REDIS_EXP,   
        NX: true
      });
        return NextResponse.json({data},{success : true}, {status : 200})
      }
      else return NextResponse.json({message : "Data Empty"},{success : false}, {status : 206})
    }
    else return NextResponse.json({message : "Cource Not Found"},{success : false}, {status : 206})
  }else{
   const value = await JSON.parse(redisdata)
   return NextResponse.json({data : value}, { success : true}, {status : 200})
}
}
