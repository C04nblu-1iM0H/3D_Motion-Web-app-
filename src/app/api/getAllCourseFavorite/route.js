import prisma from '@/app/lib/db';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id_user = parseInt(searchParams.get('id_user'));

    try {
        const getAllCourseFavorite = await prisma.course.findMany({
            where: {
                favorite: {
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
            getAllCourseFavorite,
            status: 200,
        }));
    } catch (error) {
        console.error('Error fetching user data:', error);
        return new Response(JSON.stringify({
            error,
            status: 500,
        }));
    }
}
