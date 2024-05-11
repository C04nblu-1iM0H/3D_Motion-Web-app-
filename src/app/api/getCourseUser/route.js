import { query } from "../../lib/db";

export async function GET(request) {
    try {
        const user_course_id = request.headers.get('user_course_id');

        const getCoutsesUser = await query({
            query:`SELECT course.id, course.course_name 
                   FROM course
                   INNER JOIN Teacher ON course.id = Teacher.id_course
                   WHERE Teacher.id_user = ?`,
            values:[user_course_id]
        })

        return new Response(JSON.stringify({
            message:'sucsess',
            getCoutsesUser,
            status: 200,
        }));

    } catch (error) {
        console.error('Error fetching user data:', error);
        return new Response(JSON.stringify({
            message:'error',
            status: 500,
        }));
    }   
}


