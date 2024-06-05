import prisma from '@/app/lib/db';

export async function GET() {
    try {
        const roles = await prisma.role.findMany();

        return new Response(JSON.stringify({
            role: roles,
            status: 200,
        }));
    } catch (error) {
        console.error('Error fetching roles:', error);
        return new Response(JSON.stringify({
            message: "error",
            status: 500,
        }));
    } finally {
        await prisma.$disconnect();
    }
}