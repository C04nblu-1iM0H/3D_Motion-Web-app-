'use client'
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion"
import Image from 'next/image';
import Link from 'next/link'
import { IoIosHeartEmpty, IoMdHeart  } from "react-icons/io";
import { IoBookmarksOutline, IoBookmarks  } from "react-icons/io5";

export default function CoursesComponent() {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    return(
        <section>
            <h1>Курсы</h1>
            <section className='container mx-auto flex flex-row flex-wrap justify-evenly items-center'>
                <section className="w-96 h-96">
                    <Link 
                        href="#" 
                        className='relative'
                        onMouseEnter={() => setHoveredIndex(1)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <AnimatePresence>
                            {hoveredIndex === 1 && (
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
                            />
                            <div className='w-80 bg-layout h-20 flex flex-col justify-between rounded-b-lg'>
                                <div className='flex mt-2 justify-between'>
                                    <h3 className='px-6'>3D Дизайнер</h3>
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

                <section className="w-96 h-96">
                    <Link 
                        href="#" 
                        className='relative'
                        onMouseEnter={() => setHoveredIndex(2)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <AnimatePresence>
                            {hoveredIndex === 2 && (
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
                                src={'/course_page/Motion2.jpg'}
                                width={320}
                                height={300}
                                quality={100}
                            />
                            <div className='bg-layout h-20 flex flex-col justify-between rounded-b-lg'>
                                <div className='flex mt-2 justify-between'>
                                    <h3 className='px-6'>Дизайнер интерьера</h3>
                                    <div className='flex gap-x-4 pr-4'>
                                        <IoIosHeartEmpty className='w-5 h-5'/>
                                        <IoBookmarksOutline className='w-5 h-5'/>
                                    </div>
                                </div>
                                <figcaption className='flex flex-col justify-end pb-1 h-full'>
                                    <div className='flex justify-between px-3 border-t-2 border-solid border-zinc-600'>
                                        <p className='mt-1'>Понравилось:</p>
                                        <p className='mt-1'>1.5к</p>
                                    </div>
                                </figcaption>
                            </div>
                        </figure>
                    </Link>
                </section>

                <section className="w-96 h-96">
                    <Link 
                        href="#" 
                        className='relative'
                        onMouseEnter={() => setHoveredIndex(3)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <AnimatePresence>
                            {hoveredIndex === 3 && (
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
                                src={'/course_page/Motion3.png'}
                                width={320}
                                height={300}
                                quality={100}
                            />
                            <div className='bg-layout h-20 flex flex-col justify-between rounded-b-lg'>
                                <div className='flex mt-2 justify-between'>
                                    <h3 className='px-6'>Графический дизайнер</h3>
                                    <div className='flex gap-x-4 pr-4'>
                                        <IoIosHeartEmpty className='w-5 h-5'/>
                                        <IoBookmarksOutline className='w-5 h-5'/>
                                    </div>
                                </div>
                                <figcaption className='flex flex-col justify-end pb-1 h-full'>
                                    <div className='flex justify-between px-3 border-t-2 border-solid border-zinc-600'>
                                        <p className='mt-1'>Понравилось:</p>
                                        <p className='mt-1'>1.5к</p>
                                    </div>
                                </figcaption>
                            </div>
                        </figure>
                    </Link>
                </section>

                <section className="w-96 h-96">
                    <Link 
                        href="#" 
                        className='relative'
                        onMouseEnter={() => setHoveredIndex(4)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <AnimatePresence>
                            {hoveredIndex === 4 && (
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
                                src={'/course_page/Motion4.png'}
                                width={320}
                                height={300}
                                quality={100}
                            />
                            <div className='bg-layout h-20 flex flex-col justify-between rounded-b-lg'>
                                <div className='flex mt-2 justify-between'>
                                    <h3 className='px-6'>Моушн-дизайнер</h3>
                                    <div className='flex gap-x-4 pr-4'>
                                        <IoIosHeartEmpty className='w-5 h-5'/>
                                        <IoBookmarksOutline className='w-5 h-5'/>
                                    </div>
                                </div>
                                <figcaption className='flex flex-col justify-end pb-1 h-full'>
                                    <div className='flex justify-between px-3 border-t-2 border-solid border-zinc-600'>
                                        <p className='mt-1'>Понравилось:</p>
                                        <p className='mt-1'>1.5к</p>
                                    </div>
                                </figcaption>
                            </div>
                        </figure>
                    </Link>
                </section>
            </section>
        </section>
    );
}