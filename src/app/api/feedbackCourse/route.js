import prisma from '@/app/lib/db';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id_course = searchParams.get('id');

    try {
        const getAllFeedback = await prisma.feedback.findMany({
            where: {
                id_course: Number(id_course),
            },
            select: {
                id: true,
                feedback_text: true,
                user: {
                    select: {
                        email: true,
                        id: true,
                    },
                },
            },
        });

        return new Response(JSON.stringify({
            getAllFeedback,
            status: 200,
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            error: error.message,
            status: 500,
        }));
    }
}

export async function POST(request) {
    try {
        const { sendMessage, userId, id } = await request.json();

        await prisma.feedback.create({
            data: {
                feedback_text: sendMessage,
                id_user: Number(userId),
                id_course: Number(id),
            },
        });

        return new Response(JSON.stringify({
            message: 'success',
            status: 200,
        }));
    } catch (error) {
        console.error('Error creating feedback:', error);
        return new Response(JSON.stringify({
            message: 'error',
            status: 500,
        }));
    }
}
