'use client'
import { usePathname } from 'next/navigation'
import { useSession } from "next-auth/react";
import Link from 'next/link'

import DarkMode from "../DarkMode/DarkMode";
import MenuAccount from "../../app/MenuAccount";
import EntryMenu from "./ui/EntryMenu";


export default function Header(){
    const { data: session, status } = useSession();
    const pathname = usePathname()
    const isAuthenticated = status === 'authenticated'
    const isHome = pathname === '/';

    return (
        <header className={`h-16 flex relative z-10 justify-around items-center bg-${isHome ? 'layout-400 ' : 'layout shadow-lg'}`}>
            <Link href='/' className={`text-3xl font-mono text-${isHome ? 'layout-450' : ''}`}>
                3D-Motion
            </Link>
            <ul className="flex basis-1/5 justify-around">
                <li className="list-none cursor-pointer"><Link href="/" className={`text-${isHome ? 'layout-450' : ''} hover:underline`}>Главная</Link></li>
                <li className="list-none cursor-pointer"><Link href="/courses" className={`text-${isHome ? 'layout-450' : ''} hover:underline`}>Список курсов</Link></li>
                <li className="list-none cursor-pointer"><Link href="/testcomponent" className={`text-${isHome ? 'layout-450' : ''} hover:underline`}>О нас</Link></li>
            </ul>
            <ul className="flex justify-around items-center">
                {
                    !isAuthenticated
                        ? <EntryMenu isHome={isHome}/> 
                        : <MenuAccount username={session.user.name} email={session.user.email} />
                }
                <DarkMode/>
            </ul>
        </header>
    );
}