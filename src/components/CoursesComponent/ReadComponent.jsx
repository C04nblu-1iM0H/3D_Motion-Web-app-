import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion"
import Image from 'next/image';
import Link from 'next/link'
import { usePathname } from "next/navigation";
import { Pagination } from "@nextui-org/react";

import { PiBooks } from "react-icons/pi";

export default function ReadComponent({courses}) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const pathname = usePathname();

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const indexOfLastCourse = currentPage * itemsPerPage;
    const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
    return(
        <div className="container mx-auto">
            <div className="bg-layout w-1/4 mx-auto text-center my-5 rounded-xl shadow-xl">
                <div className="flex items-center justify-center">
                    <PiBooks className="w-6 h-6"/>
                    <h1 className="p-2 text-xl">Электронные ресурсы</h1>
                </div>
            </div>  
            <section className='grid grid-cols-4 md:grid-cols-2  lg:grid-cols-4'>
                {currentCourses.map( ({id, course_name, course_picture}) => (
                    <div 
                        key={id}
                        className="w-96 h-[350px]">
                        <div 
                           
                            className='relative'
                            onMouseEnter={() => setHoveredIndex(id)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <AnimatePresence>
                                {hoveredIndex === id && (
                                    <motion.span
                                        className="absolute -z-10 h-[350px] w-96 bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                                        layoutId="hoverBackground"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1, transition: { duration: 0.15 } }}
                                        exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                                    />
                                )}
                            </AnimatePresence>
                            <figure className='flex flex-col w-full h-full p-5 overflow-hidden relative z-20 mx-auto'>
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
                                    <div className="my-4">
                                        <h3 className='px-6'>{course_name}</h3>
                                    </div>
                                </div>
                            </figure>
                        </div>
                    </div>
                ))}
            </section>
            <div className="flex justify-center mt-5">
                <Pagination 
                    isCompact 
                    showControls 
                    total={Math.ceil(courses.length / itemsPerPage)}
                    initialPage={1}
                    page={currentPage}
                    onChange={(page) => handlePageChange(page)}
                />
            </div>
        </div>
    )
}