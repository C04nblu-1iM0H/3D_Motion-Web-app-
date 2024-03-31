import { query } from "../../lib/db";

export async function POST(request) {
    try {
        const {email, changeName, changeSurname, changeGender, changeDate, changePhone } = await request.json();

        const existingUserdata = await query({
            query: `SELECT * 
                    FROM user_data 
                    WHERE id = (SELECT id_user_data FROM user WHERE email = ?)`,
            values: [email],
        });
        let idUserData = existingUserdata[0].id;

        const updateUser = await query({
            query: `UPDATE user_data 
                    SET name = ?, surname = ?, id_gender = ?, data_birthday = ?, telephone = ? 
                    WHERE id = ?`,
            values: [changeName, changeSurname, changeGender, changeDate, changePhone, idUserData],
        });

        const result = updateUser.affectedRows;
        let message = "";
        result ? message = "success" :  message = "error";

        return new Response(JSON.stringify({
            message: message,
            name: changeName,
            surname: changeSurname,
            gender: changeGender,
            date: changeDate,
            phone: changePhone,
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