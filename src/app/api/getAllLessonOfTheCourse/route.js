import prisma from '@/app/lib/db';

export async function GET(req) {
    const url = new URL(req.url);
    const id = url.searchParams.get('_id');
    const userId = url.searchParams.get('userId');

    try {
        const getAllLessonOfTheCourse = await prisma.lesson.findMany({
            where: {
                id_course: Number(id),
            },
            select: {
                id: true,
                lesson_name: true,
                user_progress: {
                    where: {
                        user_id: Number(userId),
                    },
                    select: {
                        passed: true,
                    },
                },
            },
            orderBy: {
                id: 'asc',
            },
        });

        // Добавление поля `passed` для каждого урока с проверкой наличия user_progress
        const lessonsWithProgress = getAllLessonOfTheCourse.map(lesson => ({
            id: lesson.id,
            lesson_name: lesson.lesson_name,
            passed: lesson.user_progress.length > 0 ? lesson.user_progress[0].passed : 0,
        }));

        return new Response(JSON.stringify({
            getAllLessonOfTheCourse: lessonsWithProgress,
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
}