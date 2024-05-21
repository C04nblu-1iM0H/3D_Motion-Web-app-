import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button, Spinner} from "@nextui-org/react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentIdSelectedLesson, setIsClose} from "@/store/lessonSlice";

import LessonTitleComponent from "./LessonTitleComponent";
import { LiaEdit } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GiBookshelf } from "react-icons/gi";
import { MdOutlineNumbers } from "react-icons/md";
import LoadingTableSkeleton from "../LoadingSkeleton/LoadingTableSkeleton";
import { usePathname } from "next/navigation";

export default function LessonComponent({id, lessons, handleDelete}) {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const isLoading = useSelector(state => state.lesson.loading);
    return (
        <section>
            <div className="bg-layout w-3/5 mx-auto text-center my-5 rounded-xl shadow-xl">
                <div className="flex flex-col justify-center">
                    <div className="flex items-center justify-center">
                        <GiBookshelf className="w-6 h-6" />
                        <h1 className="pt-3">Список всех уроков </h1>
                    </div>
                    <LessonTitleComponent id={id}/>
                </div>
            </div>
            {!lessons ? (
                <LoadingTableSkeleton />
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
                <Table aria-label="Example table with custom cells" className="w-4/6 mx-auto">
                    <TableHeader>
                        <TableColumn className="w-3"><MdOutlineNumbers className="w-5 h-5 " /></TableColumn>
                        <TableColumn>Название урока</TableColumn>
                        <TableColumn>Дейсвтия</TableColumn>
                    </TableHeader>
                    <TableBody isLoading={isLoading}  loadingContent={<Spinner label="Loading..." />}>
                        {lessons.map((lesson, index) => (
                            <TableRow key={lesson.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{lesson.lesson_name}</TableCell>
                                <TableCell>
                                    <div className="relative flex items-center justify-center">
                                        {pathname === `/setting_course/update_courses/${id}` && (
                                            <Tooltip content="Обновить урок">
                                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                    <Button 
                                                        variant="light" 
                                                        isIconOnly
                                                        onClick={()=>{
                                                            dispatch(setIsClose(true))
                                                            dispatch(setCurrentIdSelectedLesson(lesson.id))
                                                        }}
                                                    >
                                                        <LiaEdit className="w-5 h-5 text-warning-600" />
                                                    </Button>
                                                </span>
                                            </Tooltip>
                                        )}
                                        {pathname === `/setting_course/delete_courses/${id}` && (
                                            <Tooltip content="Удалить урок">
                                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                    <Button 
                                                        variant="light" 
                                                        isIconOnly
                                                        onClick={()=>{
                                                            handleDelete(lesson.id);
                                                        }}
                                                    >
                                                        <RiDeleteBin6Line className="w-5 h-5 text-danger" />
                                                    </Button>
                                                </span>
                                            </Tooltip>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </section>
    );
}
