import Razorpay from 'razorpay'
import { NextResponse } from "next/server";
import { client } from "@/middelware/redisFile";
import { executeQuery } from '@/conn/conn';
import { sendEmail } from '@/middelware/sendEmail';

const razorpay = new Razorpay({
    key_id: process.env.REZORPAY_KEY,
    key_secret: process.env.REZORPAY_SECRATE,
   });



// Genrate Access Token
   export async function POST(req){
    const email = req.headers.get('X-User-Email');
    const userId = `Select id from jtc_ecommers_users where email = '${email}' && deleted_by = '0'`
    const findUser =  await executeQuery(userId)
    if(findUser == null) return  NextResponse.json({ data: "Student not Found" }, { status: 200 });
   const { amount, course_id } = await req.json()
   var options = {
    amount: amount,
    currency: "INR",
    receipt: email
   };
   const order = await razorpay.orders.create(options);
   const client_id =  findUser && findUser[0].id
   const insertOderId = `Insert into jtc_ecommers_course_payment SET order_id = '${order?.id}',course = '${course_id}', user = '${client_id}', amount = '${order?.amount / 100}', currency = 'INR'`
   const insertDetails =  await executeQuery(insertOderId)
   if(insertDetails.affectedRows > 0){
    options['name'] = findUser && findUser.name
     return NextResponse.json({ data: order }, { status: 200 });
   }
   else  return NextResponse.json({ data: "Something Wrong" }, { status: 206 });
}


   
// Add payment 
export async function PUT(req){
  const email = req.headers.get('X-User-Email');
  const name = req.headers.get('X-User-Name');
    const { razorpayPaymentId, razorpayOrderId,razorpaySignature } = await req.json();  
    if( !razorpayPaymentId &&  !razorpaySignature) return NextResponse.json(
      { message: 'Payment Verification Failed', isOk: false },
      { status: 206 }
     );
     const query = `Update  jtc_ecommers_course_payment SET payment_id = '${razorpayPaymentId}',payment_signature = '${razorpaySignature}',verify = '1',done_time = current_timestamp() WHERE order_id =  '${razorpayOrderId}'`
   
     const runQuery =  await executeQuery(query)
    if(runQuery.affectedRows > 0) {
      await client.del(`EcommersPayment${email}`)
        const courseQuery =  `Select name, id from jtc_ecommers_courses WHERE id = (Select course from jtc_ecommers_course_payment WHERE payment_id = '${razorpayPaymentId}'&& payment_signature = '${razorpaySignature}' && verify = '1' && order_id =  '${razorpayOrderId}')`
        const runQuery = await executeQuery(courseQuery)
        if(runQuery.length == 0) return NextResponse.json(
          { message: 'DataBase Error ', isOk: false },
          { status: 206 }
         )
         const courseName =  runQuery[0].name
      
       const sendTemplate = `<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="x-apple-disable-message-reformatting">
        <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">

        <meta name="color-scheme" content="light">
        <meta name="supported-color-schemes" content="light">

        
    
          
          <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap">
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap">

          <style type="text/css">
            @import url(https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap);
        </style>
        
        <!--<![endif]-->

        <!--[if mso]>
          <style>
              // TODO: fix me!
              * {
                  font-family: sans-serif !important;
              }
          </style>
        <![endif]-->
    
        
        <!-- NOTE: the title is processed in the backend during the campaign dispatch -->
        <title></title>

        <!--[if gte mso 9]>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        
    <style>
        :root {
            color-scheme: light;
            supported-color-schemes: light;
        }

        html,
        body {
            margin: 0 auto !important;
            padding: 0 !important;
            height: 100% !important;
            width: 100% !important;

            overflow-wrap: break-word;
            -ms-word-break: break-all;
            -ms-word-break: break-word;
            word-break: break-all;
            word-break: break-word;
        }


        
  direction: undefined;
  center,
  #body_table {
    
  }

  ul, ol {
    padding: 0;
    margin-top: 0;
    margin-bottom: 0;
  }

  li {
    margin-bottom: 0;
  }

  

  .list-block-list-outside-left li {
    margin-left: 20px !important;
  }

  .list-block-list-outside-right li {
    margin-right: 20px !important;
  }

  
    .paragraph {
      font-size: 16px;
      font-family: Open Sans, sans-serif;
      font-weight: normal;
      font-style: normal;
      text-align: start;
      line-height: 1;
      text-decoration: none;
      color: #141414;
      
    }
  

    .heading1 {
      font-size: 25px;
      font-family: Open Sans, sans-serif;
      font-weight: normal;
      font-style: normal;
      text-align: start;
      line-height: 1;
      text-decoration: none;
      color: #141414;
      
    }
  

    .heading2 {
      font-size: 22px;
      font-family: Open Sans, sans-serif;
      font-weight: normal;
      font-style: normal;
      text-align: start;
      line-height: 1;
      text-decoration: none;
      color: #141414;
      
    }
  

    .heading3 {
      font-size: 18px;
      font-family: Open Sans, sans-serif;
      font-weight: normal;
      font-style: normal;
      text-align: start;
      line-height: 1;
      text-decoration: none;
      color: #141414;
      
    }
  

    .list {
      font-size: 16px;
      font-family: Open Sans, sans-serif;
      font-weight: normal;
      font-style: normal;
      text-align: start;
      line-height: 1;
      text-decoration: none;
      color: #141414;
      
    }
  

  p a, 
  li a {
    
  display: inline-block;  
    color: #FE644A;
    text-decoration: underline;
    font-style: normal;
    font-weight: normal;

  }

  .button-table a {
    text-decoration: none;
    font-style: normal;
    font-weight: normal;
  }

  .paragraph > span {text-decoration: none;}.heading1 > span {text-decoration: none;}.heading2 > span {text-decoration: none;}.heading3 > span {text-decoration: none;}.list > span {text-decoration: none;}


        * {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
        }

        div[style*="margin: 16px 0"] {
            margin: 0 !important;
        }

        #MessageViewBody,
        #MessageWebViewDiv {
            width: 100% !important;
        }

        table {
            border-collapse: collapse;
            border-spacing: 0;
            mso-table-lspace: 0pt !important;
            mso-table-rspace: 0pt !important;
        }
        table:not(.button-table) {
            border-spacing: 0 !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
            margin: 0 auto !important;
        }

        th {
            font-weight: normal;
        }

        tr td p {
            margin: 0;
        }

        img {
            -ms-interpolation-mode: bicubic;
        }

        a[x-apple-data-detectors],

        .unstyle-auto-detected-links a,
        .aBn {
            border-bottom: 0 !important;
            cursor: default !important;
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        .im {
            color: inherit !important;
        }

        .a6S {
            display: none !important;
            opacity: 0.01 !important;
        }

        img.g-img+div {
            display: none !important;
        }

        @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
            u~div .contentMainTable {
                min-width: 320px !important;
            }
        }

        @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
            u~div .contentMainTable {
                min-width: 375px !important;
            }
        }

        @media only screen and (min-device-width: 414px) {
            u~div .contentMainTable {
                min-width: 414px !important;
            }
        }
    </style>

    <style>
        @media only screen and (max-device-width: 700px) {
            .contentMainTable {
                width: 100% !important;
                margin: auto !important;
            }
            .single-column {
                width: 100% !important;
                margin: auto !important;
            }
            .multi-column {
                width: 100% !important;
                margin: auto !important;
            }
            .imageBlockWrapper {
                width: 100% !important;
                margin: auto !important;
            }
        }
        @media only screen and (max-width: 700px) {
            .contentMainTable {
                width: 100% !important;
                margin: auto !important;
            }
            .single-column {
                width: 100% !important;
                margin: auto !important;
            }
            .multi-column {
                width: 100% !important;
                margin: auto !important;
            }
            .imageBlockWrapper {
                width: 100% !important;
                margin: auto !important;
            }
        }
    </style>
    <style>.link-1775dc16-24a2-4003-b19d-5a1c7831e11f-pNtCupFk9EfdWUbuGDNje { color: #525FE1 !important; } .link-4d344da9-e36f-4f4c-92e9-ba8385eb3ed8-ToZ50iwD_qL1_B_szoQ-R { color: #525FE1 !important; } .link-4d344da9-e36f-4f4c-92e9-ba8385eb3ed8-aq14m95ArmmCrkjM1y9df { color: #525FE1 !important; } </style>
    
<!--[if mso | IE]>
    <style>
        .list-block-outlook-outside-left {
            margin-left: -18px;
        }
    
        .list-block-outlook-outside-right {
            margin-right: -18px;
        }

        a:link, span.MsoHyperlink {
            mso-style-priority:99;
            
  display: inline-block;  
    color: #FE644A;
    text-decoration: underline;
    font-style: normal;
    font-weight: normal;

        }
    </style>
<![endif]-->


    </head>

    <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #ffffff;">
        <center role="article" aria-roledescription="email" lang="en" style="width: 100%; background-color: #ffffff;">
            <!--[if mso | IE]>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" id="body_table" style="background-color: #ffffff;">
            <tbody>    
                <tr>
                    <td>
                    <![endif]-->
                        <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="700" style="margin: auto;" class="contentMainTable">
                            <tr class="wp-block-editor-imageblock-v1"><td style="background-color:#ffffff;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px" align="center"><table align="center" width="66" class="imageBlockWrapper" style="width:66px;border-spacing:0;border-collapse:collapse" role="presentation"><tbody><tr><td style="padding:0"><a href="https://jtcindia.org"><img src="https://jtcindia.org/images/logo.png" width="66" height="" alt="" style="border-radius:0px;display:block;height:auto;width:100%;max-width:100%;border:0" class="g-img"></a></td></tr></tbody></table></td></tr><tr class="wp-block-editor-headingblock-v1"><td valign="top" style="background-color:#ffffff;display:block;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;text-align:center"><p style="font-family:Open Sans, sans-serif;text-align:center;line-height:25.30px;font-size:22px;background-color:#ffffff;color:#141414;margin:0;word-break:normal" class="heading2"><span style="font-weight: bold" class="bold">Hi ${name}, Thank You for Your Purchase!</span></p></td></tr><tr class="wp-block-editor-paragraphblock-v1"><td valign="top" style="padding:0px 0px 0px 0px;background-color:#ffffff"><p class="paragraph" style="font-family:Open Sans, sans-serif;text-align:center;line-height:27.20px;font-size:16px;margin:0;color:#141414;word-break:normal">Thank you for purchasing the <span style="font-weight: bold" class="bold">${courseName}</span>! We're excited to have you on board and are confident that this course will help you achieve your goals.</p></td></tr><tr class="wp-block-editor-headingblock-v1"><td valign="top" style="background-color:#ffffff;display:block;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;text-align:center"><p style="font-family:Open Sans, sans-serif;text-align:center;letter-spacing:0;font-size:22px;background-color:#ffffff;color:#141414;margin:0;word-break:normal" class="heading2"> <span style="font-weight: bold" class="bold"> Order Details:</span></p></td></tr><tr class="wp-block-editor-paragraphblock-v1"><td valign="top" style="padding:0px 0px 0px 0px;background-color:#ffffff"><p class="paragraph" style="font-family:Open Sans, sans-serif;text-align:center;line-height:24.00px;font-size:16px;margin:0;color:#141414;letter-spacing:0;word-break:normal">Course Name:  <span style="font-weight: bold" class="bold">${courseName}</span><br>Order Number: <span style="font-weight: bold" class="bold">${razorpayOrderId}</span></p></td></tr><tr class="wp-block-editor-dividerblock-v1" align="center" valign="top"><td style="padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px;background-color:#ffffff"><div style="background:#d3d3d3;font-size:1px;line-height:1px;border:0">&nbsp;</div></td></tr><tr class="wp-block-editor-headingblock-v1"><td valign="top" style="background-color:#ffffff;display:block;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;text-align:center"><p style="font-family:Open Sans, sans-serif;text-align:center;letter-spacing:0;font-size:25px;background-color:#ffffff;color:#141414;margin:0;word-break:normal" class="heading1"><span style="font-weight: bold" class="bold">What's Next?</span></p></td></tr><tr class="wp-block-editor-paragraphblock-v1"><td valign="top" style="padding:0px 0px 0px 0px;background-color:#ffffff"><p class="paragraph" style="font-family:Open Sans, sans-serif;text-align:center;line-height:24.00px;font-size:16px;margin:0;color:#141414;letter-spacing:0;word-break:normal"><span style="color:#141414"><span style="font-weight: bold" class="bold">Access Your Course</span>: </span><span style="color:#525FE1"><a href="https://jtclms.litmos.com.au/account/login" data-type="website" data-id="1775dc16-24a2-4003-b19d-5a1c7831e11f-pNtCupFk9EfdWUbuGDNje" style="color:#525FE1 !important; display: inline-block;" class="link-1775dc16-24a2-4003-b19d-5a1c7831e11f-pNtCupFk9EfdWUbuGDNje">jtclms.litmos.com.au/account/login</a></span></p></td></tr><tr class="wp-block-editor-paragraphblock-v1"><td valign="top" style="padding:0px 20px 0px 20px;background-color:#ffffff"><p class="paragraph" style="font-family:Open Sans, sans-serif;text-align:center;line-height:24.00px;font-size:16px;margin:0;color:#141414;letter-spacing:0;word-break:normal"><span style="font-weight: bold" class="bold">Here are your login details:</span><br>Username: <span style="font-weight: bold" class="bold">${email}</span><br>Your account will be activated within the next 12 hours. Once activated, the course you purchased will be available in your account.</p></td></tr><tr class="wp-block-editor-dividerblock-v1" align="center" valign="top"><td style="padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px;background-color:#ffffff"><div style="background:#D3D3D3;font-size:1px;line-height:1px;border:0">&nbsp;</div></td></tr><tr class="wp-block-editor-headingblock-v1"><td valign="top" style="background-color:#ffffff;display:block;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;text-align:center"><p style="font-family:Open Sans, sans-serif;text-align:center;letter-spacing:0;font-size:22px;background-color:#ffffff;color:#141414;margin:0;word-break:normal" class="heading2"><span style="font-weight: bold" class="bold">Need Help? </span></p></td></tr><tr class="wp-block-editor-paragraphblock-v1"><td valign="top" style="padding:0px 0px 0px 0px;background-color:#ffffff"><p class="paragraph" style="font-family:Open Sans, sans-serif;text-align:center;line-height:24.00px;font-size:16px;margin:0;color:#141414;letter-spacing:0;word-break:normal">If you have any questions or need assistance, feel free to contact our support team at <span style="color:#525FE1"><a href="mailto:info@jtcindia.org" data-type="email" data-id="4d344da9-e36f-4f4c-92e9-ba8385eb3ed8-ToZ50iwD_qL1_B_szoQ-R" style="color:#525FE1 !important; display: inline-block;" class="link-4d344da9-e36f-4f4c-92e9-ba8385eb3ed8-ToZ50iwD_qL1_B_szoQ-R">info@jtcindia.org</a></span> or <span style="color:#525FE1"><a href="tel:09990699111" data-type="tel" data-id="4d344da9-e36f-4f4c-92e9-ba8385eb3ed8-aq14m95ArmmCrkjM1y9df" style="color:#525FE1 !important; display: inline-block;" class="link-4d344da9-e36f-4f4c-92e9-ba8385eb3ed8-aq14m95ArmmCrkjM1y9df">+91 999-0699-111.</a></span> </p></td></tr><tr class="wp-block-editor-dividerblock-v1" align="center" valign="top"><td style="padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px;background-color:#ffffff"><div style="background:#D3D3D3;font-size:1px;line-height:1px;border:0">&nbsp;</div></td></tr><tr class="wp-block-editor-headingblock-v1"><td valign="top" style="background-color:#ffffff;display:block;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;text-align:center"><p style="font-family:Open Sans, sans-serif;text-align:center;letter-spacing:0;font-size:22px;background-color:#ffffff;color:#141414;margin:0;word-break:normal" class="heading2"><span style="font-weight: bold" class="bold">Terms &amp; Conditions</span></p></td></tr><tr class="wp-block-editor-listblock-v1"><td style="background-color:#ffffff;padding:20px 20px 20px 20px"><div class="list-block-outlook-outside-left"><ul class="list list-block-list-outside-left" style="padding:0;font-family:Open Sans, sans-serif;line-height:24.00px;font-size:16px;color:#141414;list-style-type:disc;list-style-position:outside;word-break:normal" start="1"><li><span style="letter-spacing: 0px">The paid fee is non-refundable, signifying a commitment to the enrollment process.</span></li><li><span style="letter-spacing: 0px">Admission holds a validity period of one year, emphasizing the need for timely progression. </span></li><li><span style="letter-spacing: 0px">After one year duration, re-admission is necessary, accompanied by updated fees to ensure continuous educational access. </span></li><li><span style="letter-spacing: 0px">Your job and compensation are determined by your hard work and skillsets. <span style="font-weight: bold" class="bold">We do not guarantee any job.</span></span></li></ul></div></td></tr><tr class="wp-block-editor-dividerblock-v1" align="center" valign="top"><td style="padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px;background-color:#ffffff"><div style="background:#D3D3D3;font-size:1px;line-height:1px;border:0">&nbsp;</div></td></tr><tr class="wp-block-editor-headingblock-v1"><td valign="top" style="background-color:#ffffff;display:block;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;text-align:center"><p style="font-family:Open Sans, sans-serif;text-align:center;letter-spacing:0;font-size:18px;background-color:#ffffff;color:#141414;margin:0;word-break:normal" class="heading3"><span style="font-weight: bold" class="bold">Follow us for updates, tips, and exclusive content:</span></p></td></tr><tr class="wp-block-editor-socialiconsblock-v1" role="article" aria-roledescription="social-icons" style="display:table-row;background-color:#ffffff"><td style="width:100%"><table style="background-color:#ffffff;width:100%;padding-top:0;padding-bottom:20px;padding-left:10px;padding-right:10px;border-collapse:separate !important" cellpadding="0" cellspacing="0" role="presentation"><tbody><tr><td align="center" valign="top"><div style="max-width:680px"><table role="presentation" style="width:100%" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td valign="top"><div style="margin-left:auto;margin-right:auto;margin-top:-2.75px;margin-bottom:-2.75px;width:100%;max-width:246px"><table role="presentation" style="padding-left:217" width="100%" cellpadding="0" cellspacing="0"><tbody><tr><td><table role="presentation" align="left" style="float:left" class="single-social-icon" cellpadding="0" cellspacing="0"><tbody><tr><td valign="top" style="padding-top:2.75px;padding-bottom:2.75px;padding-left:5.5px;padding-right:5.5px;border-collapse:collapse !important;border-spacing:0;font-size:0"><a class="social-icon--link" href="https://www.youtube.com/@JTCINDIA" target="_blank" rel="noreferrer"><img src="https://template-editor-assets.s3.eu-west-3.amazonaws.com/assets/social-icons/youtube/youtube-round-solid-color.png" width="30" height="30" style="max-width:30px;display:block;border:0" alt="Youtube"></a></td></tr></tbody></table><table role="presentation" align="left" style="float:left" class="single-social-icon" cellpadding="0" cellspacing="0"><tbody><tr><td valign="top" style="padding-top:2.75px;padding-bottom:2.75px;padding-left:5.5px;padding-right:5.5px;border-collapse:collapse !important;border-spacing:0;font-size:0"><a class="social-icon--link" href="https://www.instagram.com/jtcindia/" target="_blank" rel="noreferrer"><img src="https://template-editor-assets.s3.eu-west-3.amazonaws.com/assets/social-icons/instagram/instagram-round-solid-color.png" width="30" height="30" style="max-width:30px;display:block;border:0" alt="Instagram"></a></td></tr></tbody></table><table role="presentation" align="left" style="float:left" class="single-social-icon" cellpadding="0" cellspacing="0"><tbody><tr><td valign="top" style="padding-top:2.75px;padding-bottom:2.75px;padding-left:5.5px;padding-right:5.5px;border-collapse:collapse !important;border-spacing:0;font-size:0"><a class="social-icon--link" href="https://t.me/joinchat/AAAAAFBFWBo28M8YNefbSA" target="_blank" rel="noreferrer"><img src="https://template-editor-assets.s3.eu-west-3.amazonaws.com/assets/social-icons/telegram/telegram-round-solid-color.png" width="30" height="30" style="max-width:30px;display:block;border:0" alt="Telegram"></a></td></tr></tbody></table><table role="presentation" align="left" style="float:left" class="single-social-icon" cellpadding="0" cellspacing="0"><tbody><tr><td valign="top" style="padding-top:2.75px;padding-bottom:2.75px;padding-left:5.5px;padding-right:5.5px;border-collapse:collapse !important;border-spacing:0;font-size:0"><a class="social-icon--link" href="https://www.facebook.com/jtcindiaofficial" target="_blank" rel="noreferrer"><img src="https://template-editor-assets.s3.eu-west-3.amazonaws.com/assets/social-icons/facebook/facebook-round-solid-color.png" width="30" height="30" style="max-width:30px;display:block;border:0" alt="Facebook"></a></td></tr></tbody></table><table role="presentation" align="left" style="float:left" class="single-social-icon" cellpadding="0" cellspacing="0"><tbody><tr><td valign="top" style="padding-top:2.75px;padding-bottom:2.75px;padding-left:5.5px;padding-right:5.5px;border-collapse:collapse !important;border-spacing:0;font-size:0"><a class="social-icon--link" href="https://twitter.com/jtc_india" target="_blank" rel="noreferrer"><img src="https://template-editor-assets.s3.eu-west-3.amazonaws.com/assets/social-icons/x/x-round-solid-color.png" width="30" height="30" style="max-width:30px;display:block;border:0" alt="X (formerly Twitter)"></a></td></tr></tbody></table><table role="presentation" align="left" style="float:left" class="single-social-icon" cellpadding="0" cellspacing="0"><tbody><tr><td valign="top" style="padding-top:2.75px;padding-bottom:2.75px;padding-left:5.5px;padding-right:5.5px;border-collapse:collapse !important;border-spacing:0;font-size:0"><a class="social-icon--link" href="https://www.linkedin.com/in/jtc-noida/" target="_blank" rel="noreferrer"><img src="https://template-editor-assets.s3.eu-west-3.amazonaws.com/assets/social-icons/linkedin/linkedin-round-solid-color.png" width="30" height="30" style="max-width:30px;display:block;border:0" alt="LinkedIn"></a></td></tr></tbody></table></td></tr></tbody></table></div></td></tr></tbody></table></div></td></tr></tbody></table></td></tr>
                        </table>
                    <!--[if mso | IE]>
                    </td>
                </tr>
            </tbody>
            </table>
            <![endif]-->
        </center>
    </body>
</html>`
const option =  {EMAIL_TO : process.env.EMAIL_TO, subject : "Course Purchase Login Credentials", message : sendTemplate}
 await sendEmail(option)
const userCreadiontals =  {EMAIL_TO : email, subject : "Course Purchase Login Credentials", message : sendTemplate}
 await sendEmail(userCreadiontals)
return NextResponse.json(
  { message: 'Course Purchased Successfully', isOk: true },
  { status: 200 }
 );

}
    else return NextResponse.json(
      { message: 'DataBase Error ', isOk: false },
      { status: 200 }
     )
}


