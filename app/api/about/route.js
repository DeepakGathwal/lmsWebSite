import { executeQuery } from "@/conn/conn";
import { client } from "@/middelware/redisFile";
import { NextResponse } from "next/server";



// Get All Chossing Point
export async  function GET(req){
    const redisdata = await client.get("aboutUs");
    if(!redisdata){
        const query =  `Select description from jtc_about_points WHERE point = 'Website'`
        const data = await executeQuery(query);
        if(data.length > 0) {
        const value =  await JSON.stringify(data)
        await client.set("aboutUs", value,{
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



export async  function PATCH(req){
  const {course} = await req.json();
  const redisdata = await client.get(`viode${course}`);
  if(!redisdata){
      const query =  `Select description from jtc_about_points WHERE point = (SELECT name from jtc_courses where link = '${course}') `
      const data = await executeQuery(query);
      if(data.length > 0) {
      const value =  await JSON.stringify(data)
      await client.set(`viode${course}`, value,{
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

export async  function POST(req){
  const {course} = await req.json();
  const redisdata = await client.get(`faqs${course}`);
  if(!redisdata){
    const courseName = `SELECT name from jtc_courses where link = '${course}'`
    const callQuery = await executeQuery(courseName)
    if(callQuery.length > 0) {
    const courceName = callQuery[0].name
      const query =  `Select id,point,description from jtc_faqs WHERE  FIND_IN_SET('${courceName}',faqs_about) `
      const data = await executeQuery(query);
      if(data.length > 0) {
      const value =  await JSON.stringify(data)
      await client.set(`faqs${course}`, value,{
        EX: process.env.REDIS_EXP,   
        NX: true
      });
        return NextResponse.json({data},{success : true}, {status : 200})
      }
      else return NextResponse.json({message : "Data Empty"},{success : false}, {status : 206})
  }}else{ 
   const value = await JSON.parse(redisdata)
   return NextResponse.json({data : value}, { success : true}, {status : 200})
}
}
