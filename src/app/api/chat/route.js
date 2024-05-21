import { query } from "@/app/lib/db";


export async function GET(request){
    try {
        const id_user = request.headers.get('id_user');
        
        const getAllChatUser = await query({
            query: `SELECT chat.id, user_data.username, user_data.surname, message.id_user, message.text_message AS last_message
                    FROM chat
                    INNER JOIN authore ON chat.id_authore = authore.id_user
                    INNER JOIN user ON authore.id_user = user.id
                    INNER JOIN user_data ON user.id_user_data = user_data.id
                    LEFT JOIN message ON chat.id = message.id_chat
                    WHERE chat.id_user = 2
                    GROUP BY chat.id, user_data.username, user_data.surname, message.id_user, message.text_message
                    ORDER BY chat.id DESC LIMIT 1;`,
            values: [id_user, id_user],
        });

        const getAllChatAuthore = await query({
            query:`SELECT chat.id, user_data.username, user_data.surname, message.id_user, message.text_message AS last_message
                    FROM chat
                    INNER JOIN user ON chat.id_user = user.id
                    INNER JOIN user_data ON user.id_user_data = user_data.id
                    INNER JOIN message ON chat.id = message.id_chat 
                    WHERE chat.id_user = ?
                    GROUP BY chat.id, user_data.username, user_data.surname, message.id_user, message.text_message
                    ORDER BY chat.id DESC LIMIT 1;`,
            values:[id_user, id_user]
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
            query: `SELECT id FROM chat WHERE id_user = ? AND id_teacher = ?`,
            values: [id_user, id_authore],
        });
        console.log(existingChat[0].id);
        if (Array.isArray(existingChat) && existingChat.length > 0) {
            return new Response(JSON.stringify({
                chatId: existingChat[0].id,
                status: 200,
            }));
        } 

        const result = await query({
            query: `INSERT INTO chat (date_dispatch, id_user, id_teacher) VALUES (NOW(), ?, ?)`,
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
