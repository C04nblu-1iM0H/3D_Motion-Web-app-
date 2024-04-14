import splittingTheName from '@/utils/splittingTheName';
import {query} from '../../../lib/db';
import bcrypt from 'bcrypt';
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
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
    async signIn({account, profile}) {
      if (account.provider === 'google') {
        const {email, name} = profile;
        const {usname, surname} = splittingTheName(name);

        const existingUser = await query({
          query: "SELECT * FROM userGoogle WHERE emailGoogle = ?",
          values: [email],
        });

        if (existingUser.length === 0) {
          const createUserdata = await query({
            query: "INSERT INTO user_data (name, surname) VALUES (?,?)",
            values: [usname, surname],
          });
          //запоминаем id из таблицы user_data
          const idUserData = createUserdata.insertId;

          await query({
            query: "INSERT INTO userGoogle (emailGoogle, id_user_data) VALUES (?, ?)",
            values: [email, idUserData],
          });
        }
      }
      return true;
    },
    async redirect({ baseUrl, req }) {
      const isSigningOut = req && req.query && req.query.signout === 'true';
      return isSigningOut ? 'http://localhost:3000/Signin' : baseUrl;
    },
  },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }