import { query } from "@/app/lib/db";

export async function GET(request){
    try {
        const id_course = request.headers.get('id');

        const getAllFeedback = await query({
            query:`SELECT f.id, f.feedback_text, u.email, u.id AS id_user
                   FROM feedback AS f
                   LEFT JOIN user AS u ON f.id_user = u.id
                   WHERE f.id_course = ?`,
            values:[id_course]
        });

        return new Response(JSON.stringify({
            getAllFeedback,
            status: 200,
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            error,
            status: 500,
        }));
    }
}

export async function POST(request){
    try {
        const {sendMessage, userId, id} = await request.json();
        await query({
            query:`INSERT INTO feedback (feedback_text, id_user, id_course) VALUES (?, ?, ?)`,
            values:[sendMessage, userId, id],
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