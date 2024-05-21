import { query } from "@/app/lib/db";

export async function GET(req){
    try {
        const url = new URL(req.url);
        const currentIdLesson = url.searchParams.get('lessonId');
        const currentUserId = url.searchParams.get('userid');
        console.log(currentUserId);

        
        const getPassedLesson = await query({
            query:`SELECT passed FROM user_progress 
            WHERE lesson_id = ? AND  user_id = ?`,
            values:[currentIdLesson, currentUserId],
        })

        return new Response(JSON.stringify({
            message:'sucsess',
            getPassedLesson,
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


export async function POST(request) {
    try {
        const {id_user, id, lessonId} = await request.json();
        const passed = 1;
        await query({
            query: `INSERT INTO user_progress  (user_id, course_id, lesson_id, passed) VALUES (?, ?, ?, ?)`,
            values:[id_user, id, lessonId, passed],
        })
        return new Response(JSON.stringify({
            message:'sucsess',
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