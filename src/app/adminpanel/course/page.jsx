import Link from 'next/link'
import Image from 'next/image';

import SideBarComponent from '@/components/AdminComponent/components/SideBarComponent';

export default function Course(){
    return(
        <section className='flex'>
            <SideBarComponent />
            <ul className='container mt-10 mx-auto flex flex-wrap gap-6'>
                <li className='w-72 h-max bg-layout border-2 border-solid border-zinc-600 rounded-xl'>
                    <Link href="/adminpanel/course/create_course" >
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
                            <h2 className='text-xl text-center mx-auto'>Создание курса</h2>
                        </figcaption>
                    </Link>
                </li>
                <li className='w-72 h-max bg-layout border-2 border-solid border-zinc-600 rounded-xl'>
                    <Link href="/adminpanel/course/view_courses">
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
                            <h2 className='text-xl text-center mx-auto'>Просмотр курса</h2>
                        </figcaption>
                    </Link>
                </li>
                <li className='w-72 h-max bg-layout border-2 border-solid border-zinc-600 rounded-xl'>
                    <Link href="/adminpanel/course/update_courses" >
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
                            <h2 className='text-xl text-center mx-auto'>Обновление курса</h2>
                        </figcaption>
                    </Link>
                </li>
                <li className='w-72 h-max bg-layout border-2 border-solid border-zinc-600 rounded-xl'>
                    <Link href="#" >
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
                            <h2 className='text-xl text-center mx-auto'>Удаление курса</h2>
                        </figcaption>
                    </Link>
                </li>
            </ul>
        </section>
    )
}