import {query} from '../../../lib/db';
import bcrypt from 'bcrypt';
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    secret: process.env.SECRET,
    providers:[
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),
      CredentialsProvider({
        name: 'Credentials',
        id:'credentials',
        credentials: {
          username: { label: "Email", type: "email", placeholder: "test@example.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
            const {email, password} = credentials;

            const user = await query({
                query: "SELECT * FROM user WHERE email = ?",
                values: [email],
            });
            const passwordOk = user && bcrypt.compareSync(password, user[0].password);
            
            if(passwordOk) return user[0];
          
          return null;
        }
      })
    ],
    callbacks: {
      async redirect({ url, baseUrl, req }) {
        const isSigningOut = req && req.query && req.query.signout === 'true';
        return isSigningOut ? 'http://localhost:3000/Signin' : baseUrl;
      },
    }
});

export { handler as GET, handler as POST }