import prisma from '@/app/lib/db';

export async function POST(request) {
    try {
        const { id_course, id_user } = await request.json();

        await prisma.subscribe.create({
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
        console.error('Error creating subscription:', error);
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

        await prisma.subscribe.deleteMany({
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
        console.error('Error deleting subscription:', error);
        return new Response(JSON.stringify({
            message: 'error',
            status: 500,
        }));
    }
}
