import prisma from '@/app/lib/db';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id_user = searchParams.get('id_user');

    try {
        const getAllCourseUserAction = await prisma.course.findMany({
            include: {
                favorite: {
                    where: { id_user: Number(id_user) }
                },
                subscribe: {
                    where: { id_user: Number(id_user) }
                }
            }
        });
        const getCourses = await prisma.course.findMany();

        const getAllCourse = getAllCourseUserAction.length > 0 ? getAllCourseUserAction : getCourses;

        return new Response(JSON.stringify({
            getAllCourse,
            status: 200,
        }));
    } catch (error) {
        console.error('Error fetching courses:', error);
        return new Response(JSON.stringify({
            error: error.message,
            status: 500,
        }));
    }
}
