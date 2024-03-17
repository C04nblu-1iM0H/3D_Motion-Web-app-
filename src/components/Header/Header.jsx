'use client'
import { Provider } from "react-redux";
import { useSession } from "next-auth/react";
import store from '../../store';
import Image from "next/image";
import Link from 'next/link'

import DarkMode from "../DarkMode/DarkMode";
import MenuAccount from "./ui/MenuAccount";
import EntryMenu from "./ui/EntryMenu";
import './header.scss';


export default function Header(){
    const session = useSession();
    console.log(session);
    const status = session.status;
    return (
        <header className="bg-white">
            <Link href='/'>
                <Image
                    className='logo'
                    src="/logo.png"
                    alt="Logo"
                    width={169}
                    height={57}
                    priority
                /> 
            </Link>
            <ul className="lenta">
                <li><Link href="/" className="link">Главная</Link></li>
                <li><Link href="#" className="link">Список курсов</Link></li>
                <li><Link href="#" className="link">О нас</Link></li>
            </ul>
            <ul className="Auth">
                {status === 'authenticated' &&(
                    <MenuAccount data={session}/>
                )}
                {status === "unauthenticated" && (
                    <EntryMenu />
                )}
                <Provider store={store}>
                    <DarkMode/>
                </Provider>
            </ul>
        </header>
    );
}