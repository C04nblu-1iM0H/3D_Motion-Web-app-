import { query } from "../../lib/db";

export async function GET() {
    try {
        const role = await query({
            query:`SELECT * FROM role`
        })
        return new Response(JSON.stringify({
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

