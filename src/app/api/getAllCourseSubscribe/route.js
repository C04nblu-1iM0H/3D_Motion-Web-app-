import { query } from "@/app/lib/db";

export async function GET(request){
    try {

        const id_user = request.headers.get('id_user');

        const getAllCourseSubscribe = await query({
            query:`SELECT course.*, 
            favorite.id AS id_favorite, favorite.id_user, favorite.id_course,  
            subscribe.id As id_subscribe, subscribe.id_user, subscribe.id_course
            FROM course
            LEFT JOIN favorite ON course.id = favorite.id_course AND favorite.id_user =  ?
            INNER JOIN subscribe ON course.id = subscribe.id_course AND subscribe.id_user =  ?`,
            values:[id_user, id_user]
        });

        return new Response(JSON.stringify({
            getAllCourseSubscribe,
            status: 200,
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            error,
            status: 500,
        }));
    }
}