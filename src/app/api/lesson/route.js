import { query } from "@/app/lib/db";

export async function GET(req){
    const url = new URL(req.url);
    const currentIdLesson = url.searchParams.get('_id');
    try {
    
        const getCurrentLesson = await query({
            query:`SELECT * FROM lesson WHERE id = ?`,
            values:[currentIdLesson],
        })

        return new Response(JSON.stringify({
            message:'sucsess',
            getCurrentLesson,
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

export async function POST(request) {
    try {
        const {lessonName, lessonDescription, lessonMaterials, id} = await request.json();
        await query({
            query: "INSERT INTO lesson (id_course, lesson_name, lesson_description, lesson_materials) VALUES (?, ?, ?, ?)",
            values: [id, lessonName, lessonDescription, lessonMaterials],
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

export async function PUT(request){
    try {
        const {lessonName, lessonDescription, lessonMaterial, currentIdLesson } = await request.json();
        
        await query({
            query: "UPDATE lesson SET lesson_name = ?, lesson_description = ?, lesson_materials = ? WHERE id = ?",
            values: [lessonName, lessonDescription, lessonMaterial,  currentIdLesson],
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
        const body = await request.json();
        const { lessonId } = body;
        await query({
            query:`DELETE FROM lesson WHERE id = ?`,
            values:[lessonId]
        })
        
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