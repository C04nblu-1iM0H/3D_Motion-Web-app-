import { query } from "@/app/lib/db";

export async function GET(){
    try {
        const getAllCourse = await query({
            query:`SELECT id, course_name, course_description
                   FROM course`,
        })
        return new Response(JSON.stringify({
            getAllCourse,
            status: 200,
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            error,
            status: 500,
        }));
    }
}