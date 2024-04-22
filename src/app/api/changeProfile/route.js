import { query } from "../../lib/db";

export async function PUT(request) {
    try {
        const {email, changeName, changeSurname, changeGender, changeDate, changePhone } = await request.json();

        //запрос для получение id_user_data  по email
        const [existingUserData] = await query({
            query: `SELECT user_data.*
                    FROM user_data
                    LEFT JOIN user ON user.id_user_data = user_data.id
                    LEFT JOIN userGoogle ON userGoogle.id_user_data = user_data.id
                    WHERE user.email = ? OR userGoogle.emailGoogle = ?`,
            values: [email, email],
        });
        //получаем id_user_data у пользователя по email
        const idUserData = existingUserData.id;

        //обновляем данные о пользователе
        const updateUser = await query({
            query: `UPDATE user_data 
                    SET name = ?, surname = ?, id_gender = ?, data_birthday = STR_TO_DATE(?, '%Y-%m-%d'), telephone = ? 
                    WHERE id = ?`,
            values: [changeName, changeSurname, changeGender, changeDate, changePhone, idUserData],
        });

        if (updateUser.affectedRows > 0) {
            // Получаем обновленные данные пользователя
            const [userData] = await query({
                query: `SELECT *
                        FROM user_data
                        WHERE id = ?`,
                values: [idUserData],
            });

            return new Response(JSON.stringify({
                message:'sucsess',
                userData: userData,
                status:200,
            }))
        }
    } catch (error) {
        console.error('Error inserting user:', error);
        return new Response(JSON.stringify({
            message: "error",
            status: 500,
        }));
    }
}