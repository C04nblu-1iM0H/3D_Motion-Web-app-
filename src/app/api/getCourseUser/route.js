import prisma from '@/app/lib/db';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const user_course_id = parseInt(searchParams.get('user_course_id')); //id текущего пользователя

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: user_course_id
            },
            select: {
                id_role: true
            }
        });

        let getCourseCurrentUser;

        if (user.id_role === 1) {
            getCourseCurrentUser = await prisma.course.findMany();
        } else {
            getCourseCurrentUser = await prisma.course.findMany({
                select: {
                    id: true,
                    course_name: true,
                    course_picture: true
                },
                where: {
                    authore: {
                        some: {
                            id_user: user_course_id
                        }
                    }
                }
            });
        }

        return new Response(JSON.stringify({
            message: 'success',
            getCourseCurrentUser,
            status: 200,
        }));
    } catch (error) {
        console.error('Error fetching user data:', error);
        return new Response(JSON.stringify({
            message: 'error',
            status: 500,
        }));
    }
}
