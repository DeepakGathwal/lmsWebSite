import { allCourses, buyCartItems, buyCourseApi, cartItems, courseAddCart, courseAddWishlist , verifyCartPayment, verifyPayment} from "@/lib/apis";

export const adding = async(about, id) => {

  if(about == "cart"){
   return await courseAddCart(id)
  }else{
    return  await courseAddWishlist(id)
  }
 
}




const  buycourse = async(e,id, amount) => {
  e.preventDefault()
  const {data} = await buyCourseApi(id, amount)
  return  data
}

const  buyCartcourse = async(e,id, amount) => {
  e.preventDefault()
  const {data} = await buyCartItems(id, amount)
  return  data
}


export const processPayment = async(e, state) => {
  try {
    e.preventDefault();
    const id = await state?.id
    
    const amountDetails = await state && parseInt(state.total_price * ( (100-state.discount) ))
    const courseName = await state?.name
   const orderId = id > 0 && await buycourse(e,id, amountDetails);
  
   if(orderId == "Login First") return orderId
   const options = {
    key: process.env.REZORPAY_KEY,
    currency: "INR",
    name: orderId?.name,
    description:courseName,
    order_id: orderId?.id,
    handler: async function (req) {
     const option = {
      orderCreationId: orderId,
      razorpayPaymentId: req.razorpay_payment_id,
      razorpayOrderId: req.razorpay_order_id,
      razorpaySignature: req.razorpay_signature,
     };
     const data =  await verifyPayment(option)
    
     if (data?.isOk) return true;
     else {
     return alert(data?.message);
     }
    },
    prefill: {
     name: "Ricky",
     email:orderId?.receipt
    },
    theme: {
     color: '#3399cc',
    },
   };
   const paymentObject = new window.Razorpay(options);
   paymentObject.on('payment.failed', function () {
    alert(response.error.description);
   });
   paymentObject.open();
  } catch (error) {
  return alert(error)
  }
 };


export const processCartPayment = async(e, state) => {
  try {
    e.preventDefault();
    const id = await state.map((av) => av.id)

    const amountDetails = await state.reduce((acc, ab) =>  acc + parseInt(ab.total_price * (100 - ab.discount)), 0)
   
    const courseName = await state?.name
   const orderId =  await buyCartcourse(e,id, amountDetails);
  
   if(orderId == "Login First") return orderId
   const options = {
    key: process.env.REZORPAY_KEY,
    currency: "INR",
    name: orderId?.name,
    description:courseName,
    order_id: orderId?.id,
    handler: async function (req) {
     const option = {
      orderCreationId: orderId,
      razorpayPaymentId: req.razorpay_payment_id,
      razorpayOrderId: req.razorpay_order_id,
      razorpaySignature: req.razorpay_signature,
     };
     const data =  await verifyCartPayment(option, id)
    
     if (data?.isOk)return true;
     else {
     return alert(data?.message);
     }
    },
    prefill: {
     name: "Ricky",
     email:orderId?.receipt
    },
    theme: {
     color: '#3399cc',
    },
   };
   const paymentObject = new window.Razorpay(options);
   paymentObject.on('payment.failed', function () {
    alert(response.error.description);
   });
   paymentObject.open();
  } catch (error) {
  return alert(error)
  }
 };


 export const allCartItems =  async(id)=>{
  
  const courses = await allCourses(id);
  const  others = courses && courses.data
  const { data } = await cartItems() 
  const allData =  others && [...others]

  data && data != "Login First" &&  data.map((av) => {
  allData.map((ab) => {
          if(ab.id == av.courseId && av.cart == "Cart") return ab.cartStatus = 1
        
          if(ab.id == av.courseId && av.cart == "Wish") return ab.wishStatus = 1
       
      })
  })
 return allData
 }


 export const addOnCartFunction = async (about, ab, state) => {
  
      const data = state && [...state]
      data.map((el) => {
          if (el.id == ab.id) {
              if (about == "cart" && !ab.cartStatus) {

                  return ab.cartStatus = 1
              }
              else if (about == "cart" && ab.cartStatus == 1) {

                  return delete ab.cartStatus
              }
              if (about == "whishlist" && ab.wishStatus == 1) {

                  return delete ab.wishStatus
              }
              else if (about == "whishlist" && !ab.wishStatus) {

                  return ab.wishStatus = 1
              }

          }
      })
      return data && data

  

}