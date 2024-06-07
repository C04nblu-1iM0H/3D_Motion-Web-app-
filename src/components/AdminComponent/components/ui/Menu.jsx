import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

import { AiOutlineHome } from "react-icons/ai";
import { GrUserSettings } from "react-icons/gr";
import { BsDashLg } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { VscSourceControl } from "react-icons/vsc";
import { setIsOpen } from '@/store/panelSlice';

export default function Menu() {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.panel.panel);

    const routeCourse = pathname === '/setting_course' || 
                        pathname === '/setting_course/create_course' ||
                        pathname === '/setting_course/view_courses' ||
                        pathname === '/setting_course/update_courses' ||
                        pathname === '/setting_course/delete_courses';

    useEffect(() => {
        if (pathname === '/adminpanel/usertable') {
            dispatch(setIsOpen(true));
        } else {
            dispatch(setIsOpen(false));
        }
    }, [pathname, dispatch]);

    const toggleAccordionUser = () => {
        dispatch(setIsOpen(!isOpen));
    };

    return(
        <nav className="p-6 w-full flex flex-col flex-wrap border-b border-dashed border-zinc-600">
            <ul className="space-y-1.5 list-none">
                <li className="ml-0">
                    <Link 
                        href='/adminpanel' 
                        className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-zinc-150 ${ pathname === '/adminpanel' ? 'bg-neutral-700' : ''}`} 
                    >
                        <AiOutlineHome />
                        Dashboard
                    </Link>
                </li>

                <li className="ml-0">
                    <a className="flex justify-between items-center gap-x-3.5 py-2 px-2.5  text-sm  rounded-lg hover:bg-zinc-150" onClick={toggleAccordionUser}>
                        <span className="flex items-center">
                            <GrUserSettings className="mr-2" />
                            Users
                        </span>
                        <span className={`transition-transform transform ${isOpen ? '-rotate-90' : ''}`}>
                            <IoIosArrowBack />
                        </span>

                    </a>
                    <ul className={`list-none pl-5 duration-700 ease-in-out ${isOpen ? 'h-20 opacity-100' : 'h-0 opacity-0 overflow-hidden'}`}>
                        <li className="ml-0">
                            <Link 
                                href='/adminpanel/usertable' 
                                className={`flex items-center cursor-pointer gap-x-3.5 py-2 px-2.5 text-sm rounded-md hover:bg-zinc-150 ${pathname === '/adminpanel/usertable' ? 'bg-neutral-700' : ''}`} 
                            >
                                <BsDashLg />
                                <span className="ml-2">user table</span>
                            </Link>
                        </li>
                    </ul>
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