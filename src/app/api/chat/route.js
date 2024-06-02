import { query } from "@/app/lib/db";


export async function GET(req){
        const { searchParams } = new URL(req.url);
        const id_user = searchParams.get('id_user');
    try {
        const getAllChatUser = await query({
            query: `SELECT latest_message.*, course.course_name AS course_name,
                    chat_user_data.username AS username,
                    chat_user_data.surname AS surname
                    FROM chat
                    INNER JOIN 
                        (
                            SELECT 
                                id_chat, 
                                MAX(date_dispatch) AS latest_date
                            FROM 
                                message
                            GROUP BY 
                                id_chat
                        ) AS latest_dates ON chat.id = latest_dates.id_chat
                    INNER JOIN message AS latest_message ON latest_message.id_chat = latest_dates.id_chat AND latest_message.date_dispatch = latest_dates.latest_date
                    LEFT JOIN authore ON chat.id_authore = authore.id
                    LEFT JOIN course ON authore.id_course = course.id
                    LEFT JOIN user_data AS chat_user_data ON chat.id_user = chat_user_data.id
                    WHERE authore.id_user = ?
                    ORDER BY latest_message.date_dispatch DESC;`,
            values:[id_user]
        });
        const getAllChatAuthore = await query({
            query: `SELECT 
                        latest_message.*,
                        course.course_name,
                        user_data.username,
                        user_data.surname
                    FROM  chat
                    INNER JOIN (
                        SELECT id_chat, MAX(date_dispatch) AS latest_date
                        FROM  message
                        GROUP BY  id_chat ) AS latest_dates ON chat.id = latest_dates.id_chat
                    INNER JOIN message AS latest_message ON latest_message.id_chat = latest_dates.id_chat 
                        AND latest_message.date_dispatch = latest_dates.latest_date
                    LEFT JOIN user_data AS chat_user_data ON chat.id_user = chat_user_data.id
                    LEFT JOIN authore ON chat.id_authore = authore.id
                    LEFT JOIN course ON authore.id_course = course.id
                    LEFT JOIN  user ON authore.id_user = user.id
                    LEFT JOIN  user_data ON user.id_user_data = user_data.id
                    WHERE  chat.id_user = ?
                    ORDER BY latest_message.date_dispatch DESC;`,
            values: [id_user],
        });

        const getAllChat = getAllChatUser.length > 0 ? getAllChatUser : getAllChatAuthore;

        return new Response(JSON.stringify({
            getAllChat,
            status: 200,
        }));
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({
            message: 'error',
            status: 500,
        }));
    }
}


export async function POST(request){
    try {
        const { id_user, id_authore } = await request.json();
        
        const existingChat = await query({
            query: `SELECT id FROM chat WHERE id_user = ? AND id_authore = ?`,
            values: [id_user, id_authore],
        });
        
        if (Array.isArray(existingChat) && existingChat.length > 0) {
            return new Response(JSON.stringify({
                chatId: existingChat[0].id,
                status: 200,
            }));
        } 

        const result = await query({
            query: `INSERT INTO chat (id_user, id_authore) VALUES (?, ?)`,
            values: [id_user, id_authore],
        });

        return new Response(JSON.stringify({
            chatId: result.insertId,
            status: 200,
        }));
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({
            message: 'error',
            status: 500,
        }));
    }
}
