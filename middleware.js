import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt';
// This function can be marked `async` if using `await` inside
export async function middleware(req) {
//   return NextResponse.redirect(new URL('/home', request.url))

  const secret = process.env.NEXTAUTH_SECRET;
  const last =  await getToken({req,secret })
  
  if(!last){
    return NextResponse.json(
      { success: false, data: 'Login First' },
      { status: 206 }
      )}
      
      const res = NextResponse.next();
  res.headers.set('X-User-Email', last.email);
  res.headers.set('X-User-Name', last.name);

  return res;


}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/api/login','/api/payment','/api/cart','/api/videos','/api/profile','/profile','/cart','/api/coments' ],
}