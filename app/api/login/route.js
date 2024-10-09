import { executeQuery } from "@/conn/conn";
import { client } from "@/middelware/redisFile";
import { NextResponse } from "next/server";

export async function GET(req){
    const name = req.headers.get('X-User-Name');
     return NextResponse.json({data :name}, { success : true}, {status : 200})  
  }


// add a review
export async function POST(req){
  const {review, rating, course_id} = await req.json()
  const email = req.headers.get('X-User-Email');
  const findReview =  `Select id from jtc_ecommers_course_review WHERE user = (Select id from jtc_ecommers_users where email = '${email}' && deleted_by = '0') && course = '${course_id}'`
  const getUser = await executeQuery(findReview)
 let updateReview = ''
  if(getUser.length > 0){
    const id = getUser && getUser[0].id
   updateReview =  `Update  jtc_ecommers_course_review SET review = '${review}', rating = '${rating}', updated_at = current_timestamp(), user = (Select id from jtc_ecommers_users where email = '${email}' && deleted_by = '0')  WHERE id =  '${id}'`

}
else 
 updateReview =  `Insert into  jtc_ecommers_course_review SET review = '${review}', rating = '${rating}', updated_at = current_timestamp(), user = (Select id from jtc_ecommers_users where email = '${email}' && deleted_by = '0'), course = '${course_id}'`

    const update = await executeQuery(updateReview)
    if(update.affectedRows > 0) {
      await client.del(`EcommerscourseReview${course_id}`);
    return NextResponse.json({data : "Review Added Successfully"}, { success : true}, {status : 200})   }
  else return  NextResponse.json({data : 'User Not Found'}, { success : false}, {status : 206})  

}


export async function PUT(req){
  const { course_id} = await req.json()
  const email = req.headers.get('X-User-Email');
  const query =  `Select id from jtc_ecommers_wishlist WHERE course = '${course_id}' && user = (Select id from jtc_ecommers_users where email = '${email}' && deleted_by = '0')`
  const findFirst = await executeQuery(query)


  if(findFirst.length > 0){
    const id = findFirst && findFirst[0].id
    const deleteQuery =  `Delete from jtc_ecommers_wishlist WHERE id = '${id}'`
    const deleteFirst = await executeQuery(deleteQuery)


    if(deleteFirst.affectedRows > 0) {
      await client.del(`EcommersCW${email}`);
   
      return NextResponse.json({data : "Couces Removed from WishList Successfully"}, { success : true}, {status : 200}) 
    }
  }else {
    const query =  `Insert into jtc_ecommers_wishlist Set course = '${course_id}', user = (Select id from jtc_ecommers_users where email = '${email}' && deleted_by = '0')`
    const inserFirst = await executeQuery(query)

    if(inserFirst.affectedRows > 0){

      
      await client.del(`EcommersCW${email}`);
   
       return NextResponse.json({data : "Couces Added into WishList Successfully"}, { success : true}, {status : 200})
      }

  }
}



// Add into Cart
export async function PATCH(req){
  const { course_id} = await req.json()
  const email = req.headers.get('X-User-Email');
  const query =  `Select id from jtc_ecommers_cart WHERE course = '${course_id}' && user = (Select id from jtc_ecommers_users where email = '${email}' && deleted_by = '0')`
  const findFirst = await executeQuery(query)


  if(findFirst.length > 0){
   
    const id = findFirst && findFirst[0].id
    const deleteQuery =  `Delete from jtc_ecommers_cart WHERE id = '${id}'`
    const deleteFirst = await executeQuery(deleteQuery)


    if(deleteFirst.affectedRows > 0) {
      await client.del(`EcommersCW${email}`);
      await client.del(`Ecommers${email}CartLength`)
     
      return NextResponse.json({data : "Couces Removed from Cart Successfully"}, { success : true}, {status : 200}) 
    }
  }else {
    
    const query =  `Insert into jtc_ecommers_cart Set course = '${course_id}', user = (Select id from jtc_ecommers_users where email = '${email}' && deleted_by = '0')`
    const inserFirst = await executeQuery(query)

    if(inserFirst.affectedRows > 0){
      await client.del(`Ecommers${email}CartLength`)
      
      await client.del(`EcommersCW${email}`);
   
       return NextResponse.json({data : "Couces Added into Cart Successfully"}, { success : true}, {status : 200})
      }
  }
 }
