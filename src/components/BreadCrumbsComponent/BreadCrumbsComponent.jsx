import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import { PiBooks } from "react-icons/pi";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { VscSourceControl } from "react-icons/vsc";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BreadCrumbsComponent({id}) {
    const pathname = usePathname();
    return(
        <Breadcrumbs>
            <BreadcrumbItem startContent={<VscSourceControl />}>
                <Link href="/adminpanel/course">Управление курсами</Link>
            </BreadcrumbItem>
            { pathname === `/adminpanel/course/view_courses/${id}` && (<BreadcrumbItem  startContent={<PiBooks />}>
                <Link href="/adminpanel/course/view_courses">Просмотр курсов</Link>
            </BreadcrumbItem>
            )}
            { pathname === `/adminpanel/course/view_courses/${id}` && (<BreadcrumbItem startContent={<MdOutlineLibraryBooks />}>
                <Link href={`/adminpanel/course/view_courses/${id}`}>Курс</Link>
            </BreadcrumbItem>
            )}
            { pathname === `/adminpanel/course/update_courses/${id}` && (<BreadcrumbItem  startContent={<PiBooks />}>
                <Link href="/adminpanel/course/update_courses">Просмотр курсов</Link>
            </BreadcrumbItem>
            )}
            { pathname === `/adminpanel/course/update_courses/${id}` && (<BreadcrumbItem startContent={<MdOutlineLibraryBooks />}>
                <Link href={`/adminpanel/course/update_courses/${id}`}>Обновление курса</Link>
            </BreadcrumbItem>
            )}
        </Breadcrumbs>
    )
}