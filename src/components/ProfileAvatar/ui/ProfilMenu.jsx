import Link from "next/link";
import { usePathname } from 'next/navigation';

import { HiOutlineBookOpen } from "react-icons/hi2";
import { RiHomeWifiLine } from "react-icons/ri";
import { IoMdHeartHalf } from "react-icons/io";
import { VscSourceControl } from "react-icons/vsc";
import { IoSettingsOutline } from "react-icons/io5";
import { BiMessageRounded } from "react-icons/bi";
import { useSelector } from "react-redux";

export default function ProfilMenu() {
    const role = useSelector(state => state.user.role);
    const pathname = usePathname();
    const routeCourse = pathname === '/setting_course' || 
                        pathname === '/setting_course/create_course' ||
                        pathname === '/setting_course/view_courses' ||
                        pathname === '/setting_course/update_courses' ||
                        pathname === '/setting_course/delete_courses';

    return(
        <nav className="p-6 w-full flex flex-col flex-wrap border-b border-dashed border-zinc-600">
            <ul className="space-y-1.5">
                <li>
                    <Link 
                        className={`flex items-center gap-x-3.5 py-2 px-2.5  text-sm  rounded-lg hover:bg-zinc-150 ${pathname === '/Profile' ? 'bg-neutral-700' : ''}`} 
                        href='/Profile'
                    >
                        <RiHomeWifiLine className="w-5 h-5"/>
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link 
                        className={`flex items-center gap-x-3.5 py-2 px-2.5  text-sm  rounded-lg hover:bg-zinc-150 ${pathname === '/Profile/setting_profile' ? 'bg-neutral-700' : ''}`} 
                        href='/Profile/setting_profile'
                    >
                        <IoSettingsOutline className="w-5 h-5"/>
                        Настройка профиля
                    </Link>
                </li>
                <li>
                    <Link 
                        className={`flex items-center gap-x-3.5 py-2 px-2.5  text-sm  rounded-lg hover:bg-zinc-150 ${pathname === '/Profile/messager' ? 'bg-neutral-700' : ''}`} 
                        href="/Profile/messager"
                    >
                        <BiMessageRounded className="w-5 h-5"/>
                        Мессенджер
                    </Link>
                </li>
                <li>
                    <Link 
                        className={`flex items-center gap-x-3.5 py-2 px-2.5  text-sm  rounded-lg hover:bg-zinc-150 ${pathname === '/Profile/favorite' ? 'bg-neutral-700' : ''}`} 
                        href="/Profile/favorite"
                    >
                        <IoMdHeartHalf className="w-5 h-5"/>
                        Избранное
                    </Link>
                </li>
                <li>
                    <Link 
                        className={`flex items-center gap-x-3.5 py-2 px-2.5  text-sm  rounded-lg hover:bg-zinc-150 ${pathname === '/Profile/subscribe' ? 'bg-neutral-700' : ''}`} 
                        href="/Profile/subscribe"
                    >
                        <HiOutlineBookOpen className="w-5 h-5"/>
                        Мои ресурсы
                    </Link>
                </li>
                <li>
                    {role !==3 && (                   
                        <Link 
                            className={`flex items-center gap-x-3.5 py-2 px-2.5  text-sm  rounded-lg hover:bg-zinc-150 ${routeCourse ? 'bg-neutral-700' : ''}`} 
                            href='/setting_course' 
                        >
                            <VscSourceControl className="w-5 h-5"/>
                            Управление ресурсами
                        </Link>
                    )}
 
                </li>
            </ul>
        </nav>
    );
}