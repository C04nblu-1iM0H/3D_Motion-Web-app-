import { query } from "../../lib/db";

export async function PUT(request) {
    try {
        const { email} = await request.json();
        await query({
            query: `UPDATE user SET id_online = 0 WHERE email = ?`,
            values: [email],
        });
        
        return new Response(JSON.stringify({
            message: "User logged out successfully",
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