import { query } from "../../lib/db";

export async function GET() {
    try {
        const userCountResult = await query({
            query: "SELECT COUNT(*) AS userCount FROM user WHERE id_online = 1",
        });
        const onlineUsersCount = userCountResult ? userCountResult[0].userCount : 0;

        const userTotalCountResult = await query({
            query: "SELECT COUNT(*) AS userTotalCount FROM user",
        });
        const countUsers = userTotalCountResult ? userTotalCountResult[0].userTotalCount : 0;

        const totalCourse = await query({
            query:"SELECT COUNT(id) as id_course FROM course",
        })
        return new Response(JSON.stringify({
            onlineUsersCount,
            countUsers,
            totalCourse,
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