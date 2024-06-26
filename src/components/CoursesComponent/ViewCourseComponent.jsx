import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion"
import Image from 'next/image';
import Link from 'next/link'
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { PiBooks } from "react-icons/pi";
import FavoriteButtonComponent from "../Button/FavoriteButtonComponent";
import SubscribeButtonComponent from "../Button/SubscribeButtonComponent";
import { Tooltip } from "@nextui-org/react";


export default function ViewCourseComponent({courses, 
        handleEnableFavourites, 
        handleDisabledFavourites,
        handleEnableSubscribe,
        handleDisabledSubscribe,
    }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const pathname = usePathname();
    const session = useSession();
    
    return(
        <div className="container mx-auto">
            <div className="bg-layout w-1/4 mx-auto text-center my-5 rounded-xl shadow-xl">
                <div className="flex items-center justify-center">
                    <PiBooks className="w-6 h-6"/>
                    <h1 className="p-2 text-xl">Информационные ресурсы</h1>
                </div>
            </div>  
            <section className='grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4'>
                {courses.map( ({id, course_name, course_picture, favorite, subscribe}) => (
                    <div 
                        key={id}
                        className="w-96 h-96">
                        <div 
                           
                            className='relative'
                            onMouseEnter={() => setHoveredIndex(id)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <AnimatePresence>
                                {hoveredIndex === id && (
                                    <motion.span
                                        className="absolute -z-10 h-96 w-96 bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                                        layoutId="hoverBackground"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1, transition: { duration: 0.15 } }}
                                        exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                                    />
                                )}
                            </AnimatePresence>
                            <figure className='flex flex-col w-full h-full px-4 py-8 overflow-hidden relative z-20 mx-auto'>
                                <Link href={`${pathname}/${id}`}>
                                    <div className="relative w-full h-64">
                                            <Image
                                                alt="img_course"
                                                src={course_picture}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                style={{ objectFit: 'contain' }}
                                                className="rounded-lg"
                                                priority={1}
                                            />
                                    </div>
                                </Link>
                                <div className='w-full bg-layout h-auto flex flex-col justify-between rounded-b-lg border-t-2 border-solid border-zinc-600'>
                                    <div className='flex items-center my-2 justify-between'>
                                        <Tooltip 
                                            placement="top"
                                            color="foreground"
                                            content={course_name}
                                        >
                                            <h3 className='px-6 overflow-hidden whitespace-nowrap text-ellipsis'>
                                                {course_name}
                                            </h3>
                                        </Tooltip>
                                        <div className='flex items-center gap-x-3 pr-4'>
                                        {session.status !== 'unauthenticated'?
                                        (
                                            <>
                                                <FavoriteButtonComponent 
                                                    id={id}
                                                    id_favorite={favorite.length > 0 ? favorite[0].id : null} 
                                                    handleDisabledFavourites={handleDisabledFavourites}
                                                    handleEnableFavourites={handleEnableFavourites}
                                                />
                                                <SubscribeButtonComponent 
                                                    id={id}
                                                    id_subscribe={subscribe.length > 0 ? subscribe[0].id : null} 
                                                    handleEnableSubscribe={handleEnableSubscribe}
                                                    handleDisabledSubscribe={handleDisabledSubscribe}
                                                />
                                            </>

                                        ):(
                                            ''
                                        )}

                                        </div>
                                    </div>
                                    <figcaption className='flex flex-col justify-end pb-1'>
                                        <div className='flex justify-between px-3 border-t-2 border-solid border-zinc-600'>
                                            <p className='mt-1'>Понравилось: </p>
                                            <p className='mt-1'>1.5к</p>
                                        </div>
                                    </figcaption>
                                </div>
                            </figure>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    )
}