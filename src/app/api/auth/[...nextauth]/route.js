import {query} from '../../../lib/db';
import bcrypt from 'bcrypt';
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    secret: process.env.SECRET,
    providers:[
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
            console.log({user});

            const passwordOk = user && bcrypt.compareSync(password, user[0].password);

            console.log({passwordOk});
            if(passwordOk) return user[0];
        
            
          return null
        }
      })
  ]
})

export { handler as GET, handler as POST }