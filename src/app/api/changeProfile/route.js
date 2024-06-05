import prisma from '@/app/lib/db';

export async function PUT(request) {
    try {
        const { email, changeName, changeSurname, changeGender, changeDate, changePhone } = await request.json();

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

        const idUserData = user.id_user_data;

        const updatedUserData = await prisma.user_data.update({
            where: { id: idUserData },
            data: {
                username: changeName,
                surname: changeSurname,
                id_gender: changeGender === '1',
                data_birthday: new Date(changeDate),
                telephone: changePhone
            }
        });

        return new Response(JSON.stringify({
            message: 'success',
            userData: updatedUserData,
            status: 200,
        }));
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
