import { query } from "@/app/lib/db";

export async function GET(req){
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('_id');
        const userId = url.searchParams.get('userId');

        const getAllLessonOfTheCourse = await query({
            query:`SELECT lesson.id, lesson.lesson_name, COALESCE(user_progress.passed, 0) AS passed
                   FROM lesson
                   LEFT JOIN user_progress ON user_progress.lesson_id = lesson.id AND user_progress.user_id = ?
                   WHERE lesson.id_course = ?
                   ORDER BY lesson.id`,
            values:[userId, id]
        })
        
        return new Response(JSON.stringify({
            getAllLessonOfTheCourse,
            status: 200,
        }));
    } catch (error) {
        console.error("Error fetching user counts:", error);
        return new Response(JSON.stringify({
            message: "Error fetching user counts",
            status: 500,
        }));
    }
}