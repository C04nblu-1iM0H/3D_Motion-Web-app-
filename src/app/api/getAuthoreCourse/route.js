import { query } from "@/app/lib/db";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id_course = searchParams.get('id');
    try {
        const getAuthoreCourse = await query({
            query:`SELECT user_data.username, user_data.surname, 
                   authore.id AS id_Authore
                   FROM user_data
                   INNER JOIN user ON user.id_user_data = user_data.id
                   INNER JOIN authore ON authore.id_user = user.id
                   WHERE authore.id_course = ?`,
            values:[id_course],
        })
        return new Response(JSON.stringify({
            getAuthoreCourse,
            status: 200,
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            error:'error',
            status: 500,
        }));
    }
}