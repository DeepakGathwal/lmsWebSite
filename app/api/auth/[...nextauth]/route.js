import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import LinkedInProvider from "next-auth/providers/linkedin"
import instance from "../../../../apis/commonapi"
import bcrypt from 'bcryptjs'
import { executeQuery } from "@/conn/conn";


const handler = NextAuth({
  // Configure one or more authentication providers
 
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
     
        const query = `Select email,id, name, password from jtc_ecommers_users WHERE email = '${credentials.email}' && deleted_by = '0'`
        const data = await executeQuery(query)
     
        if(data.length == 0 ) return null
        const password = data && data[0].password
          if (data && bcrypt.compareSync(credentials.password, String(password))) {
        const updateQuery = `Update jtc_ecommers_users SET last_login = current_timestamp() WHERE id = '${data[0].id}' && deleted_by = '0'`
          const runInsertQuery =  await executeQuery(updateQuery)
        
         if(runInsertQuery.affectedRows > 0) {
          const value = data[0]
       
          return { email: value.email, id: value.id, name: value.name };
        }
        }else 
         
          return null;
        
      }
    }),

    //  google provider
    GoogleProvider({
        clientId: process.env.Google_Client_ID,
        clientSecret: process.env.Google_CLIENT_SECRET
      }),
    // ...add more providers here
      // linkedin provider
    LinkedInProvider({
      clientId: process.env.LINKEDIN_ID,
      clientSecret: process.env.LINKEDIN_SECRET,
      authorization: { params: { scope: 'profile email openid' } },
      issuer: 'https://www.linkedin.com/oauth',
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      async profile(profile) {
          return {
              id: profile.sub,
              name: profile.name,
              firstname: profile.given_name,
              lastname: profile.family_name,
              email: profile.email,
              image: profile.profilePicture,
          }
      },
  }),

  // github provider
  GitHubProvider({
      clientId: process.env.GIT_API_KEY,
      clientSecret: process.env.GIT_CLIENT_SECRET,
    version: "2.0",
  })
  ],
  session : {
    strategy : 'jwt',
  
    secret: process.env.NEXTAUTH_SECRET,
  },
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },

  // return data after login by provider
  callbacks: {
    async signIn({ account, profile }) {
   
      if(account.provider == 'credentials') return account
      else {
    
        
        return await instance.post('/register', JSON.stringify({profile, provider : account.provider}))}
    },
    async redirect({ url, baseUrl }) {
       if (url.startsWith(baseUrl)) {
        return baseUrl;
      } else if (url.startsWith("/")) {
        return new URL(url, baseUrl).toString();
      }
      return baseUrl;
    },
    
  }
})


export { handler as GET, handler as POST }
