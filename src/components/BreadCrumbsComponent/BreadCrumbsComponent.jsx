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
                    <Link href="/setting_course">Управление ресурсами</Link>
                </BreadcrumbItem>
            ):(null)}

            { pathname === `/setting_course/view_courses/${id}` && (<BreadcrumbItem  startContent={<PiBooks />}>
                <Link href="/setting_course/view_courses">Просмотр ресуров</Link>
            </BreadcrumbItem>
            )}
            { pathname === `/setting_course/view_courses/${id}` && (<BreadcrumbItem startContent={<MdOutlineLibraryBooks />}>
                <Link href={`/setting_course/view_courses/${id}`}>электронный ресур</Link>
            </BreadcrumbItem>
            )}
            { pathname === `/setting_course/update_courses/${id}` && (<BreadcrumbItem  startContent={<PiBooks />}>
                <Link href="/setting_course/update_courses">Просмотр ресуров для обновления</Link>
            </BreadcrumbItem>
            )}
            { pathname === `/setting_course/update_courses/${id}` && (<BreadcrumbItem startContent={<MdOutlineLibraryBooks />}>
                <Link href={`/setting_course/update_courses/${id}`}>Обновление ресурса</Link>
            </BreadcrumbItem>
            )}
            { pathname === `/setting_course/delete_courses/${id}` && (<BreadcrumbItem startContent={<MdOutlineLibraryBooks />}>
                <Link href={`/setting_course/delete_courses`}>Просмотр ресуров для удаления</Link>
            </BreadcrumbItem>
            )}
            { pathname === `/setting_course/delete_courses/${id}` && (<BreadcrumbItem startContent={<MdOutlineLibraryBooks />}>
                <Link href={`/setting_course/delete_courses/${id}`}>Удаление ресурса</Link>
            </BreadcrumbItem>
            )}
            { pathname === `/courses/${id}` || pathname === `/courses/${id}/lesson/${lessonId}` ? (
                <BreadcrumbItem startContent={<CiBoxList />}>
                    <Link href={`/courses`}>Список ресуров</Link>
                </BreadcrumbItem>
            ):( null)}
            { pathname === `/courses/${id}` || 
              pathname === `/courses/${id}/lesson/${lessonId}` ? (
                <BreadcrumbItem startContent={<MdOutlineLibraryBooks />}>
                    <Link href={`/courses/${id}`}>электронный ресурс</Link>
                </BreadcrumbItem>
            ):(null)}
            { pathname === `/courses/${id}/lesson/${lessonId}` && (<BreadcrumbItem startContent={<MdOutlinePlayLesson />}>
                <Link href={`/courses/${id}/lesson/${lessonId}`}>Урок</Link>
            </BreadcrumbItem>
            )}
        </Breadcrumbs>
    )
}