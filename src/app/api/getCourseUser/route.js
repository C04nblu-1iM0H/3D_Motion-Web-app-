import { query } from "../../lib/db";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const user_course_id = searchParams.get('user_course_id'); //id текущего пользователя
    try {

        const getUserRole = await query({
            query:`SELECT user.id_role 
                   FROM user 
                   WHERE user.id = ?;`,
            values:[user_course_id],
        })

        const getCourses = await query({
            query:`SELECT * FROM course`
        })

        const getCoursesUser = await query({
            query:`SELECT course.id, course.course_name, course_picture
                   FROM course
                   INNER JOIN authore ON course.id = authore.id_course
                   WHERE authore.id_user = ?`,
            values:[user_course_id]
        })

        const getCourseCurrentUser = getUserRole[0].id_role === 1 ? getCourses : getCoursesUser;

        return new Response(JSON.stringify({
            message:'sucsess',
            getCourseCurrentUser,
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