// all Cart and whishlist items
export async function GET(req){
  const email = req.headers.get('X-User-Email');
  const redisdata = await client.get(`EcommersCW${email}`);
  if(!redisdata){
    
  const query = `Select course.id as courseId,cart.id,course.course_link,course.name, course.image, course.total_price,  course.discount, 'Cart' as cart from jtc_ecommers_cart as cart Left Join jtc_ecommers_courses as course ON course.id = cart.course UNION All  Select course.id as courseId,wish.id, course.course_link, course.name, course.image,  course.total_price, course.discount , 'Wish' as cart from jtc_ecommers_wishlist as wish Left Join jtc_ecommers_courses as course ON course.id = wish.course `
  const data =  await executeQuery(query)
  if(data.length > 0) {
    const value = await JSON.stringify(data)
  await client.set(`EcommersCW${email}`, value,{
    EX: process.env.REDIS_EXP,   
    NX: true
  });
      return NextResponse.json({data},{success : true}, {status : 200})}
  else return NextResponse.json({message : "Data Empty"},{success : false}, {status : 206})
}else{ 
  const data = await JSON.parse(redisdata)
 
  return NextResponse.json({data}, { success : true}, {status : 200})
 }
}


// 
export async function PATCH(req){
  const {id, add, rem} = await req.json()
  const insert =  `INSERT INTO jtc_ecommers_${add} (user, course) SELECT user, course FROM jtc_ecommers_${rem} WHERE id = '${id}' AND NOT EXISTS ( SELECT 1 FROM jtc_ecommers_${add} WHERE jtc_ecommers_${add}.user = jtc_ecommers_${rem}.user AND jtc_ecommers_${add}.course = jtc_ecommers_${rem}.course
);`
  const insertQuery =  await executeQuery(insert)
 
  if(insertQuery.affectedRows > 0){
    const query =  `Delete from jtc_ecommers_${rem} WHERE id = ${id}`
    const runQuery =  await executeQuery(query)
    if(runQuery.affectedRows > 0) {
      const email = req.headers.get('X-User-Email');
       await client.del(`EcommersCW${email}`);
       await client.del(`Ecommers${email}CartLength`)
      
       return NextResponse.json({data : `course Move Successfullu`}, { success : true}, {status : 200})
      }
  }
  else return NextResponse.json({data : `course Already Exists on Tabel`}, { success : true}, {status : 206})
  
}  

