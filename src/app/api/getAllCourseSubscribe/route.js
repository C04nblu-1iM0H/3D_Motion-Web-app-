import prisma from '@/app/lib/db';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id_user = parseInt(searchParams.get('id_user'));

    try {
        const getAllCourseSubscribe = await prisma.course.findMany({
            where: {
                subscribe: {
                    some: {
                        id_user: id_user
                    }
                }
            },
            include: {
                favorite: true,
                subscribe: true
            }
        });

        return new Response(JSON.stringify({
            getAllCourseSubscribe,
            status: 200,
        }));
    } catch (error) {
        console.error('Error fetching user data:', error);
        return new Response(JSON.stringify({
            error,
            status: 500,
        }));
    } finally {
        await prisma.$disconnect();
    }
}
