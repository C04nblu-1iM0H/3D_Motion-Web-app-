'use client'
import { useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import Link from 'next/link'
import Image from 'next/image';

import SideBarComponent from '@/components/AdminComponent/components/SideBarComponent';
import ProfileAvatar from '@/components/ProfileAvatar/ProfileAvatar';

export default function Course(){
    const role = useSelector(state => state.user.role);
    if(role === 3){
        redirect('/')
    }
    return(
        <section className='flex'>
            {role === 1 
            ?(
                <SideBarComponent />
            ):(
                <ProfileAvatar />
            )}
            <ul className='container mt-10 mx-auto flex flex-wrap gap-6'>
                <li className='w-72 h-max bg-layout border-2 border-solid border-zinc-600 rounded-xl'>
                    <Link href="/setting_course/create_course" >
                        <figure>
                            <Image
                                alt="no data"
                                src={'/adminpanel/create.svg'}
                                width={300}
                                height={300}
                                quality={100}
                                priority={true}
                                className=""
                            />
                        </figure>
                        <figcaption className='my-8'>
                            <h2 className='text-xl text-center mx-auto'>Создание ресурса</h2>
                        </figcaption>
                    </Link>
                </li>
                <li className='w-72 h-max bg-layout border-2 border-solid border-zinc-600 rounded-xl'>
                    <Link href="/setting_course/view_courses">
                        <figure>
                            <Image
                                alt="no data"
                                src={'/adminpanel/view.svg'}
                                width={300}
                                height={300}
                                quality={100}
                                priority={true}
                                className=""
                            />
                        </figure>
                        <figcaption className='my-8'>
                            <h2 className='text-xl text-center mx-auto'>Просмотр ресурса</h2>
                        </figcaption>
                    </Link>
                </li>
                <li className='w-72 h-max bg-layout border-2 border-solid border-zinc-600 rounded-xl'>
                    <Link href="/setting_course/update_courses" >
                        <figure>
                            <Image
                                alt="no data"
                                src={'/adminpanel/update.svg'}
                                width={300}
                                height={300}
                                quality={100}
                                priority={true}
                                className=""
                            />
                        </figure>
                        <figcaption className='my-8'>
                            <h2 className='text-xl text-center mx-auto'>Обновление ресурса</h2>
                        </figcaption>
                    </Link>
                </li>
                <li className='w-72 h-max bg-layout border-2 border-solid border-zinc-600 rounded-xl'>
                    <Link href="/setting_course/delete_courses" >
                        <figure>
                            <Image
                                alt="no data"
                                src={'/adminpanel/delete.svg'}
                                width={300}
                                height={300}
                                quality={100}
                                priority={true}
                                className=""
                            />
                        </figure>
                        <figcaption className='my-8'>
                            <h2 className='text-xl text-center mx-auto'>Удаление ресурса</h2>
                        </figcaption>
                    </Link>
                </li>
            </ul>
        </section>
    )
}