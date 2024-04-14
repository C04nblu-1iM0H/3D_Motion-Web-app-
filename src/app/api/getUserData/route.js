import { query } from "../../lib/db";

export async function POST(request) {
    try {
        const { email } = await request.json();

        let userData;
        const [userDataResult] = await query({
            query: `SELECT user_data.*
                    FROM user_data
                    LEFT JOIN user ON user.id_user_data = user_data.id
                    LEFT JOIN userGoogle ON userGoogle.id_user_data = user_data.id
                    WHERE user.email = ? OR userGoogle.emailGoogle = ?`,
            values: [email, email],
        });

        if (userDataResult) {
            userData = userDataResult;
        } else {
            throw new Error("User data not found");
        }

        return new Response(JSON.stringify({
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
