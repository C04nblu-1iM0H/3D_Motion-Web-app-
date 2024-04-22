import { query } from "../../lib/db";

export async function GET() {
    try {
        const userCountResult = await query({
            query: "SELECT COUNT(*) AS userCount FROM user WHERE is_online = 1",
        });
        const userCount = userCountResult ? userCountResult[0].userCount : 0;

        const userGoogleCountResult = await query({
            query: "SELECT COUNT(*) AS userGoogleCount FROM userGoogle WHERE is_online = 1",
        });
        const userGoogleCount = userGoogleCountResult ? userGoogleCountResult[0].userGoogleCount : 0;

        const onlineUsersCount = userCount + userGoogleCount;

        const userTotalCountResult = await query({
            query: "SELECT COUNT(*) AS userTotalCount FROM user",
        });
        const userTotalCount = userTotalCountResult ? userTotalCountResult[0].userTotalCount : 0;

        const userGoogleTotalCountResult = await query({
            query: "SELECT COUNT(*) AS userGoogleTotalCount FROM userGoogle",
        });
        const userGoogleTotalCount = userGoogleTotalCountResult ? userGoogleTotalCountResult[0].userGoogleTotalCount : 0;

        const countUsers = userTotalCount + userGoogleTotalCount;

        return new Response(JSON.stringify({
            onlineUsersCount,
            countUsers,
            status: 200,
        }));
    } catch (error) {
        console.error("Error fetching user counts:", error);
        return new Response(JSON.stringify({
            message: "Error fetching user counts",
            status: 500,
        }));
    }
};