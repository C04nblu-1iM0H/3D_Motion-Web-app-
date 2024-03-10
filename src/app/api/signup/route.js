import { query } from "../../lib/db";
import bcrypt from 'bcrypt';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        // Проверка существования email в базе данных
        const isExistsEmail = await query({
            query: "SELECT * FROM user WHERE email = ?",
            values: [email],
        });

        if (isExistsEmail.length > 0) {
            return new Response(JSON.stringify({
                message: "Возможно вы желаете войти",
                status: 400,
            }), {
                status: 400,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const insUser = await query({
            query: "INSERT INTO user (email, password) VALUES (?, ?)",
            values: [email, hashedPassword],
        });

        const result = insUser.affectedRows;
        let message = "";
        result ? message = "success" :  message = "error";

        return new Response(JSON.stringify({
            message: message,
            status: 200,
        }), {
            status: 200
          });
    } catch (error) {
        console.error('Error inserting user:', error);
        return new Response(JSON.stringify({
            message: "error",
            status: 500,
        }));
    }
}
