import prisma from '@/app/lib/db';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id_course = searchParams.get('id');

    try {
        const getAuthoreCourse = await prisma.authore.findMany({
            where: { id_course: Number(id_course) },
            select: {
                id: true,
                user: {
                    select: {
                        user_data: {
                            select: {
                                username: true,
                                surname: true,
                            }
                        }
                    }
                },
            },
        });

        const formattedAuthoreCourse = getAuthoreCourse.map(authore => ({
            username: authore.user.user_data.username,
            surname: authore.user.user_data.surname,
            id_Authore: authore.id,
        }));

        return new Response(JSON.stringify({
            getAuthoreCourse: formattedAuthoreCourse,
            status: 200,
        }));
    } catch (error) {
        console.error('Error fetching author course data:', error);
        return new Response(JSON.stringify({
            error: 'error',
            status: 500,
        }));
    }
}