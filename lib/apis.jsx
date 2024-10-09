

import instance from '@/apis/commonapi';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:8000/');


let register = "register" //cehck
let course = "course" //check
let login = "login" //check
let cart = "cart" //check
let payment = "payment" //check
let profile = "profile" //check
let password = "password"
let choosePoint = "choosePoint"
let cources = "cources"
let courseSections = "courseSections"
let company = "company"
let testimonials = "testimonials"
let link = "link"
let codes = "code"
let about = "about"
let tutorial = "tutorial"
let compiler = "compiler"



// list of all courses
export async function allCourses(id){
  try {
    const value =  JSON.stringify({id})
    const { data } = await instance.patch(course, value);
    return data;
  } catch (err) {
    return err
  }
};

// list of all course category
export async function allTypesOfCourses()  {
  try {
    const { data } = await instance.get(course);
    return data;
  } catch (err) {
    return err
  }
};


// registration api
export async function registrationApi(posts){
  try {
    const value = JSON.stringify({ email : posts.email, password : posts.password, name : posts.name })
    const { data } = await instance.put(register, value);
    return data;
  } catch (err) {
    return err
  }
};

// sections data
export async function componentData(header) {
  try {
    const value = JSON.stringify({ header })
    const { data } = await instance.put(company, value);
    return data;
  } catch (err) {
    return err
  }
};


// levels of courses
export async function coursesLavel() {
  try {
    const { data } = await instance.put(course);
    return data;
  } catch (err) {
    return err
  }
};

// get course by id
export async function singlecourse(id) {
  try{
    const {data} = await instance.get(`${link}?id=${id}`)
    return data 
  } catch (err) {
    return err
  }
}


// get learning point of course get data by id
export async function courseLearn(id)  {
  try{
    const value = JSON.stringify({ id })

    const {data} = await instance.put(link, value)
    return data 
  } catch (err) {
    return err
  }
}


// all course review by course id
export async function courseReview(id)  {
  try{
    const {data} = await instance.delete(`${link}?id=${id}`)
    return data 
  } catch (err) {
    return err
  }
}


// course requriement data by course id
export async function courseRequirement(id)  {
  try{
    const value = JSON.stringify({ id })
    const {data} = await instance.patch(link, value)
    return data 
  } catch (err) {
    return err
  }
}

// course faqs points by course id
export async function EcourseFaqs(id)  {
  try{
    const value = JSON.stringify({ id })
    const {data} = await instance.post(link, value)
    return data 
  } catch (err) {
    return err
  }
}


// course chapters
export async function EcourseChapter(id)  {
  try {
    const value = JSON.stringify({ id })
    const { data } = await instance.post(course,value);
    return data;
  } catch (err) {
    return err
  }
};

// course chapter topics
export async function courseTopics(course, id)  {
  try {
    const value = JSON.stringify({course, id })
    const { data } = await instance.put(password,value);
    return data;
  } catch (err) {
    return err
  }
};


// add a rating of the course
export async function addRating(field, id)  {
  try {
    const value =  JSON.stringify({ review : field.review, rating : field.rating, course_id : id})
    const { data } = await instance.post(login, value);
    return data;
  } catch (err) {
    return err
  }
}


// course adding into wishlist
export async function courseAddWishlist(id)  {
  try {
    const value =  JSON.stringify({ course_id : id})
    const { data } = await instance.put(login, value);
    return data;
  } catch (err) {
    return err
  }
}


// course added on cart
export async function courseAddCart(id)  {
  try {
    const value =  JSON.stringify({ course_id : id})
    const { data } = await instance.patch(login, value);
    return data;
  } catch (err) {
    return err
  }
}

// buy a single course
export async function buyCourseApi(id, amount) {
  try {
    const value =  JSON.stringify({  course_id : id, amount})
    const { data } = await instance.post(payment, value);
    return data;
  } catch (err) {
    return err
  }
}

// buy mutiple course from cart
export async function buyCartItems(id, amount) {
  try {
    const value =  JSON.stringify({  cart_id : id, amount})
    const { data } = await instance.post(cart, value);
    return data;
  } catch (err) {
    return err
  }
}

// verify payment of single course
export async function verifyPayment(option) {
  try {
    const value =  JSON.stringify({ razorpayOrderId : option.razorpayOrderId,orderCreationId : option.orderCreationId, razorpayPaymentId: option.razorpayPaymentId, razorpaySignature : option.razorpaySignature})
    const { data } = await instance.put(payment, value);
    return data;
  } catch (err) {
    return err
  }
}


// verify payment of mutiple courses
export async function verifyCartPayment(option, id) {

  try {
    const value =  JSON.stringify({ id ,razorpayOrderId : option.razorpayOrderId,orderCreationId : option.orderCreationId, razorpayPaymentId: option.razorpayPaymentId, razorpaySignature : option.razorpaySignature})
    const { data } = await instance.put(cart, value);
    return data;
  } catch (err) {
    return err
  }
}


// list of all cartItems
export async function cartItems()  {
  try{
    const {data} = await instance.get(payment)
    return data;
  } catch (err) {
    return err
  }
}


