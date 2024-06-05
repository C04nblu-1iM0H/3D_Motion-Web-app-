import prisma from '@/app/lib/db';

export async function GET(req) {
    const url = new URL(req.url);
    const currentIdLesson = url.searchParams.get('lessonId');
    const currentUserId = url.searchParams.get('userid');

    try {
        const userProgress = await prisma.user_progress.findFirst({
            where: {
                lesson_id: Number(currentIdLesson),
                user_id: Number(currentUserId),
            },
            select: {
                passed: true,
            },
        });
        return new Response(JSON.stringify({
            message: 'success',
            getPassedLesson: userProgress?.passed || false,
            status: 200,
        }));
    } catch (error) {
        console.error('Error fetching user data:', error);
        return new Response(JSON.stringify({
            message: 'error',
            status: 500,
        }));
    } finally {
        await prisma.$disconnect();
    }
}

export async function POST(request) {
    try {
        const { id_user, id, lessonId } = await request.json();
        const passed = true;
        const result = await prisma.user_progress.create({
            data: {
                user_id: id_user,
                course_id: Number(id),
                lesson_id: Number(lessonId),
                passed: passed,
            },
        });
        console.log(result);
        return new Response(JSON.stringify({
            message: 'success',
            status: 200,
        }));
    } catch (error) {
        console.error('Error fetching user data:', error);
        return new Response(JSON.stringify({
            message: 'error',
            status: 500,
        }));
    } finally {
        await prisma.$disconnect();
    }
}
