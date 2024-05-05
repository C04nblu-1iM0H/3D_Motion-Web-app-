import { query } from "@/app/lib/db";

export async function GET(req){
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('_id');

        const getAllLessonOfTheCourse = await query({
            query:`SELECT * FROM lesson WHERE id_course = ?`,
            values:[id]
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