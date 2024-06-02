import { Button } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { IoArrowBackCircleOutline } from "react-icons/io5";

export default function NotFound() {
    return (
        <div className="container mx-auto flex items-center justify-center h-screen">
            <div className='mr-10'>
                <h1 className='text-4xl font-bold mb-4'>Страница не найдена</h1>
                <Link href="/" passHref legacyBehavior>
                    <Button
                        radius="lg"
                        variant="light"
                        endContent={<IoArrowBackCircleOutline className='w-5 h-5'/>}
                    >
                        Вернуться на главную страницу
                    </Button>
                </Link>
            </div>
            <Image 
                alt="not-found"
                src={'/not-found/not-found.gif'}
                width={600}
                height={600}
            />
        </div>
    );
}
