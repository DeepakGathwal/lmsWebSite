import { executeQuery } from "@/conn/conn";
import { client } from "@/middelware/redisFile";
import { NextResponse } from "next/server";



// Get All Chossing Point
export async  function GET(req){
    const redisdata = await client.get("tutorialType");
    if(!redisdata){
        const query =  `Select id, category from jtc_tutorial_type`
        const data = await executeQuery(query);
        if(data.length > 0) {
        const value =  await JSON.stringify(data)
        await client.set("tutorialType", value,{
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

// Get All Chossing Point
export async  function POST(req){
  const {type} =  await req.json();
  let queryApi = ''
    if(type == 0) queryApi = ' order by id desc Limit 12'
    else queryApi = ` &&  FIND_IN_SET(${type},category) `
    const redisdata = await client.get(`tutorial${type}`);
    if(!redisdata){
        const query =  `Select id,link,name,icon, meta_tags,meta_keywords,meta_description from jtc_tutorial_cources WHERE  deleted_by = '0'  ${queryApi}`
        const data = await executeQuery(query);
        
        if(data.length > 0) {
        for (let index = 0; index < data.length; index++) {
          const courceId = data[index].id
            const query =  `Select link from jtc_tutorials_topics where cource_id = ${courceId} && category_id  = (Select id from jtc_tutorial_chapter WHERE cource_Id = ${courceId} Order by id asc Limit 1) Order by id asc Limit 1`
            const executeApi = await executeQuery(query)
                  if(executeApi.length > 0){
          const values = await executeApi.map((el) => el.link)
           data[index]["topic"] = String(values);
            }
  
          }
    
        const value =  await JSON.stringify(data)
        await client.set(`tutorial${type}`, value,{
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
  const {course} =  await req.json();
    const redisdata = await client.get(`chapter${course}`);
    if(!redisdata){
        const query =  `Select id,category_name from jtc_tutorial_chapter WHERE  cource_Id = (Select id from jtc_tutorial_cources WHERE  deleted_by = '0' && link = "${course}" )  && deleted_by = '0' `
        const data = await executeQuery(query);
        
        if(data.length > 0) {
        for (let index = 0; index < data.length; index++) {
          const courceId = data[index].id
            const query =  `Select heading,link from jtc_tutorials_topics where category_id  = ${courceId} && deleted_by = '0'`
            const executeApi = await executeQuery(query)

                  if(executeApi.length > 0){
      
           data[index]["topic"] = executeApi;
            }
  
          }
    
        const value =  await JSON.stringify(data)
        await client.set(`chapter${course}`, value,{
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
  const {topic} =  await req.json();
    const redisdata = await client.get(`topic${topic}`);
    if(!redisdata){
        const query =  `Select tutorial_css,tutorial_html,meta_description,meta_keywords,meta_tags, id, cource_id from jtc_tutorials_topics WHERE link = "${topic}" && deleted_by = '0' `
        const data = await executeQuery(query);

        if(data.length > 0) {
        const value =  await JSON.stringify(data)
        await client.set(`topic${topic}`, value,{
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