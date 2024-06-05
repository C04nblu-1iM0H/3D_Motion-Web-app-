import prisma from '@/app/lib/db';

export async function GET(req) {
    const url = new URL(req.url);
    const currentIdLesson = url.searchParams.get('_id');

    try {
        const getCurrentLesson = await prisma.lesson.findUnique({
            where: {
                id: Number(currentIdLesson)
            }
        });

        return new Response(JSON.stringify({
            message: 'success',
            getCurrentLesson,
            status: 200,
        }));
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

export async function POST(request) {
    try {
        const { lessonName, lessonDescription, lessonMaterials, id } = await request.json();
        await prisma.lesson.create({
            data: {
                id_course: Number(id),
                lesson_name: lessonName,
                lesson_description: lessonDescription,
                lesson_materials: lessonMaterials
            }
        });

        return new Response(JSON.stringify({
            message: 'success',
            status: 200,
        }));

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

export async function PUT(request){
    try {
        const { lessonName, lessonDescription, lessonMaterial, currentIdLesson } = await request.json();
        
        await prisma.lesson.update({
            where: { id: Number(currentIdLesson) },
            data: {
                lesson_name: lessonName,
                lesson_description: lessonDescription,
                lesson_materials: lessonMaterial
            }
        });

        return new Response(JSON.stringify({
            message:'success',
            status: 200,
        }));

    } catch (error) {
        console.error('Error updating lesson:', error);
        return new Response(JSON.stringify({
            message:'error',
            status: 500,
        }));
    } finally {
        await prisma.$disconnect();
    }   
}


export async function DELETE(request) {
    try {
        const { lessonId } = await request.json();
        await prisma.lesson.delete({
            where: { id: Number(lessonId) }
        });

        return new Response(JSON.stringify({
            message: 'success',
            status: 200,
        }));
    } catch (error) {
        console.error('Error deleting lesson:', error);
        return new Response(JSON.stringify({
            message: 'error',
            status: 500,
        }));
    } finally {
        await prisma.$disconnect();
    }
}