// 1 api
import { executeQuery } from "@/conn/conn";
import { client } from "@/middelware/redisFile";
import { NextResponse } from "next/server";




// Get All Cources WithOut Category
export async  function GET(req){
    const redisdata = await client.get("cources");
    if(!redisdata){
        const query =  `Select id, name, icon, link from jtc_courses WHERE deleted_by = '0' `
        const data = await executeQuery(query);
        if(data.length > 0) {
        const value =  await JSON.stringify(data)
        await client.set("cources", value,{
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


// All Cources Category
export async  function PATCH(req){
  const redisdata = await client.get("courceTypes");
  if(!redisdata){
      const query =  `Select * from  jtc_courses_type`
      const data = await executeQuery(query);
      if(data.length > 0) {
      const value =  await JSON.stringify(data)
      await client.set("courceTypes", value,{
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
  const {name} = await req.json();
  const redisdata = await client.get(name);
  if(!redisdata){
    const query =  `Select link,id, icon, banner,name, description,meta_tags,meta_keywords,meta_description,video_link from jtc_courses WHERE link = '${name}'`
      const data = await executeQuery(query);
      if(data.length > 0) {
      const value =  await JSON.stringify(data)
      await client.set(name, value,{
        EX: process.env.REDIS_EXP,   
        NX: true
      });
      return NextResponse.json({data},{success : true}, {status : 200})}
      else return NextResponse.json({message : "Data Empty"},{success : false}, {status : 206})
  }else{ 
   const value = await JSON.parse(redisdata)
   return NextResponse.json({data : value}, { success : true}, {status : 200})
}
}


export async  function PUT(req){
  const {id} = await req.json();
  const redisdata = await client.get(`category${id}`);
  if(!redisdata){
    const query =  `Select id, name, icon, link from jtc_courses WHERE FIND_IN_SET( ${id},category) && deleted_by = '0' `
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
  }else{ 
   const value = await JSON.parse(redisdata)
   return NextResponse.json({data : value}, { success : true}, {status : 200})
}
}
