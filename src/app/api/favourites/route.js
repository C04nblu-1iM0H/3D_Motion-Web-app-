import prisma from '@/app/lib/db';

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
