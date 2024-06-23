import prisma from '@/app/lib/db';

export async function GET(req) {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');
    try {

        const countCourses = await prisma.course.aggregate({
            _count:{
                id:true,
            }
        })

        const countLessons = await prisma.lesson.aggregate({
            _count:{
                id:true,
            }
        })
        //получаю количесвто проиденных уроков
        const countLessonsCompleted = await prisma.user_progress.aggregate({
            _count: {
                lesson_id: true,
            },
            where: {
                user_id: Number(userId),
            },
        });
        //получаю количесвто пройденных ресурсов 
        const courses = await prisma.course.findMany({
            include: {
                lesson: {
                    include: {
                        user_progress: {
                            where: {
                                user_id: 1,
                                passed: true
                            }
                        }
                    }
                }
            }
        });

          // прогоняю каждый курс через фильтр и смотрю, где кол-во курсов === кол-во пройденных ресурсов и где кол-во уроков не равно 0
        const completedCourses = courses.filter(course => {
            const totalLessons = course.lesson.length;
            const completedLessons = course.lesson.filter(lesson => lesson.user_progress.length > 0).length;
            return totalLessons === completedLessons && totalLessons !== 0;
        });

        const completedCoursesCount = completedCourses.length;

        //ресурсы, которые проходит пользователь в данный момент и статистика сколько уроков он прошёл
        const countCoursesWithLessonCount = await prisma.course.findMany({
            select: {
                id:true,
                course_name: true,
                _count: {
                    select: { lesson: true },
                },
                lesson: {
                    select: {
                        _count: {
                        select: { user_progress: true },
                        },
                    },
                    where: {
                        user_progress: {
                            some: {
                                user_id: 1,
                                passed: true,
                            },
                        },
                    },
                },
            },
            where: {
                subscribe: {
                    some: {
                        id_user: 1,
                    },
                },
            },
        });
          
          const subscribedCoursesWithLessonCount = countCoursesWithLessonCount
            .filter(course => course.lesson.some(less => less._count.user_progress > 0))
            .map(course => ({
                course_name: course.course_name,
                count_lesson: course._count.lesson,
                completed_lesson: course.lesson.reduce((acc, less) => acc + less._count.user_progress, 0),
            }));

        return new Response(JSON.stringify({
            countCourses,
            countLessons,
            countLessonsCompleted,
            completedCoursesCount,
            subscribedCoursesWithLessonCount,
            status: 200,
        }));
    } catch (error) {
        console.error('Error fetching user data:', error);
        return new Response(JSON.stringify({
            message: "error",
            status: 500,
        }));
    } 
}