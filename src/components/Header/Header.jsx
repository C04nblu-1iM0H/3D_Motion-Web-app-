'use client'
import { usePathname } from 'next/navigation'
import { Provider } from "react-redux";
import { useSession } from "next-auth/react";
import store from '../../store';
import Link from 'next/link'

import DarkMode from "../DarkMode/DarkMode";
import MenuAccount from "./ui/MenuAccount";
import EntryMenu from "./ui/EntryMenu";
import './header.scss';


export default function Header(){
    const session = useSession();
    const pathname = usePathname()
    const isAuthenticated = session.status === 'authenticated'
    const isHome = pathname === '/';

    return (
        <header className={`bg-${isHome ? 'layout-400' : 'layout'}`}>
            <Link href='/' className={`text-3xl font-mono text-${isHome ? 'layout-450' : ''}`}>
                3D-Motion
            </Link>
            <ul className="lenta">
                <li><Link href="/" className={`link text-${isHome ? 'layout-450' : ''}`}>Главная</Link></li>
                <li><Link href="#" className={`link text-${isHome ? 'layout-450' : ''}`}>Список курсов</Link></li>
                <li><Link href="#" className={`link text-${isHome ? 'layout-450' : ''}`}>О нас</Link></li>
            </ul>
            <ul className="Auth">
                {!isAuthenticated? <EntryMenu /> : <MenuAccount username={session.data.user.name || session.data.user.email}/>}
                <Provider store={store}>
                    <DarkMode/>
                </Provider>
            </ul>
        </header>
    );
}