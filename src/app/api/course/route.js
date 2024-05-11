import { query } from "../../lib/db";

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('_id');
        const getCourse = await query({
            query:`SELECT *
                   FROM course
                   WHERE id = ?`,
            values:[id]
        })

        return new Response(JSON.stringify({
            getCourse,
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
        const {courseName, courseDescription, id_user} = await request.json();

        const createCourse = await query({
            query: "INSERT INTO course (course_name, course_description) VALUES (?, ?)",
            values: [courseName, courseDescription],
        });
    
        const courseId = createCourse.insertId;
    
        await query({
            query: "INSERT INTO Teacher (id_course, id_user) VALUES (?, ?)",
            values: [courseId, id_user],
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
        const {courseName, courseDescription, id } = await request.json();
        
        await query({
            query: "UPDATE course SET course_name = ?, course_description = ? WHERE id = ?",
            values: [courseName, courseDescription, id],
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
        const { id_course } = body;
        await query({
            query:`DELETE Teacher, lesson, course
                   FROM Teacher
                   LEFT JOIN lesson ON Teacher.id_course = lesson.id_course
                   LEFT JOIN course ON Teacher.id_course = course.id
                   WHERE Teacher.id_course = ? `,
            values:[id_course]
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
