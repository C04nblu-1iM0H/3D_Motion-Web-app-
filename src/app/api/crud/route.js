import bcrypt from 'bcrypt';
import prisma from '@/app/lib/db';

export async function GET() {
    try {
        const allUsers = await prisma.user.findMany({
            include: {
                user_data: {
                    select: {
                        id: true,
                        username: true,
                        surname: true,
                        id_gender: true,
                        data_birthday: true,
                        telephone: true,
                        gender: {
                            select: {
                                gender_name: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                id: 'asc',
            },
        });

        return new Response(JSON.stringify({
            allUsers,
            status: 200,
        }));
    } catch (error) {
        console.error('Error fetching user data:', error);
        return new Response(JSON.stringify({
            message: "error",
            status: 500,
        }));
    } finally {
        await prisma.$disconnect();
    }
}

export async function PUT(request) {
    try {
        const updateData = await request.json();
        const { editEmail, editPassword, id, userid } = updateData;
        console.log(editEmail);
        console.log(editPassword);
        console.log(id);
        console.log(userid);
        if (editEmail === undefined && editPassword === undefined) {
            await prisma.user.update({
                where: { id: userid },
                data: { id_role: id }
            });

            return new Response(JSON.stringify({
                message: 'success',
                status: 200,
            }));
        }

        if (editPassword === undefined) {
            await prisma.user.update({
                where: { id: userid },
                data: { email: editEmail, id_role: id }
            });

            return new Response(JSON.stringify({
                message: 'success',
                status: 200,
            }));
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(editPassword, salt);

            await prisma.user.update({
                where: { id: userid },
                data: { email: editEmail, password: hashedPassword, id_role: id }
            });

            return new Response(JSON.stringify({
                message: 'success',
                status: 200,
            }));
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
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
        const body = await request.json();
        const { userid } = body;

        const user = await prisma.user.findUnique({
            where: { id: userid },
            select: { id_user_data: true }
        });

        if (user && user.id_user_data) {

            await prisma.user.delete({
                where: { id: userid }
            });

            await prisma.user_data.delete({
                where: { id: user.id_user_data }
            });

            return new Response(JSON.stringify({
                message: 'success',
                status: 200,
            }));
        } else {
            return new Response(JSON.stringify({
                message: 'User not found',
                status: 404,
            }));
        }
    } catch (error) {
        console.error('Error deleting user data:', error);
        return new Response(JSON.stringify({
            message: 'error',
            status: 500,
        }));
    } finally {
        await prisma.$disconnect();
    }
}