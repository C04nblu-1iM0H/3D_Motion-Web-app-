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
      async authorize(credentials) {
        const {email, password} = credentials;

        const userResult = await query({
          query: "SELECT * FROM user WHERE email = ?",
          values: [email],
        });

        if (!userResult || userResult.length === 0) {
          throw new Error('Такого пользователя не существует');
        }

        const user = userResult[0];
        const passwordOk = user && bcrypt.compareSync(password, user.password);

        if (!passwordOk) {
          throw new Error('Неверный пароль');
        }

        await query({
          query: `UPDATE user SET id_online = 1 WHERE email = ?`,
          values: [email],
        });

        return user;
      }
    })
  ],
  callbacks: {
    async signIn({account, profile}) {
      if (account.provider === 'google') {
        const {email, name} = profile;
        const {usname, surname} = splittingTheName(name);

        const existingUser = await query({
          query: "SELECT * FROM user WHERE email = ?",
          values: [email],
        });

        await query({
          query: `UPDATE user SET id_online = 1 WHERE email = ?`,
          values: [email],
        });

        if (existingUser.length === 0) {
          const createUserdata = await query({
            query: "INSERT INTO user_data (username, surname) VALUES (?,?)",
            values: [usname, surname],
          });
          const idUserData = createUserdata.insertId;

          await query({
            query: "INSERT INTO user (email, id_user_data) VALUES (?, ?)",
            values: [email, idUserData],
          });
        }
      }
      return true;
    },
    async redirect({ baseUrl, req }) {
      const isSigningOut = req && req.query && req.query.signout === 'true';
      if(isSigningOut){
        return 'http://localhost:3000/Signin';
      }else{
        return baseUrl;
      }
    },
    pages: {
      signIn: '/auth/signin',
      error: null 
    }
  },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }