import { put } from '@vercel/blob';
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

export async function PUT(request) {
    try {
        const formData = await request.formData();
        const email = formData.get('email');
        const changeName = formData.get('changeName');
        const changeSurname = formData.get('changeSurname');
        const changeGender = formData.get('changeGender');
        const changeDate = formData.get('changeDate');
        const changePhone = formData.get('changePhone');
        const image = formData.get('file');

        const user = await prisma.user.findUnique({
            where: { email: email },
            select: { id_user_data: true }
        });

        if (!user || !user.id_user_data) {
            return new Response(JSON.stringify({
                message: "User not found",
                status: 404,
            }));
        }

        let pictureUrl = null;

        if (image !== null && image !== undefined && typeof image === 'object') {
            const maxSize = 2 * 1024 * 1024;
            if (image.size > maxSize) {
                return NextResponse.json({ message: 'Размер фото не должен превышать 2MB', status: 400 });
            }
            
            const randomFileName = `${Date.now()}-${Math.floor(Math.random() * 10000)}${image.name}`;
            const blobToken = process.env.VERCEL_BLOB_TOKEN;

            const blob = await put(`user_image/${randomFileName}`, image.stream(), {
                access: 'public',
                token: blobToken,
            });

            pictureUrl = blob.url;
        }

        const idUserData = user.id_user_data;

        const updatedUserData = await prisma.user_data.update({
            where: { id: idUserData },
            data: {
                username: changeName,
                surname: changeSurname,
                gender: {
                    connect: { id: changeGender === '1' ? true : false }
                },
                data_birthday: new Date(changeDate),
                telephone: changePhone,
                picture: pictureUrl,
            }
        });

        return NextResponse.json({ message: 'success', userData: updatedUserData, status: 200 });
    } catch (error) {
        console.error('Error updating user data:', error);
        return new Response(JSON.stringify({
            message: "error",
            status: 500,
        }));
    } finally {
        await prisma.$disconnect();
    }
}
