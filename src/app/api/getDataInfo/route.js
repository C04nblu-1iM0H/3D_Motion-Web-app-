import prisma from '@/app/lib/db';

export async function GET() {
    try {
        const onlineUsersCount = await prisma.user.count({
            where: {
                id_online: 1,
            },
        });

        const countUsers = await prisma.user.count();

        const totalCourse = await prisma.course.count();

        return new Response(JSON.stringify({
            onlineUsersCount,
            countUsers,
            totalCourse,
            status: 200,
        }));
    } catch (error) {
        console.error("Error fetching user counts:", error);
        return new Response(JSON.stringify({
            message: "Error fetching user counts",
            status: 500,
        }));
    } finally {
        await prisma.$disconnect();
    }
};
