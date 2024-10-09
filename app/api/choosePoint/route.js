// 1 api more

import { executeQuery } from "@/conn/conn";
import { sendEmail } from "@/middelware/sendEmail";
import { NextResponse } from "next/server";
import { client } from "@/middelware/redisFile";



// // Get All Chossing Point
export async  function GET(req){
    const redisdata = await client.get("choosePoint");
    if(!redisdata){
        const query =  `Select point from jtc_choosing_point `
        const data = await executeQuery(query);
        if(data.length > 0) {
        const value = await JSON.stringify(data)
        await client.set("choosePoint", value,{
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
    const {name, phone, course, email} = await req.json();
    const findCource =   `Select name from jtc_courses WHERE id = ${course}`
    const getCourceQuery = await executeQuery(findCource)
    if(getCourceQuery.length == 0) return  NextResponse.json({message : "Cource Not Found"},{success : false}, {status : 206})
    const  query =  `Insert into jtc_enquiry_form SET name = "${name}", email = "${email}" , phone_number = "${phone}", course =  "${course}", form_id = '1'`
        const insertData = await executeQuery(query);
    if(insertData.affectedRows >  0){
        const courceName = getCourceQuery[0].name

        const message = `<table style="border-collapse: collapse; border: 2px solid black;width: 50%">
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
        const subject = "Get In Touch"
        const options = {message, subject, EMAIL_TO : process.env.EMAIL_TO};
   await sendEmail(options)
   const notify = `${name} has filled ${subject} form`
   return NextResponse.json({message : "Form Submited Successfully", notification : notify, success : true}, {status : 200})
    }
    else return NextResponse.json({message : "Form Submition Issue"},{success : false}, {status : 206})
}


export async  function PUT(req){
    const {name, phone, id,email} = await req.json()
    const findCource =  `Select TIME_FORMAT(time_to, '%h:%i %p') as time_to,TIME_FORMAT(time_from, '%h:%i %p') as time_from, Date_Format(date, '%d-%M-%y') as date,course_id, week_days from jtc_batches WHERE deleted_by = '0' && id = ${id}`
    
    const getCourceQuery = await executeQuery(findCource)
       if(getCourceQuery.length == 0) return  NextResponse.json({message : "Batch Not Found"},{success : false}, {status : 206})
          const courceId = getCourceQuery[0].course_id
          const date = getCourceQuery[0].date
          const time_to = getCourceQuery[0].time_to
          const time_from = getCourceQuery[0].time_from
          const week_days = getCourceQuery[0].week_days
          const query = `Insert into jtc_enquiry_form SET batch=${id},name = "${name}", email = "${email}" , phone_number = "${phone}", course =  "${courceId}", form_id = '4'`
        
          const data = await executeQuery(query);
          if(data.affectedRows > 0) {
  
            const message =  `
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
            <th style="border: 2px solid black; padding: 8px;font-size: 18px">Batch Date</th>
            <td style="border: 2px solid black; padding: 8px;font-size: 16px">${date}</td>
        </tr>
        <tr>
            <th style="border: 2px solid black; padding: 8px;font-size: 18px">Batch Time</th>
            <td style="border: 2px solid black; padding: 8px;font-size: 16px">${time_to} - ${time_from}</td>
        </tr>
        <tr>
            <th style="border: 2px solid black; padding: 8px;font-size: 18px">Batch Days</th>
            <td style="border: 2px solid black; padding: 8px;font-size: 16px">${week_days}</td>
        </tr>
    </table>` 
            const subject = "Batch Enroll"
            const options = {message, subject, EMAIL_TO : process.env.EMAIL_TO};
           await sendEmail(options)
            const notify = `${name} has filled ${subject} form`
           return NextResponse.json({message : "Form Submited Successfully", notification : notify, success : true}, {status : 200})
          }
          else return NextResponse.json({message : "Data Empty"},{success : false}, {status : 206})
}


export async  function PATCH(req){
    const {name, phone, role,  email} = await req.json();
    const findRole =   `Select role from jtc_roles WHERE id = '${role}'`

    const getRoleQuery = await executeQuery(findRole)
    if(getRoleQuery.length == 0) return  NextResponse.json({message : "Cource Not Found"},{success : false}, {status : 206})

    const  query =  `Insert into jtc_enquiry_form SET course = "${role}",name = "${name}", email = "${email}" , phone_number = "${phone}",  form_id = '3'`

    const insertData = await executeQuery(query);
    if(insertData.affectedRows >  0){
        const roleName = getRoleQuery[0].role
     
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
        <th style="border: 2px solid black; padding: 8px;font-size: 18px">Hiring Profile</th>
        <td style="border: 2px solid black; padding: 8px;font-size: 16px">${roleName}</td>
    </tr>
</table>
        ` 
        const subject = "Join Us Form"
        const options = {message, subject, EMAIL_TO : process.env.EMAIL_TO};
       await sendEmail(options)
        const notify = `${name} has filled ${subject} form`
       return NextResponse.json({message : "Form Submited Successfully", notification : notify, success : true}, {status : 200})

    }
    else return NextResponse.json({message : "Form Submition Issue"},{success : false}, {status : 206})
}



// Get All footer and navbar
export async  function DELETE(req){
    const { searchParams } = new URL(req.url)
    const id = await searchParams.get('id')
    const redisdata = await client.get(id);
    if(!redisdata){
        const query =  `Select * from jtc_footer LIMIT 1`
        const data = await executeQuery(query);
        if(data.length > 0) {
            let diffrence =    ``
            if(id == "navbar") diffrence = ` ORDER by nav_link ASC`
            else diffrence = ` && name Not Like 'JOIN%'  && name Not Like 'Hire%' && name != "Courses"  ORDER by nav_link ASC`

          for (let index = 0; index < data.length; index++) {
            const query =  `Select name, nav_link, explore  from jtc_website_links WHERE deleted_by = '0' ${diffrence}`
              const executeApi = await executeQuery(query)
              if(executeApi.length > 0){
  
             data[index]["links"] = executeApi;
              }
    
            }
         
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
  

