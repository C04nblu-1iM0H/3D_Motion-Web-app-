import { query } from "../../lib/db";

export async function POST(request) {
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

            // Получаем роль пользователя
            const [userRoleResult] = await query({
                query: `SELECT id_role FROM user WHERE email = ? 
                        UNION 
                        SELECT id_role FROM userGoogle WHERE emailGoogle = ?`,
                values: [email, email],
            });
            
            if (!userRoleResult) {
                throw new Error("User data role not found");
            }

            const userRole = userRoleResult.id_role;

            return new Response(JSON.stringify({
                userRole,
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
