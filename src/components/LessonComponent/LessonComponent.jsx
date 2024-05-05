import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button} from "@nextui-org/react";
import { LiaEdit } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GiBookshelf } from "react-icons/gi";
import { MdOutlineNumbers } from "react-icons/md";
import LoadingTableSkeleton from "../LoadingSkeleton/LoadingTableSkeleton";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCurrentIdSelectedLesson, setIsClose} from "@/store/lessonSlice";

export default function LessonComponent({id, lessons}) {
    const dispatch = useDispatch();
    const pathname = usePathname();

    return (
        <section>
            <div className="bg-layout w-3/5 mx-auto text-center my-5 rounded-xl shadow-xl">
                <div className="flex flex-col justify-center">
                    <div className="flex items-center justify-center">
                        <GiBookshelf className="w-6 h-6" />
                        <h1 className="pt-3">Список всех уроков </h1>
                    </div>
                    <h2 className="pb-3">Ниже представлены все уроки этого кусра, вы можете обновить их кликнув по кнопке в таблице</h2>
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
                <Table aria-label="Example table with custom cells">
                    <TableHeader>
                        <TableColumn><MdOutlineNumbers className="w-5 h-5 " /></TableColumn>
                        <TableColumn>Название урока</TableColumn>
                        <TableColumn>Описание урока</TableColumn>
                        <TableColumn>Дейсвтия</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {lessons.map((lesson, index) => (
                            <TableRow key={lesson.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{lesson.lesson_name}</TableCell>
                                <TableCell>{lesson.lesson_description}</TableCell>
                                <TableCell>
                                    <div className="relative flex items-center justify-center">
                                        {pathname === `/adminpanel/course/update_courses/${id}` && (
                                            <Tooltip content="Edit user">
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
                                        {pathname === `/adminpanel/course/delete_courses/${id}` && (
                                            <Tooltip content="Edit user">
                                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                    <RiDeleteBin6Line className="w-5 h-5 text-danger" />
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
