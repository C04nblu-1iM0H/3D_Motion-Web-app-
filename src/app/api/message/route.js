import prisma from '@/app/lib/db';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id_chat = searchParams.get('id');
    try {
        const getChatMessage = await prisma.message.findMany({
            where: { id_chat: Number(id_chat) },
            include: {
                user: {
                    include: {
                        user_data: true,
                    }
                }
            }
        });

        const formattedMessages = getChatMessage.map(message => ({
            ...message,
            username: message.user.user_data.username,
            surname: message.user.user_data.surname
        }));

        return new Response(JSON.stringify({
            getChatMessage: formattedMessages,
            status: 200,
        }));
    } catch (error) {
        console.error('Error fetching chat messages:', error);
        return new Response(JSON.stringify({
            message: "error",
            status: 500,
        }));
    }
}

export async function POST(request) {
    try {
        const { sendMessage, id_user, id } = await request.json();

        await prisma.message.create({
            data: {
                text_message: sendMessage,
                date_dispatch: new Date(),
                id_user: Number(id_user),
                id_chat: Number(id),
            },
        });

        return new Response(JSON.stringify({
            message: 'success',
            status: 200,
        }));
    } catch (error) {
        console.error('Error sending message:', error);
        return new Response(JSON.stringify({
            message: 'error',
            status: 500,
        }));
    }
}


export async function PUT(request) {
    try {
        const {message_id, message} = await request.json();
        await prisma.message.update({
            where: {
                id: Number(message_id)
            },
            data: {
                text_message: message,
            },
        })
        return new Response(JSON.stringify({
            message:'success',
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
    const url = new URL(request.url);
    const message_id = url.searchParams.get('message_id');
    try {
        await prisma.message.deleteMany({
            where: {
              id: Number(message_id)
            }
        });

        return new Response(JSON.stringify({
            message: 'success',
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
