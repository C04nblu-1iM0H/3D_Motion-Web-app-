import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db';

export async function GET() {
    try {
        const [onlineUsersCount, countUsers, totalCourse] = await Promise.all([
            prisma.user.count({ where: { id_online: 1 } }),
            prisma.user.count(),
            prisma.course.count()
        ]);

        return NextResponse.json({
            onlineUsersCount,
            countUsers,
            totalCourse,
        }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user counts:", error);
        return NextResponse.json({
            message: "Error fetching user counts",
        }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { id_course, id_user } = await request.json();

        await prisma.favorite.create({
            data: {
                id_user: Number(id_user),
                id_course: Number(id_course)
            }
        });

        return new Response(JSON.stringify({
            message: 'success',
            status: 200,
        }));

    } catch (error) {
        console.error('Error creating favorite:', error);
        return new Response(JSON.stringify({
            message: 'error',
            status: 500,
        }));
    } finally {
        await prisma.$disconnect();
    }  
}

export async function DELETE(request) {
    try {
        const { id_course, id_user } = await request.json();
        
        await prisma.favorite.deleteMany({
            where: {
                id_user: Number(id_user),
                id_course: Number(id_course)
            }
        });

        return new Response(JSON.stringify({
            message: 'success',
            status: 200,
        }));

    } catch (error) {
        console.error('Error deleting favorite:', error);
        return new Response(JSON.stringify({
            message: 'error',
            status: 500,
        }));
    }
}
