import { query } from "../../lib/db";

export async function POST(request) {
    try {
        const { email } = await request.json();

        const userData = await query({
            query: `SELECT user_data.*
                    FROM user_data
                    LEFT JOIN user ON user.id_user_data = user_data.id
                    LEFT JOIN userGoogle ON userGoogle.id_user_data = user_data.id
                    WHERE user.email = ? OR userGoogle.emailGoogle = ?`,
            values: [email, email],
        });

        
        const user = await query({
            query: `SELECT id, email, id_role FROM user WHERE email = ? ` ,
            values: [email],
        });

        const userGoogle = await query({
            query: `SELECT id, emailGoogle, id_role FROM userGoogle WHERE emailGoogle = ? ` ,
            values: [email],
        });

        const resultUser = user || userGoogle;

        return new Response(JSON.stringify({
            resultUser,
            userData,
            status: 200,
        }), {
            status: 200
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return new Response(JSON.stringify({
            message: "error",
            status: 500,
        }));
    }
}