// remove from wishlist and add into cart or remove from cart and add into wishlist
export async function changeCartItems(id, add, rem)  {
  try{
    const value = JSON.stringify({ id,add,rem})
    const {data} = await instance.patch(payment, value)
    return data;
  } catch (err) {
    return err
  }
}


// filter the courses 
export async function allFilters(arrayOfLevel,arrayOfCategory, price)  {
  try {
    const value =  await JSON.stringify({arrayOfLevel,arrayOfCategory, price})
    const { data } = await instance.post(testimonials, value);
    return data;

  } catch (err) {
    return err
  }
};

// get login user data
export async function loginAPi()  {
  try {
     const { data } = await instance.get(login);
    return data;

  } catch (err) {
    return err
  }
};


// length of cart items
export async function cartItemLength()  {
  try {
     const { data } = await instance.get(cart);
    return data;

  } catch (err) {
    return err
  }
};





//  get profile data of user
export async function profileData()  {
  try {
    const {data} = await instance.get(profile);
    return data;

  } catch (err) {
    return err
  }
};



//  update user profile image
export async function updateImage(formData)  {
  try {
    const {data} = await instance.post(profile,formData);
    return data;

  } catch (err) {
    return err
  }
};


//  update profile by user
export async function profileUpdate(state)  {
  try {
    const value =  JSON.stringify({name : state.name, phone : state.phone})
    const {data} = await instance.put(profile,value);
    return data;

  } catch (err) {
    return err
  }
};

//  update password
export async function passwordUpdate(password)  {
  try {
    const value =  JSON.stringify({lastPassword : password.lastPassword, password : password.password, confirmPassword : password.confirmPassword})
    const {data} = await instance.patch(profile,value);
    return data;

  } catch (err) {
    return err
  }
};

//  list of all buy products
export async function buyProduct(){
  try {
    const {data} = await instance.delete(profile);
    return data;

  } catch (err) {
    return err
  }
};



// forget password api
export async function forGetPassword(email)  {
  try {
    const value =  JSON.stringify({email})

    const {data} = await instance.patch(password,value );
    return data;

  } catch (err) {
    return err
  }
};

// reset a password
export async function resetPassword(resetData)  {
  try {
    const value =  JSON.stringify({password : resetData.newPassword, confirmPassword : resetData.confirmNewPassword,  otp : resetData.otp})

    const {data} = await instance.post(password,value);
    return data;

  } catch (err) {
    return err
  }
};

//  match Otp
export async function matchOtp(otp, email)  {
  try {
    const value =  JSON.stringify({otp ,email})

    const {data} = await instance.patch(register,value);
    return data;

  } catch (err) {
    return err
  }
};




// All Lists of Blogs 
export async function blogs()  {
  try {
    const { data } = await instance.delete(company);
    return data;

  } catch (err) {
    return err
  }
};

// Get a single blog
export async function singleBlog(id)  {
  try {
    const { data } = await instance.get(id);
    return data;

  } catch (err) {
    return err
  }
};

// All choosing Points
export async function allChoosingPoint()  {
  try {
    const { data } = await instance.get(choosePoint);
    return data;

  } catch (err) {
    return err
  }
};

// Footer Data aPi
export async function footerData(id)  {
  try {
    const { data } = await instance.delete(`${choosePoint}?id=${id}`);
    return data;

  } catch (err) {
    return err
  }
};



// Testomainals Data 
export async function alltestimonials()  {
  try {
    const { data } = await instance.get(testimonials);
    return data;

  } catch (err) {
    return err
  }
};

// Lis of cources
export async function homeCourses()  {
  try {
    const { data } = await instance.get(cources);
    return data;

  } catch (err) {
    return err
  }
};

// Lis of comapnies
export async function homeCompany()  {
  try {
    const { data } = await instance.get(company);
    return data;

  } catch (err) {
    return err
  }
};

// About Us Point
export async function aboutUS()  {
  try {
    const { data } = await instance.get(about);
    return data;

  } catch (err) {
    return err
  }
};



// Sumbit Git Us Now Form
export async function enquiryForm(field)  {
  try {

    const value = await JSON.stringify(field)
    const { data } = await instance.post(choosePoint, value);
    await socket.emit('formSubmited', data)
    return data;

  } catch (err) {
    return err
  }
};

