import splittingTheName from '@/utils/splittingTheName';
import bcrypt from 'bcrypt';
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from '@/app/lib/db';

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

        if (!email || !password) {
          throw new Error('Неверные учетные данные');
        }

        const user = await prisma.user.findFirst({
          where: { email: email },
        });

        if (!user) {
          throw new Error('Такого пользователя не существует');
        }
      
        const passwordOk = user && bcrypt.compareSync(password, user.password);

        if (!passwordOk) {
          throw new Error('Неверный пароль');
        }
        await prisma.user.update({
          where: { 
            email: email 
          },
          data: { 
            id_online: 1 
          },
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

        if (!email || !name) {
          throw new Error('Не удалось получить данные профиля');
        }

        const existingUser = await prisma.user.findFirst({
          where: { email: email },
        });

        await prisma.user.updateMany({
          where: { email: email },
          data: { id_online: 1 },
        });

        if (!existingUser) {
          const createUserdata = await prisma.user_data.create({
            data: { username: usname, surname: surname },
          });

          await prisma.user.create({
            data: { email: email, id_user_data: createUserdata.id },
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