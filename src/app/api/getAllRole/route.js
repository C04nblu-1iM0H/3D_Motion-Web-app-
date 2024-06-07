import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db';

export async function GET() {
    try {
        const roles = await prisma.$queryRaw`SELECT * FROM role;`;
        return NextResponse.json({roles});
    } catch (error) {
        console.error('Error fetching roles:', error);
        return new Response(JSON.stringify({
            message: "error",
            status: 500,
        }));
    }
}