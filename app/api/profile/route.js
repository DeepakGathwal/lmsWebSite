import { client } from "@/middelware/redisFile";
import { NextResponse } from "next/server";
import  bycrypt from 'bcryptjs'
import { executeQuery } from "@/conn/conn";



export async function GET(req){
    const email = req.headers.get('X-User-Email');
    const redisdata =  await client.get(`EcommersProfile${email}`)
    if(!redisdata){
        const query =  `Select name, id , phone,image, email from jtc_ecommers_users WHERE email = '${email}' && deleted_by = '0'`
    const data = await executeQuery(query)
    if(data.length > 0)  {
        const value =  await JSON.stringify(data)
  await client.set(`EcommersProfile${email}`, value,{
    EX: process.env.REDIS_EXP,   
    NX: true
  });
        return NextResponse.json({data}, {status : 200})
    }
    else return NextResponse.json({message : "Error"},{success : false}, {status : 206})
    }else{ 
        const value = await JSON.parse(redisdata)
        return NextResponse.json({data : value}, { success : true}, {status : 200})
        }
}

export async function POST(req){
   const formDataFlag = await req.formData()
   const file = formDataFlag.get('image');
   const bytes = await file.arrayBuffer();
   const buffer =  Buffer.from(bytes).toString('base64')
   const email = await req.headers.get('X-User-Email');
   const mimeType = file.type; 

   const updateImage =  `Update jtc_ecommers_users SET image = 'data:${mimeType};base64,${buffer}', updated_at = current_timestamp() WHERE email = '${email}' && deleted_by = '0'`

    const data = await executeQuery(updateImage)
    if(data.affectedRows > 0)  {
  await client.del(`EcommersProfile${email}`);
        return NextResponse.json({data : "Image Updated"}, {status : 200})
    }
    else return NextResponse.json({message : "Error"},{success : false}, {status : 206})
    
}

export async function PUT(req){
    const {name, phone} = await req.json()
    const email = req.headers.get('X-User-Email');
    const updateImage =  `Update jtc_ecommers_users SET name = '${name}', updated_at = current_timestamp(), phone  = '${phone}' WHERE email = '${email}' && deleted_by = '0'`
    const data = await executeQuery(updateImage)
    if(data.affectedRows > 0)  {
        await client.del(`EcommersProfile${email}`);
              return NextResponse.json({data : "Profile Updated"}, {status : 200})
            }
          
    else return NextResponse.json({message : "Error"},{success : false}, {status : 206})
}

export async function PATCH(req){
    const {lastPassword, password, confirmPassword} = await req.json()
    if(password != confirmPassword) return   NextResponse.json({message : "Password Not Match"},{success : false}, {status : 206})
    const email = req.headers.get('X-User-Email');
const profile =  `Select password from jtc_ecommers_users WHERE email = '${email}'`
    const findPassword = await executeQuery(profile)
    let confirm = true
    if(findPassword.length > 0 && findPassword[0].password != null){
        const matchPassword = bycrypt.compareSync(lastPassword, String(findPassword[0].password)); 
        if(matchPassword) confirm = true
        else  confirm = false
    }

    if(confirm){
        const encryptPass = await bycrypt.hashSync(password, 8)
    const updatePass =  `Update jtc_ecommers_users SET password = '${encryptPass}', updated_at = current_timestamp()  WHERE email = '${email}' && deleted_by = '0'`

    const data = await executeQuery(updatePass)
    if(data != null)  {
        await client.del(`EcommersProfile${email}`);
              return NextResponse.json({data : "Profile Updated"}, {status : 200})
            }       
        else   return NextResponse.json({message : "Error"}, {status : 206})
    } else    return NextResponse.json({message : "Last Password Wrong"}, {status : 206})
}


export async function DELETE(req){
    const email = req.headers.get('X-User-Email');
    const redisdata =  await client.get(`EcommersProfilePurchase${email}`)
    if(!redisdata){
    const query =  `Select payment.id, payment.verify, payment.amount, payment.currency, payment.order_at, payment.done_time, course.name, course.course_link as link from jtc_ecommers_course_payment as payment INNER JOIN jtc_ecommers_users as user On user.id = payment.user and user.deleted_by = '0' Inner join jtc_ecommers_courses as course On course.id = payment.course WHERE payment.verify = '1' && user.id = (Select id from jtc_ecommers_users where email = '${email}' && deleted_by = '0') && payment.payment_id is not null && payment.payment_signature is not null`
   
      const data = await executeQuery(query)
      if(data.length > 0)  {
      const value =  await JSON.stringify(data)
  await client.set(`EcommersProfilePurchase${email}`, value,{
    EX: process.env.REDIS_EXP,   
    NX: true
  });
        return NextResponse.json({data}, {status : 200})
    }
    else return NextResponse.json({message : "Error"},{success : false}, {status : 206})
    }else{ 
        const value = await JSON.parse(redisdata)
        return NextResponse.json({data : value}, { success : true}, {status : 200})
        }
}