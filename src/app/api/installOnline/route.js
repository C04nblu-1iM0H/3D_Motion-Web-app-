import prisma from '@/app/lib/db';

export async function PUT(request) {
    try {
        const { email } = await request.json();
        await prisma.user.update({
            where: { email: email },
            data: { id_online: 0 }
        });

        return new Response(JSON.stringify({
            message: "User logged out successfully",
            status: 200,
        }));
    } catch (error) {
        console.error('Error updating user:', error);
        return new Response(JSON.stringify({
            message: "error",
            status: 500,
        }));
    } finally {
        await prisma.$disconnect();
    }
}
