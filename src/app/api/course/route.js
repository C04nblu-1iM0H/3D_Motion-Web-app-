import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db';

export async function GET(req) {
    const url = new URL(req.url);
    const id = url.searchParams.get('_id');
    const userId = url.searchParams.get('userId');

    try {
        let getCourse;
        if (userId) {
            getCourse = await prisma.course.findFirst({
                where: {
                    id: Number(id)
                },
                select: {
                    id: true,
                    course_name: true,
                    course_description: true,
                    subscribe: {
                        where: { id_user: Number(userId) },
                        select: { id: true }
                    }
                }
            });
            if (getCourse) {
                if (getCourse.subscribe.length === 0) {
                    getCourse.subscribe = [];
                }
            }
        } else {
            getCourse = await prisma.course.findFirst({
                where: {
                    id: Number(id)
                },
                select: {
                    id: true,
                    course_name: true,
                    course_description: true
                }
            });
        }
        return new Response(JSON.stringify({
            getCourse,
            status: 200,
        }));
    } catch (error) {
        console.error('Error fetching user data:', error);
        return new Response(JSON.stringify({
            message: 'error',
            status: 500,
        }));
    }
}

export async function POST(req) {
    try {
        const formData = await req.formData();
        const courseName = formData.get('courseName');
        const courseDescription = formData.get('courseDescription');
        const id_user = formData.get('id_user');
        const image = formData.get('file');

        const maxSize = 2 * 1024 * 1024;
        if (image.size > maxSize) {
            return NextResponse.json({ message: 'Размер фото не должено привышать 2MB', status: 400 });
        }

        const randomFileName = `${Date.now()}-${Math.floor(Math.random() * 10000)}${image.name}`;
        const blobToken = process.env.VERCEL_BLOB_TOKEN;

        const blob = await put(`course_image/${randomFileName}`, image.stream(), {
            access: 'public',
            token: blobToken,
        });

        const createCourse = await prisma.course.create({
            data: {
                course_name: courseName,
                course_description: courseDescription,
                course_picture: blob.url,
            },
        });

        const courseId = createCourse.id;

        await prisma.authore.create({
            data: {
                id_course: courseId,
                id_user: Number(id_user),
            },
        });

        return NextResponse.json({ message: 'success', status: 200 });

    } catch (error) {
        console.error('Error creating course:', error);
        return NextResponse.json({ message: 'error', status: 500 });
    }
}

export async function PUT(request) {
    try {
        const { courseName, courseDescription, id } = await request.json();
        
        await prisma.course.update({
            where: { id: Number(id) },
            data: {
                course_name: courseName,
                course_description: courseDescription
            }
        });

        return new Response(JSON.stringify({
            message: 'success',
            status: 200,
        }));

    } catch (error) {
        console.error('Error fetching user data:', error);
        return new Response(JSON.stringify({
            message: 'error',
            status: 500,
        }));
    }
}


export async function DELETE(request) {
    try {
        const { id_course } = await request.json();
        await prisma.course.delete({
            where: { id: Number(id_course) }
        });

        return new Response(JSON.stringify({
            message: 'success',
            status: 200,
        }));
    } catch (error) {
        console.error('Error deleting course:', error);
        return new Response(JSON.stringify({
            message: 'error',
            status: 500,
        }));
    } finally {
        await prisma.$disconnect();
    }
}
