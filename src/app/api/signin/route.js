import { query } from "../../lib/db";

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        // Проверка существования пользователя в базе данных
        const user = await query({
            query: "SELECT * FROM user WHERE email = ? AND password = ?",
            values: [email, password],
        });

        if (user.length === 0) {
            return new Response(JSON.stringify({
                message: "Invalid email or password",
                status: 400,
            }), {
                status: 400
            });
        }

        // Если пользователь существует, перенаправляем на страницу профиля
        const userEmail = user[0].email; // Получаем email пользователя
        return new Response(JSON.stringify({
            email: userEmail, // Отправляем email в ответе
            status: 200,
        }), {
            status: 200
        });
    } catch (error) {
        console.error('Error inserting user:', error);
        return new Response(JSON.stringify({
            message: "Error",
            status: 500,
        }), {
            status: 500
        });
    }
}
