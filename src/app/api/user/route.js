import { query } from "../../lib/db";
import bcrypt from 'bcrypt';

// export async function GET(request) {
//     const users = await query({
//         query: "SELECT * FROM user",
//         values: [],
//     });

//     let data = JSON.stringify(users);
//     return new Response(data, {
//         status: 200,
//     });
// }

export async function POST(request) {
    try {
        let message = "";
        const { email, password } = await request.json();

        // Проверка существования email в базе данных
        const isExistsEmail = await query({
            query: "SELECT * FROM user WHERE email = ?",
            values: [email],
        });
        
        if (isExistsEmail.length > 0) {
            return new Response(JSON.stringify({
              message: "error",
              error: "Пользователь с таким email уже существует"
            }), {
              status: 400
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const insUser = await query({
            query: "INSERT INTO user (email, password) VALUES (?, ?)",
            values: [email, hashedPassword],
        });

        const result = insUser.affectedRows;
        message = ""
        result ? message = "success" :  message = "error";
        const users = {
            email: email,
        };
        return new Response(JSON.stringify({
            message: message,
            status: 200,
            users: users
        }), {
            status: 200
          });
    } catch (error) {
        console.error('Error inserting user:', error);
        return new Response(JSON.stringify({
            message: "error",
            status: 500,
            users: {}
        }));
    }
}
