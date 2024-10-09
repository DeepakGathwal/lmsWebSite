// 2 apis
import { NextResponse } from "next/server";
import  bycrypt from 'bcryptjs'
import { executeQuery } from '@/conn/conn';
import { client } from "@/middelware/redisFile";
import { sendEmail } from "@/middelware/sendEmail";


export async  function PATCH(req){
    const {email} = await req.json()
    const query =  `Select id, name from jtc_ecommers_users WHERE email = '${email}' && deleted_by = '0'`
    const data =  await executeQuery(query)

    if (data.length > 0) {
        const otp = Math.floor(1000 + Math.random() * 9000);
    
        /** save otp */
        const id =  data[0].id
        const name =  data[0].name
        const addOtp =  `Update jtc_ecommers_users  SET otp = '${otp}' WHERE id = '${id}'`
        const insertOtp = await executeQuery(addOtp)
          if(insertOtp.affectedRows == 0) return NextResponse.json(
            { message: 'Update Error ', success: false },
            { status: 206 }
           )
      

           const tempalte = ` <!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="x-apple-disable-message-reformatting">
        <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">

        <meta name="color-scheme" content="light">
        <meta name="supported-color-schemes" content="light">

        
        <!--[if !mso]><!-->
          
          <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap">
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap">

          <style type="text/css">
          // TODO: fix me!
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
    text-decoration: none;
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
    text-decoration: none;
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
                            <tr class="wp-block-editor-imageblock-v1"><td style="background-color:#ffffff;padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px" align="center"><table align="center" width="95.2" class="imageBlockWrapper" style="width:95.2px" role="presentation"><tbody><tr><td style="padding:0"><a href="https://jtcindia.org"><img src="https://api.smtprelay.co/userfile/1270360d-c285-408d-88d5-625aca82e230/logo.webp" width="95.2" height="" alt="" style="border-radius:0px;display:block;height:auto;width:100%;max-width:100%;border:0" class="g-img"></a></td></tr></tbody></table></td></tr><tr class="wp-block-editor-headingblock-v1"><td valign="top" style="background-color:#ffffff;display:block;padding-top:20px;padding-right:20px;padding-bottom:5px;padding-left:20px;text-align:center"><p style="font-family:Open Sans, sans-serif;text-align:center;line-height:25.30px;font-size:22px;background-color:#ffffff;color:#141414;margin:0;word-break:normal" class="heading2"><span style="font-weight: bold" class="bold">Hi ${name} ,Your OTP Verification Code</span></p></td></tr><tr class="wp-block-editor-paragraphblock-v1"><td valign="top" style="padding:20px 50px 5px 50px;background-color:#ffffff"><p class="paragraph" style="font-family:Open Sans, sans-serif;text-align:center;line-height:28.90px;font-size:17px;margin:0;color:#141414;word-break:normal">To complete your verification process, please use the following One-Time Password (OTP)</p></td></tr><tr class="wp-block-editor-paragraphblock-v1"><td valign="top" style="padding:0px 0px 0px 0px;background-color:#ffffff"><p class="paragraph" style="font-family:Open Sans, sans-serif;text-align:center;font-size:26px;margin:0;color:#141414;letter-spacing:0;word-break:normal"><span style="color:#646464"><span style="font-weight: bold" class="bold">${otp}</span></span></p></td></tr><tr class="wp-block-editor-paragraphblock-v1"><td valign="top" style="padding:20px 20px 20px 20px;background-color:#ffffff"><p class="paragraph" style="font-family:Open Sans, sans-serif;text-align:center;font-size:16px;margin:0;color:#141414;letter-spacing:0;word-break:normal"> This code will expire in 5 minutes. Do not share this code with anyone.<br><br><br><br>If you did not request this verification, please ignore this email.</p></td></tr><tr class="wp-block-editor-dividerblock-v1" align="center" valign="top"><td style="padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px;background-color:#ffffff"><div style="background:#d3d3d3;font-size:1px;line-height:1px;border:0">&nbsp;</div></td></tr><tr class="wp-block-editor-socialiconsblock-v1" role="article" aria-roledescription="social-icons" style="display:table-row;background-color:#ffffff"><td style="width:100%"><table style="background-color:#ffffff;width:100%;padding-top:0;padding-bottom:0;padding-left:0;padding-right:0;border-collapse:separate !important" cellpadding="0" cellspacing="0" role="presentation"><tbody><tr><td align="center" valign="top"><div style="max-width:700px"><table role="presentation" style="width:100%" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td valign="top"><div style="margin-left:auto;margin-right:auto;margin-top:-2px;margin-bottom:-2px;width:100%;max-width:228px"><table role="presentation" style="padding-left:236" width="100%" cellpadding="0" cellspacing="0"><tbody><tr><td><table role="presentation" align="left" style="float:left" class="single-social-icon" cellpadding="0" cellspacing="0"><tbody><tr><td valign="top" style="padding-top:2px;padding-bottom:2px;padding-left:4px;padding-right:4px;border-collapse:collapse !important;border-spacing:0;font-size:0"><a class="social-icon--link" href="https://www.youtube.com/@JTCINDIA" target="_blank" rel="noreferrer"><img src="https://template-editor-assets.s3.eu-west-3.amazonaws.com/assets/social-icons/youtube/youtube-round-solid-color.png" width="30" height="30" style="max-width:30px;display:block;border:0" alt="Youtube"></a></td></tr></tbody></table><table role="presentation" align="left" style="float:left" class="single-social-icon" cellpadding="0" cellspacing="0"><tbody><tr><td valign="top" style="padding-top:2px;padding-bottom:2px;padding-left:4px;padding-right:4px;border-collapse:collapse !important;border-spacing:0;font-size:0"><a class="social-icon--link" href="https://www.instagram.com/jtcindia/" target="_blank" rel="noreferrer"><img src="https://template-editor-assets.s3.eu-west-3.amazonaws.com/assets/social-icons/instagram/instagram-round-solid-color.png" width="30" height="30" style="max-width:30px;display:block;border:0" alt="Instagram"></a></td></tr></tbody></table><table role="presentation" align="left" style="float:left" class="single-social-icon" cellpadding="0" cellspacing="0"><tbody><tr><td valign="top" style="padding-top:2px;padding-bottom:2px;padding-left:4px;padding-right:4px;border-collapse:collapse !important;border-spacing:0;font-size:0"><a class="social-icon--link" href="https://t.me/joinchat/AAAAAFBFWBo28M8YNefbSA" target="_blank" rel="noreferrer"><img src="https://template-editor-assets.s3.eu-west-3.amazonaws.com/assets/social-icons/telegram/telegram-round-solid-color.png" width="30" height="30" style="max-width:30px;display:block;border:0" alt="Telegram"></a></td></tr></tbody></table><table role="presentation" align="left" style="float:left" class="single-social-icon" cellpadding="0" cellspacing="0"><tbody><tr><td valign="top" style="padding-top:2px;padding-bottom:2px;padding-left:4px;padding-right:4px;border-collapse:collapse !important;border-spacing:0;font-size:0"><a class="social-icon--link" href="https://www.facebook.com/jtcindiaofficial" target="_blank" rel="noreferrer"><img src="https://template-editor-assets.s3.eu-west-3.amazonaws.com/assets/social-icons/facebook/facebook-round-solid-color.png" width="30" height="30" style="max-width:30px;display:block;border:0" alt="Facebook"></a></td></tr></tbody></table><table role="presentation" align="left" style="float:left" class="single-social-icon" cellpadding="0" cellspacing="0"><tbody><tr><td valign="top" style="padding-top:2px;padding-bottom:2px;padding-left:4px;padding-right:4px;border-collapse:collapse !important;border-spacing:0;font-size:0"><a class="social-icon--link" href="https://twitter.com/jtc_india" target="_blank" rel="noreferrer"><img src="https://template-editor-assets.s3.eu-west-3.amazonaws.com/assets/social-icons/x/x-round-solid-color.png" width="30" height="30" style="max-width:30px;display:block;border:0" alt="X (formerly Twitter)"></a></td></tr></tbody></table><table role="presentation" align="left" style="float:left" class="single-social-icon" cellpadding="0" cellspacing="0"><tbody><tr><td valign="top" style="padding-top:2px;padding-bottom:2px;padding-left:4px;padding-right:4px;border-collapse:collapse !important;border-spacing:0;font-size:0"><a class="social-icon--link" href="https://www.linkedin.com/in/jtc-noida/" target="_blank" rel="noreferrer"><img src="https://template-editor-assets.s3.eu-west-3.amazonaws.com/assets/social-icons/linkedin/linkedin-round-solid-color.png" width="30" height="30" style="max-width:30px;display:block;border:0" alt="LinkedIn"></a></td></tr></tbody></table></td></tr></tbody></table></div></td></tr></tbody></table></div></td></tr></tbody></table></td></tr><tr><td valign="top" align="center" style="padding:20px 20px 20px 20px;background-color:#ffffff"><p aria-label="Unsubscribe" class="paragraph" style="font-family:Open Sans, sans-serif;text-align:center;line-height:18.40px;font-size:16px;margin:0;color:#141414;letter-spacing:0;word-break:normal">Thank you,<br><span style="font-weight: bold" class="bold">Team JTC</span></p></td></tr>
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



    const option =  {EMAIL_TO : email, subject : "JTC Account Verification Code", message : tempalte}
 await sendEmail(option)
         
          return NextResponse.json(
            {success : true, message : "Check Email" },
            { status: 200}
           )
    }
else return NextResponse.json(
    { message: 'Wrong Email ', success :  false },
    { status: 206}
   )
}


export async function POST(req){
  const { password, confirmPassword,  otp} = await req.json()
  if(password !== confirmPassword) return   NextResponse.json({message : "Password Not Match"},{success : false}, {status : 206})
   const find =  ` Select id from jtc_ecommers_users WHERE otp ='${otp}' && deleted_by = '0'`
  const findPassword = await executeQuery(find)
 
  if(findPassword.length == 0)  return NextResponse.json({message : "Wrong Otp"}, {status : 206})
      const encryptPass = bycrypt.hashSync(password, 8)
    const id =  findPassword[0].id
    const insertPass =  `Update jtc_ecommers_users SET password = '${encryptPass}', updated_at = current_timestamp() WHERE id = '${id}'`
  const data = await executeQuery(insertPass)
  if(data.affectedRows > 0)   return NextResponse.json({data : "Profile Updated"}, {status : 200})
       else  return NextResponse.json({message : "Error"}, {status : 206})
}


// Topics based on course category
export async  function PUT(req){
    const {course, id} = await req.json()
      const redisdata = await client.get(`EcommerTopic${course,id}`);
      if(!redisdata){
          const query = `Select video.topic, video.id, video.videoLink, SEC_TO_TIME(video.timing) as time, video.timing as dectTime from  jtc_ecommers_videos as video WHERE FIND_IN_SET( ${id},video.chapter_id) && video.deleted_by = '0'`
          const data = await executeQuery(query);
           if(data.length > 0) {
          const value =  await JSON.stringify(data)
          await client.set(`EcommerTopic${course,id}`, value,{
            EX: process.env.REDIS_EXP,   
            NX: true
          } );
            return NextResponse.json({data},{success : true}, {status : 200})
          }
          else return NextResponse.json({message : "Data Empty"},{success : false}, {status : 206})
      }else{ 
       const value = await JSON.parse(redisdata)
       return NextResponse.json({data : value}, { success : true}, {status : 200})
  }
  }
  