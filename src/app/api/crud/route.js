import { query } from "../../lib/db";
import bcrypt from 'bcrypt';

export async function GET() {
    try {

        const allUsers = await query({
            query: `SELECT user.*, user_data.id AS user_data_id, user_data.username, user_data.surname, 
                           user_data.id_gender, user_data.data_birthday, user_data.telephone , gender.gender_name
                    FROM user
                    INNER JOIN user_data ON user.id_user_data = user_data.id
                    INNER JOIN gender ON user_data.id_gender = gender.id
                    ORDER BY user.id ASC`,
        });

        const role = await query({
            query:`SELECT * FROM role`
        })

        return new Response(JSON.stringify({
            allUsers,
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

export async function PUT(request) {
    try {
        const {editEmail, editPassword, id, userid } = await request.json();

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword =  bcrypt.hashSync(editPassword, salt);
        
        await query({
            query: "UPDATE user SET email = ?, password = ?, id_role = ?  WHERE id = ?",
            values: [editEmail, hashedPassword, id, userid],
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
        const body = await request.json();
        const { userid } = body;

        await query({
            query:`DELETE user, user_data 
                   FROM user
                   INNER JOIN user_data ON user.id_user_data = user_data.id
                   WHERE user.id = ?`,
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
