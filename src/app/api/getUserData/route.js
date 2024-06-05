import prisma from '@/app/lib/db';

export async function GET(req) {
    const url = new URL(req.url);
    const email = url.searchParams.get('email');
    try {
        const userData = await prisma.user.findUnique({
            where: { email: email },
            include: { user_data: true }
        });

        if (!userData) {
            return new Response(JSON.stringify({
                message: "User not found",
                status: 404,
            }));
        }

        return new Response(JSON.stringify({
            user: { id: userData.id, email: userData.email, id_role: userData.id_role },
            userData: userData.user_data,
            status: 200,
        }));

    } catch (error) {
        console.error('Error fetching user data:', error);
        return new Response(JSON.stringify({
            message: "error",
            status: 500,
        }));
    } finally {
        await prisma.$disconnect();
    }
}
