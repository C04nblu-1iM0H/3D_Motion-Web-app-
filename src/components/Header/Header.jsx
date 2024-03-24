'use client'
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
    console.log(session);
    const isAuthenticated = session.status === 'authenticated'
    return (
        <header className="bg-Layout">
            <Link href='/' className="text-3xl font-mono">
                3D-Motion
            </Link>
            <ul className="lenta">
                <li><Link href="/" className="link">Главная</Link></li>
                <li><Link href="#" className="link">Список курсов</Link></li>
                <li><Link href="#" className="link">О нас</Link></li>
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