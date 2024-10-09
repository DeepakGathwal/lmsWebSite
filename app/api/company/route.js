import { executeQuery } from "@/conn/conn";
import { client } from "@/middelware/redisFile";
import { NextResponse } from "next/server";
import { sendEmail } from "@/middelware/sendEmail";



// Get All Chossing Point
export async  function GET(req){
    const redisdata = await client.get("company");
    if(!redisdata){
        const query =  `Select name, icon, link from jtc_companies WHERE deleted_by = '0' `
        const data = await executeQuery(query);
        if(data.length > 0) {
        const value =  await JSON.stringify(data)
        await client.set("company", value,{
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
  const {name, phone, company, course, desigination,  email} = await req.json();
  const findCource =   `Select name from jtc_courses WHERE id = ${course}`
  const getCourceQuery = await executeQuery(findCource)
  if(getCourceQuery.length == 0) return  NextResponse.json({message : "Cource Not Found"},{success : false}, {status : 206})
   const  query =  `Insert into jtc_enquiry_form SET course = "${course}",desigination = "${desigination}",company = "${company}",name = "${name}", email = "${email}" , phone_number = "${phone}",  form_id = '2'`

   const insertData = await executeQuery(query);
  if(insertData.affectedRows >  0){
    const courceName = getCourceQuery[0].name

      const message = `
      <table style="border-collapse: collapse; border: 2px solid black;width: 50%">
        <tr>
            <th style="border: 2px solid black; padding: 8px; font-size: 18px">Name</th>
            <td style="border: 2px solid black; padding: 8px;font-size: 16px">${name}</td>
        </tr>
        <tr>
            <th style="border: 2px solid black; padding: 8px;font-size: 18px">Phone</th>
            <td style="border: 2px solid black; padding: 8px;font-size: 16px">${phone}</td>
        </tr>
        <tr>
            <th style="border: 2px solid black; padding: 8px;font-size: 18px">Company Name</th>
            <td style="border: 2px solid black; padding: 8px;font-size: 16px">${company}</td>
        </tr>
        <tr>
            <th style="border: 2px solid black; padding: 8px;font-size: 18px">Designation</th>
            <td style="border: 2px solid black; padding: 8px;font-size: 16px">${desigination}</td>
        </tr>
        <tr>
            <th style="border: 2px solid black; padding: 8px;font-size: 18px">Hiring Profile</th>
            <td style="border: 2px solid black; padding: 8px;font-size: 16px">${courceName}</td>
        </tr>
    </table>`
      const subject = "Hire From Us"
      const options = {message, subject, EMAIL_TO : process.env.EMAIL_TO};
     await sendEmail(options)
      const notify = `${name} has filled ${subject} form`
     return NextResponse.json({message : "Form Submited Successfully", notification : notify, success : true}, {status : 200})
    }
  else return NextResponse.json({message : "Form Submition Issue"},{success : false}, {status : 206})
}


export async  function POST(req){
  const {name, phone,email, course} = await req.json();
  const findCource =  `Select course.id,course.name as course, brochures.brochure from jtc_courses as course INNER JOIN jtc_brochures as brochures On brochures.course_id = course.id  WHERE course.link = '${course}' `
  const getCourceQuery = await executeQuery(findCource)
  if(getCourceQuery.length == 0) return  NextResponse.json({message : "Cource Not Found"},{success : false}, {status : 206})
  const courseId = await getCourceQuery[0].id
  const query =  `Insert into jtc_enquiry_form SET course = "${courseId}",name = "${name}", email = "${email}" , phone_number = "${phone}",  form_id = '5'`

   const insertData = await executeQuery(query);
  if(insertData.affectedRows >  0){
    const courceName = getCourceQuery[0].course

      const message = `
      <table style="border-collapse: collapse; border: 2px solid black;width: 50%">
        <tr>
            <th style="border: 2px solid black; padding: 8px; font-size: 18px">Name</th>
            <td style="border: 2px solid black; padding: 8px;font-size: 16px">${name}</td>
        </tr>
        <tr>
            <th style="border: 2px solid black; padding: 8px;font-size: 18px">Phone</th>
            <td style="border: 2px solid black; padding: 8px;font-size: 16px">${phone}</td>
        </tr>
        <tr>
            <th style="border: 2px solid black; padding: 8px;font-size: 18px">Course</th>
            <td style="border: 2px solid black; padding: 8px;font-size: 16px">${courceName}</td>
        </tr>
    </table>
      `
       
      const subject = "Download Curriculum"
      const options = {message, subject, EMAIL_TO : process.env.EMAIL_TO};

     await sendEmail(options)
     const pdfFile = Buffer.from(getCourceQuery[0].brochure, 'base64');
     return new NextResponse(pdfFile, { headers: { 'content-type': 'application/text' } });
  
    }
  else return NextResponse.json({message : "Form Submition Issue"},{success : false}, {status : 206})
}



// Banner Header Section
export async function PUT(req){
  const {header} = await req.json()
  const redisdata = await client.get(`Ecommers${header}`);
  if(!redisdata){
    const query =  `Select * from jtc_ecommers_sections WHERE component_name = '${header}' && deleted_by = '0'`
  const data = await executeQuery(query)
  if(data.length > 0) {
     
    const value = await JSON.stringify(data)
    await client.set(`Ecommers${header}`, value,{
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



// Get All Blogs
export async  function DELETE(req){
  const redisdata = await client.get("blogs");
  if(!redisdata){
      const query = `Select blog.link,blog.id,blog.name,category.name as category, blog.icon, Date_Format(blog.created_at, '%d-%M-%Y') as addedAt from jtc_blogs as blog Left Join jtc_blog_category as category On category.id = blog.blog_category Where blog.deleted_by = '0' Order by blog.id desc`
      const data = await executeQuery(query);
      if(data.length > 0) {
     
      const value = await JSON.stringify(data)
      await client.set("blogs", value,{
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
