import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import { PiBooks } from "react-icons/pi";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { VscSourceControl } from "react-icons/vsc";
import { CiBoxList } from "react-icons/ci";
import { MdOutlinePlayLesson } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BreadCrumbsComponent({id, lessonId}) {
    const pathname = usePathname();
    return(
        <Breadcrumbs>
            {pathname === `/setting_course/view_courses/${id}`||
             pathname === `/setting_course/update_courses/${id}`||
             pathname === `/setting_course/delete_courses/${id}` ? (
                <BreadcrumbItem startContent={<VscSourceControl />}>
                    <Link href="/setting_course">Управление курсами</Link>
                </BreadcrumbItem>
            ):(null)}

            { pathname === `/setting_course/view_courses/${id}` && (<BreadcrumbItem  startContent={<PiBooks />}>
                <Link href="/setting_course/view_courses">Просмотр курсов</Link>
            </BreadcrumbItem>
            )}
            { pathname === `/setting_course/view_courses/${id}` && (<BreadcrumbItem startContent={<MdOutlineLibraryBooks />}>
                <Link href={`/setting_course/view_courses/${id}`}>Курс</Link>
            </BreadcrumbItem>
            )}
            { pathname === `/setting_course/update_courses/${id}` && (<BreadcrumbItem  startContent={<PiBooks />}>
                <Link href="/setting_course/update_courses">Просмотр курсов для обновления</Link>
            </BreadcrumbItem>
            )}
            { pathname === `/setting_course/update_courses/${id}` && (<BreadcrumbItem startContent={<MdOutlineLibraryBooks />}>
                <Link href={`/setting_course/update_courses/${id}`}>Обновление курса</Link>
            </BreadcrumbItem>
            )}
            { pathname === `/setting_course/delete_courses/${id}` && (<BreadcrumbItem startContent={<MdOutlineLibraryBooks />}>
                <Link href={`/setting_course/delete_courses`}>Просмотр курсов для удаления</Link>
            </BreadcrumbItem>
            )}
            { pathname === `/setting_course/delete_courses/${id}` && (<BreadcrumbItem startContent={<MdOutlineLibraryBooks />}>
                <Link href={`/setting_course/delete_courses/${id}`}>Удаление курса</Link>
            </BreadcrumbItem>
            )}
            { pathname === `/courses/${id}` || pathname === `/courses/${id}/lesson/${lessonId}` ? (
                <BreadcrumbItem startContent={<CiBoxList />}>
                    <Link href={`/courses`}>Список курсов</Link>
                </BreadcrumbItem>
            ):( null)}
            { pathname === `/courses/${id}` || 
              pathname === `/courses/${id}/lesson/${lessonId}` ? (
                <BreadcrumbItem startContent={<MdOutlineLibraryBooks />}>
                    <Link href={`/courses/${id}`}>Курс</Link>
                </BreadcrumbItem>
            ):(null)}
            { pathname === `/courses/${id}/lesson/${lessonId}` && (<BreadcrumbItem startContent={<MdOutlinePlayLesson />}>
                <Link href={`/courses/${id}/lesson/${lessonId}`}>Урок</Link>
            </BreadcrumbItem>
            )}
        </Breadcrumbs>
    )
}