import { query } from "../../lib/db";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id_chat = searchParams.get('id');
    console.log(id_chat);
    try {
        const getChatMessage = await query({
            query: `SELECT message.*, user_data.username, user_data.surname
                    FROM message
                    LEFT JOIN user ON message.id_user = user.id
                    LEFT JOIN user_data ON user.id = user_data.id
                    WHERE message.id_chat = ?`,
            values:[id_chat]
        });

        return new Response(JSON.stringify({
            getChatMessage,
            status: 200,
        }));
    } catch (error) {
        console.error('Error fetching user data:', error);
        return new Response(JSON.stringify({
            message: "error",
            status: 500,
        }));
    }
}

export async function POST(request) {
    try {
        const {sendMessage, id_user, id} = await request.json();

        await query({
            query: `INSERT INTO message (text_message, date_dispatch, id_user, id_chat) VALUES (?, NOW(), ?, ?)`,
            values: [sendMessage, id_user, id],
        });

        return new Response(JSON.stringify({
            message:'success',
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

export async function PUT(request) {
    try {
        const {editEmail, editPassword, id, userid } = await request.json();

    } catch (error) {
        console.error('Error fetching user data:', error);
        return new Response(JSON.stringify({
            message:'error',
            status: 500,
        }));
    }   
}

export async function DELETE(request) {
    try {
        const body = await request.json();
        const { userid } = body;

        await query({
            query:``,
            values:[]
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
