import { query } from "@/app/lib/db";

export async function GET(req){
    const { searchParams } = new URL(req.url);
    const id_user = searchParams.get('id_user');

    try {
        const getAllCourseUserAction = await query({
            query:`SELECT course.*, 
            favorite.id AS id_favorite, favorite.id_user, favorite.id_course,  
            subscribe.id As id_subscribe, subscribe.id_user, subscribe.id_course
            FROM course
            LEFT JOIN favorite ON course.id = favorite.id_course AND favorite.id_user =  ?
            LEFT JOIN subscribe ON course.id = subscribe.id_course AND subscribe.id_user =  ?`,
            values:[id_user, id_user]
        });

        const getCourses = await query({
            query:`SELECT course.* FROM course;`,
        });

        const getAllCourse = getAllCourseUserAction.length > 0 ? getAllCourseUserAction : getCourses ;

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