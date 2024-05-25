import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Button, Spinner} from "@nextui-org/react";
import Image from "next/image";
import { useSelector } from "react-redux";

import { AiOutlinePushpin } from "react-icons/ai";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { GiBookshelf } from "react-icons/gi";
import { MdOutlineNumbers } from "react-icons/md";
import LoadingTableLessonsSkeleton from "../LoadingSkeleton/LoadingTableLessonsSkeleton";
import { usePathname, useRouter } from "next/navigation";


export default function OpenLessonsComponent({lessons}) {
    const isLoading = useSelector(state => state.lesson.loading);
    const pathname = usePathname();
    const route = useRouter()
    const handleRowClick = (lessonId, isLocked) => {
        if(!isLocked) route.push(`${pathname}/lesson/${lessonId}`);
    };

    return (
        <section>
            <div className="bg-layout w-3/5 mx-auto text-center mt-16 mb-5 rounded-xl shadow-xl">
                <div className="flex flex-col justify-center">
                    <div className="flex items-center justify-center">
                        <GiBookshelf className="w-6 h-6" />
                        <h1 className="py-4">Список всех уроков </h1>
                    </div>
                </div>
            </div>
            {!lessons ? (
                <LoadingTableLessonsSkeleton />
            ) : lessons.length === 0 ? (
                <div className="w-full">
                    <Image
                        alt="no data"
                        src={'/adminpanel/no_data.svg'}
                        width={500}
                        height={500}
                        quality={100}
                        priority={true}
                        className="mx-auto"
                    />
                </div>
            ) : (
                <Table aria-label="Example table with custom cells" className="w-3/4 mx-auto">
                    <TableHeader >
                        <TableColumn className="w-3"><AiOutlinePushpin className="ml-3 w-5 h-5 text-center" /></TableColumn>
                        <TableColumn className="w-3"><MdOutlineNumbers className="w-5 h-5 " /></TableColumn>
                        <TableColumn>Название урока</TableColumn>
                    </TableHeader>
                    <TableBody isLoading={isLoading}  loadingContent={<Spinner label="Loading..." />}>
                        {lessons.map((lesson, index) => {
                            const isLocked = index !== 0 && lessons[index - 1].passed === 0;
                            return(
                                <TableRow 
                                    className={` ${isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} 
                                    key={lesson.id} 
                                    onClick={ () => handleRowClick(lesson.id, isLocked)}
                                >
                                    <TableCell>
                                        {lesson.passed === 1 ?(
                                            <Chip color="success"><IoMdCheckmarkCircleOutline  className="w-4 h-4" /></Chip>
                                        ):(
                                            <Chip color="danger"><RxCross2  className="w-4 h-4" /></Chip>
                                        )}

                                    </TableCell>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{lesson.lesson_name}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            )}
        </section>
    );
}
