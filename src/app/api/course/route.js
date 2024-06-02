import { query } from "../../lib/db";
import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from "next/server";

export async function GET(req) {
    const url = new URL(req.url);
    const id = url.searchParams.get('_id');
    const userId = url.searchParams.get('userId');
    try {
        const getCourse = await query({
            query:`SELECT course.*, subscribe.id AS id_subscribe
                   FROM subscribe
                   RIGHT JOIN course ON subscribe.id_course = course.id AND subscribe.id_user = ?
                   WHERE course.id = ?`,
            values:[userId,id]
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

export async function POST(req) {
    try {
        const formData = await req.formData()
        const courseName = formData.get('courseName');
        const courseDescription = formData.get('courseDescription');
        const id_user = formData.get('id_user');
        const image = formData.get('file');
        const randomFileName = `${Date.now()}-${Math.floor(Math.random() * 10000)}${path.extname(image.name)}`;
        const pathSaveImage = path.join(process.cwd(), 'public', 'course_image', randomFileName);
        await fs.writeFile(pathSaveImage, Buffer.from(await image.arrayBuffer()));
        const pathSaveBDImage = path.join('course_image', randomFileName).replace(/\\/g, "/").replace(/^/, '/');

        const createCourse = await query({
            query: "INSERT INTO course (course_name, course_description, course_picture) VALUES (?, ?, ?)",
            values: [courseName, courseDescription, pathSaveBDImage],
        });
    
        const courseId = createCourse.insertId;
    
        await query({
            query: "INSERT INTO authore (id_course, id_user) VALUES (?, ?)",
            values: [courseId, id_user],
        });

        return NextResponse.json({message:'success', status: 200 });

    } catch (error) {
        console.error('Error fetching user data:', error);
        return NextResponse.json({ message:'error' , status: 500 })
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
    const body = await request.json();
    const { id_course } = body;
    try {
        await query({
            query:`DELETE FROM course WHERE id = ?;`,
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
