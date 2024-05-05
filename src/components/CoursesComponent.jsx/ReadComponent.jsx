import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion"
import Image from 'next/image';
import Link from 'next/link'
import { usePathname } from "next/navigation";

import { PiBooks } from "react-icons/pi";
import { IoIosHeartEmpty, IoMdHeart  } from "react-icons/io";
import { IoBookmarksOutline, IoBookmarks  } from "react-icons/io5";

export default function ReadComponent({courses}) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const pathname = usePathname();
    return(
        <section className="container mx-auto">
            <div className="bg-layout w-1/4 mx-auto text-center my-5 rounded-xl shadow-xl">
                <div className="flex items-center justify-center">
                    <PiBooks className="w-6 h-6"/>
                    <h1 className="p-2 text-xl">Курсы</h1>
                </div>
            </div>  
            <section className='container mx-auto flex flex-row flex-wrap justify-evenly items-center'>
                {courses.map( course => (
                    <section 
                        key={course.id}
                        className="w-96 h-96">
                        <Link 
                            href={`${pathname}/${course.id}`}
                            className='relative'
                            onMouseEnter={() => setHoveredIndex(course.id)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <AnimatePresence>
                                {hoveredIndex === course.id && (
                                    <motion.span
                                        className="absolute -z-10 h-96 w-96 bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                                        layoutId="hoverBackground"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1, transition: { duration: 0.15 } }}
                                        exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                                    />
                                )}
                            </AnimatePresence>
                            <figure className='flex flex-col w-80 mx-auto my-7'>
                                <Image 
                                    alt="img_cours"
                                    className="border-b-2 border-solid border-zinc-600"
                                    src={'/course_page/Motion1.png'}
                                    width={320}
                                    height={300}
                                    quality={100}
                                    priority={true}
                                />
                                <div className='w-80 bg-layout h-20 flex flex-col justify-between rounded-b-lg'>
                                    <div className='flex mt-2 justify-between'>
                                        <h3 className='px-6'>{course.course_name}</h3>
                                        <div className='flex gap-x-4 pr-4'>
                                            <IoIosHeartEmpty className='w-5 h-5'/>
                                            <IoBookmarksOutline className='w-5 h-5'/>
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
                        </Link>
                    </section>
                ))}
            </section>
        </section>
    )
}