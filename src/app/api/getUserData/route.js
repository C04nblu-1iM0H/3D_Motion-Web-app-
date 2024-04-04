import { query } from "../../lib/db";

export async function POST(request) {
    try {
        const { email } = await request.json();

        const userData = await query({
            query: `SELECT user_data.*
                    FROM user_data
                    JOIN user ON user.id_user_data = user_data.id
                    WHERE user.email = ?`,
            values: [email],
        });

        return new Response(JSON.stringify({
            userData: userData[0],
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
