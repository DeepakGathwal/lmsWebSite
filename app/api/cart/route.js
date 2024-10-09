// 2 website pending
import Razorpay from 'razorpay'
import { NextResponse } from "next/server";
import { executeQuery } from '@/conn/conn';
import { client } from "@/middelware/redisFile";


// razorpay creadiontails

const razorpay = new Razorpay({
    key_id: process.env.REZORPAY_KEY,
    key_secret: process.env.REZORPAY_SECRATE,
   });




// Genrate Access Token to buy mutiple course from cart
   export async function POST(req){
    const email = req.headers.get('X-User-Email');
      const query =  `Select id, name from jtc_ecommers_users WHERE email = '${email}' && deleted_by = '0'`
      const findUser =  await executeQuery(query)
    if(findUser.length == 0) return  NextResponse.json({ data: "User not Found" }, { status: 206 });

    const client_id =  findUser && findUser[0].id
   const { amount,cart_id } = await req.json()
    const cartQuery =  `Select course from jtc_ecommers_cart WHERE id IN (${cart_id})`
   const runQuery =  await executeQuery(cartQuery)
   if(runQuery.length > 0){
    
      var options = {
         amount: amount,
         currency: "INR",
         receipt: email
        };
        const order = await razorpay.orders.create(options);
        let prom = []

        runQuery && runQuery.map(async(ab) => {
         prom.push(new Promise(async(resolve, reject) => {

        const insertOderId = `Insert into jtc_ecommers_course_payment SET order_id = '${order?.id}',course = '${ab.course}', user = '${client_id}', amount = (Select total_price * ((100 - discount) / 100)  from jtc_ecommers_courses WHERE id =  '${ab.course}' ), currency = 'INR'`
        const insertDetails =  await executeQuery(insertOderId)
        if(insertDetails.affectedRows > 0)
           resolve(insertDetails)   
        else   reject(insertDetails)
   
      }))
   })
   
        try{
         const value = await Promise.all(prom)
         options['name'] = findUser && findUser.name
         if(value) return NextResponse.json({ data: order }, { status: 200 });
        }catch (err){
         return NextResponse.json({ data: "Failed Payment" }, { status: 206 });
        }
   }
   
}

// Add payment and verify payment of mutiple courses
export async function PUT(req){
    const { razorpayPaymentId, razorpayOrderId,razorpaySignature, id } = await req.json();  
    if( !razorpayPaymentId &&  !razorpaySignature) return NextResponse.json(
      { message: 'Payment Verification Failed', isOk: false },
      { status: 206 }
     );
  
     const query = `Update  jtc_ecommers_course_payment SET payment_id = '${razorpayPaymentId}',payment_signature = '${payment_signature}',verify = '1',done_time = curren_timestamp() WHERE   order_id =  '${razorpayOrderId}'`
    const runQuery =  await executeQuery(query)
    if(runQuery  !== null){
     const cartQuery =  `Delete from jtc_ecommers_cart WHERE id IN (${id})`
    const runQuery2 =  await executeQuery(cartQuery)
    if(runQuery2.affectedRows > 0){
      const email = req.headers.get('X-User-Email');
      await client.del(`EcommersCW${email}`);
      await client.del(`Ecommers${email}CartLength`)
        await client.del(`Ecommers${email}CartLength`)
        await client.del(`EcommersPayment${email}`)
      return NextResponse.json(
        { message: 'Course Purchased Successfully', isOk: true },
        { status: 200 }
       );
      }else return NextResponse.json(
         { message: 'DataBase Error ', isOk: false },
         { status: 206}
        )
   }
    else return NextResponse.json(
      { message: 'DataBase Error ', isOk: false },
      { status: 206 }
     )
}



// length of cart items
export async function GET(req){
  const email = req.headers.get('X-User-Email');
  const redisdata =  await client.get(`Ecommers${email}CartLength`)
  if(!redisdata){
     const cartQuery =  `Select Count(id) as id from jtc_ecommers_cart WHERE user = (Select id from jtc_ecommers_users WHERE email = '${email}' && deleted_by = '0' )`
  const data = await executeQuery(cartQuery)
  if(data.length > 0){
    const value =  await JSON.stringify(data)
    await client.set(`Ecommers${email}CartLength`, value);
return NextResponse.json({data}, { success : true}, {status : 200})   
}
else return  NextResponse.json({data : 'User Not Found'}, { success : false}, {status : 206})  
}else{ 
const value = await JSON.parse(redisdata)
return NextResponse.json({data : value}, { success : true}, {status : 200})
}
}



