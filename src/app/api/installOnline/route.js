import { query } from "../../lib/db";

export async function PUT(request) {
    try {
        const { email, logout } = await request.json();
        if (logout) {
            // Обновляем статус пользователя на оффлайн (id_online = 0) при выходе из системы в обеих таблицах
            await query({
                query: `UPDATE user SET id_online = 0 WHERE email = ?`,
                values: [email],
            });

            await query({
                query: `UPDATE userGoogle SET id_online = 0 WHERE emailGoogle = ?`,
                values: [email],
            });

            return new Response(JSON.stringify({
                message: "User logged out successfully",
                status: 200,
            }));
        } else {
            // Обновляем статус пользователя на онлайн (id_online = 1) при входе в обеих таблицах
            await query({
                query: `UPDATE user SET id_online = 1 WHERE email = ?`,
                values: [email],
            });

            await query({
                query: `UPDATE userGoogle SET id_online = 1 WHERE emailGoogle = ?`,
                values: [email],
            });

            return new Response(JSON.stringify({
                message: "User authorize successfully",
                status: 200,
            }));
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        return new Response(JSON.stringify({
            message: "error",
            status: 500,
        }));
    }
}