import { query } from "../../lib/db";

export async function GET(request){
    try {
        const email = request.headers.get('email');

        const userData = await query({
            query: `SELECT user_data.*
                    FROM user_data
                    LEFT JOIN user ON user.id_user_data = user_data.id
                    WHERE user.email = ? `,
            values: [email],
        });

        const user = await query({
            query: `SELECT id, email, id_role FROM user WHERE email = ? ` ,
            values: [email],
        });

        return new Response(JSON.stringify({
            user,
            userData,
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