//  handel Download Brousher form
export async function brochureForm(field)  {
  try {
    const response = await instance.post(company, JSON.stringify(field), { responseType: 'blob' });
    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${field.course}.pdf`;
    const data = {message : "Form Submited Successfully", notification : `${field.name} has filled Download Curriculum form`, success : true}
    await socket.emit('formSubmited',data)
    return link.click();
  } catch (err) {
    return err;
  }
};


// handel hire from us form
export async function hireUsForm(field)  {
  try {
    const value = await JSON.stringify(field)
    const { data } = await instance.patch(company, value);
    await socket.emit('formSubmited', data)
    return data;
  } catch (err) {
    return err
  }
};

// Handel join us form
export async function joinUsForm(field)  {
  try {
    const value = await JSON.stringify(field)
    const { data } = await instance.patch(choosePoint, value);
    await socket.emit('formSubmited', data)
    return data;
  } catch (err) {
    return err
  }
};

// Batch Enroll form 
export async function batchForm(field)  {
  try {
    const value = await JSON.stringify(field)
    const { data } = await instance.put(choosePoint, value);
    await socket.emit('formSubmited', data)
    return data;
  } catch (err) {
    return err
  }
};


//  all vaccieny avialble list of roles
export async function allRoles()  {
  try {
    const { data } = await instance.get(courseSections);
    return data;
  } catch (err) {
    return err
  }
};


// all courses types
export async function allCourceTypes()  {
  try {
    const { data } = await instance.patch(cources);

    return data;

  } catch (err) {
    return err
  }
};

// get static pages
export async function termsAndCondition(id)  {
  try {
    const { data } = await instance.patch(id);
    return data;
  } catch (err) {
    return err
  }
};


// get all course list
export async function courcesList(id)  {
  try {
    const value = JSON.stringify({ id })
    const { data } = await instance.put(cources, value);
    return data;
  } catch (err) {
    return err
  }
};

// course basic details
export async function courseData(name)  {
  try {
    const value = JSON.stringify({ name })
    const { data } = await instance.post(cources, value);
    return data;
  } catch (err) {
    return err
  }
};

// all choosing point
export async function coursePoint(course)  {
  try {
    const value = JSON.stringify({ course })
    const { data } = await instance.put(courseSections, value);
    return data;
  } catch (err) {
    return err
  }
};

// course video point
export async function courceViodePoint(course)  {
  try {
    const value = JSON.stringify({ course })
    const { data } = await instance.patch(about, value);
    return data;
  } catch (err) {
    return err
  }
};

// all batches list
export async function allBatches(course)  {
  try {
    const value = JSON.stringify({ course })
    const { data } = await instance.post(courseSections, value);
    return data;
  } catch (err) {
    return err
  }
};

// single course categories
export async function courseCatgories  (id)  {
  try {
    const { data } = await instance.post(id);
    return data;
  } catch (err) {
    return err
  }
};

// course chapter
export async function courseChapter(id)  {
  try {
    const value = JSON.stringify({ id })
    const { data } = await instance.patch(courseSections, value);
    return data;
  } catch (err) {
    return err
  }
};

// course faqs
export async function courseFaqs(course)  {
  try {
    const value = JSON.stringify({ course })
    const { data } = await instance.post(about, value);
    return data;
  } catch (err) {
    return err
  }
};

// navbar link api
export async function allNavbarLinks(header)  {
  try {
    const value = JSON.stringify(header)
    const { data } = await instance.put(company,value);
    return data;
  } catch (err) {
    return err
  }
};


// list of types tutorial
export async function tutorialType()  {
  try {
    const { data } = await instance.get(tutorial);
    return data;
  } catch (err) {
    return err
  }
};

// tuturial couses
export async function tutorialCourse(type)  {
  try {
    const value = JSON.stringify({ type })
    const { data } = await instance.post(tutorial, value);
    return data;
  } catch (err) {
    return err
  }
};


// tutorial chapters
export async function tutorialChapter(course)  {
  try {
    const value = JSON.stringify({ course })
    const { data } = await instance.put(tutorial, value);
    return data;
  } catch (err) {
    return err
  }
};

// tutorial topics
export async function tutorialTopic(topic)  {
  try {
    const value = JSON.stringify({ topic })
    const { data } = await instance.patch(tutorial, value);
    return data;
  } catch (err) {
    return err
  }
};

// tutorial topics
export async function nextTutorial(course, id)  {
  try {
    const value = JSON.stringify({ course, id })
    const { data } = await instance.put(testimonials, value);
    return data;
  } catch (err) {
    return err
  }
};

// tutorial topics
export async function prevTutorial(course, id)  {
  try {
    const value = JSON.stringify({ course, id })
    const { data } = await instance.patch(testimonials, value);
    return data;
  } catch (err) {
    return err
  }
};



export async function sendCode(chapter, topic, code) {
  try{
    const value = JSON.stringify({ chapter, topic, code })
    const { data } = await instance.post(codes, value);
    return data;
  } catch (err) {
    return err
  
  }
}

export async function executejava(initalcode, commandLineinput, getInput) {
  try{
    const value = JSON.stringify({initalcode, commandLineinput, getInput})
    const { data } = await instance.patch(codes, value);
    return data;
  } catch (err) {
    return err
  
  }
}

export async function executepython(initalcode, getInput) {
  try{
    const value = JSON.stringify({initalcode, getInput})
    const { data } = await instance.put(codes, value);
    return data;
  } catch (err) {
    return err
  
  }
}

export async function executecpp(initalcode) {
  try{
    const value = JSON.stringify({initalcode })
    const { data } = await instance.post(compiler, value);
    return data;
  } catch (err) {
    return err
  
  }
}

export async function executec(initalcode) {
  try{
    const value = JSON.stringify({initalcode })
    const { data } = await instance.put(compiler, value);
    return data;
  } catch (err) {
    return err
  
  }
}