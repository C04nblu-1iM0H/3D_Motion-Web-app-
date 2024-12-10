import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner} from "@nextui-org/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

import LessonTitleComponent from "./LessonTitleComponent";
import { GiBookshelf } from "react-icons/gi";
import { MdOutlineNumbers } from "react-icons/md";
import LoadingTableSkeleton from "../LoadingSkeleton/LoadingTableSkeleton";


export default function LessonViewComponent({id, lessons}) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const isLoading = useSelector(state => state.lesson.loading);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const indexOfLastLesson = currentPage * itemsPerPage;
    const indexOfFirstLesson = indexOfLastLesson - itemsPerPage;
    const currentLessons = lessons.slice(indexOfFirstLesson, indexOfLastLesson);
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
                <>
                    <Table aria-label="Example table with custom cells" className="w-4/6 mx-auto">
                        <TableHeader>
                            <TableColumn className="w-3"><MdOutlineNumbers className="w-5 h-5 " /></TableColumn>
                            <TableColumn>Название урока</TableColumn>
                        </TableHeader>
                        <TableBody isLoading={isLoading} loadingContent={<Spinner label="Loading..." />}>
                            {currentLessons.map((lesson, index) => (
                                <TableRow key={lesson.id}>
                                    <TableCell>{indexOfFirstLesson + index + 1}</TableCell>
                                    <TableCell>{lesson.lesson_name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="flex justify-center mt-5">
                    {lessons.length > itemsPerPage ?(
                        <Pagination 
                            total={Math.ceil(lessons.length / itemsPerPage)}
                            initialPage={1}
                            page={currentPage}
                            onChange={handlePageChange}
                        />
                    ):(
                        null
                    )}
                    </div>
                </>
            )}
        </section>
    );
}
