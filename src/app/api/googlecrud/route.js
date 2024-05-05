import { query } from "../../lib/db";

export async function GET() {
    try {

        const allUsersGoogle = await query({
            query: `SELECT userGoogle.*, user_data.id AS userGoogle_data_id, user_data.username, user_data.surname, 
                           user_data.id_gender, user_data.data_birthday, user_data.telephone, gender.gender_name
                    FROM userGoogle
                    INNER JOIN user_data ON userGoogle.id_user_data = user_data.id
                    INNER JOIN gender ON user_data.id_gender = gender.id
                    ORDER BY userGoogle.id ASC`,
        });

        const role = await query({
            query:`SELECT * FROM role`
        })

        return new Response(JSON.stringify({
            allUsersGoogle,
            role,
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
        const {user_id, editEmailGoogle, id} = await request.json();
        await query({
            query: "UPDATE userGoogle SET emailGoogle = ?, id_role = ?  WHERE id = ?",
            values: [editEmailGoogle, id, user_id],
        });

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

export async function DELETE(request) {
    try {
        const body = await request.json(); // Извлекаем тело запроса
        const { userid } = body; // Извлекаем userid из тела запроса

        await query({
            query:`DELETE userGoogle, user_data 
                   FROM userGoogle
                   INNER JOIN user_data ON userGoogle.id_user_data = user_data.id
                   WHERE userGoogle.id = ?`,
            values:[userid]
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
