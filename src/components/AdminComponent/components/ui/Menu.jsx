import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

import { AiOutlineHome } from "react-icons/ai";
import { GrUserSettings } from "react-icons/gr";
import { BsDashLg } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { VscSourceControl } from "react-icons/vsc";

export default function Menu() {
    const pathname = usePathname();

    const routeCourse = pathname === '/setting_course' || 
                        pathname === '/setting_course/create_course' ||
                        pathname === '/setting_course/view_courses' ||
                        pathname === '/setting_course/update_courses' ||
                        pathname === '/setting_course/delete_courses';

    return(
        <nav className="p-6 w-full flex flex-col flex-wrap border-b border-dashed border-zinc-600">
            <ul className="space-y-1.5 list-none">
                <li className="ml-0">
                    <Link 
                        href='/adminpanel' 
                        className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-zinc-150 ${ pathname === '/adminpanel' ? 'bg-neutral-700' : ''}`} 
                    >
                        <AiOutlineHome />
                        Панель данных
                    </Link>
                </li>

                <li className="ml-0">
                    <Link 
                        href='/adminpanel/usertable' 
                        className={`flex items-center cursor-pointer gap-x-3.5 py-2 px-2.5 text-sm rounded-md hover:bg-zinc-150 ${pathname === '/adminpanel/usertable' ? 'bg-neutral-700' : ''}`} 
                    >
                        <GrUserSettings />
                        <span className="ml-2">Таблица пользователей</span>
                    </Link>
                </li>
                <li className="ml-0">
                    <Link 
                        href='/setting_course' 
                        className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-zinc-150 ${routeCourse ? 'bg-neutral-700' : ''}`} 
                    >
                        <VscSourceControl />
                        Управление ресурсами
                    </Link>
                </li>
            </ul>
        </nav>
    );
}