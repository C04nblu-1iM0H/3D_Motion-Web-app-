import prisma from '@/app/lib/db';

export async function GET(req){
    const { searchParams } = new URL(req.url);
    const id_authore = searchParams.get('id_authore');
    const id_user = searchParams.get('id_user');
    try {

        const getChat = await prisma.chat.findFirst({
            where: {
                id_user: Number(id_user),
                id_authore:  Number(id_authore),
            },
            select: { id: true },
        });
        
        return new Response(JSON.stringify({
            getChat,
            status: 200,
        }));
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({
            message: 'error',
            status: 500,
        }));
    }
}