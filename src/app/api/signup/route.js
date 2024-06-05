import prisma from '@/app/lib/db';
import bcrypt from 'bcrypt';

export async function POST(request) {
    try {
        const { email, password } = await request.json();
        
        const existingUser = await prisma.user.findFirst({
            where: { email: email },
        });

        if (existingUser) {
            return new Response(JSON.stringify({
                message: "Возможно вы желаете войти",
                status: 400,
            }), {
                status: 400,
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const createUserdata = await prisma.user_data.create({
            data: {},
        });

        const createUser = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                id_user_data: createUserdata.id,
            },
        });

        const result = createUser ? "success" : "error";

        return new Response(JSON.stringify({
            message: result,
            status: 200,
        }), {
            status: 200,
        });
    } catch (error) {
        console.error('Error inserting user:', error);
        return new Response(JSON.stringify({
            message: "error",
            status: 500,
        }));
    }
}
