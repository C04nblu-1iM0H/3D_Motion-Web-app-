import { query } from "@/app/lib/db";

export async function POST(request) {
    try {
        const {id_course, id_user} = await request.json();
        await query({
            query: "INSERT INTO subscribe (id_user, id_course) VALUES (?, ?)",
            values: [id_user, id_course],
        });

        return new Response(JSON.stringify({
            message:'sucsess',
            status: 200,
        }));

    } catch (error) {
        console.error('Error fetching user data:', error);
        return new Response(JSON.stringify({
            message:'error',
            status: 500,
        }));
    }   
}

export async function DELETE(request) {
    try {
        const {id_course, id_user} = await request.json();

        await query({
            query: `DELETE FROM subscribe 
                    WHERE id_course = ? AND id_user = ? `,
            values: [id_course, id_user],
        });

        return new Response(JSON.stringify({
            message:'sucsess',
            status: 200,
        }));

    } catch (error) {
        console.error('Error fetching user data:', error);
        return new Response(JSON.stringify({
            message:'error',
            status: 500,
        }));
    }   
}