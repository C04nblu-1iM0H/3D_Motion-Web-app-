'use client'
import { Provider } from "react-redux";
import store from '../../store';
import Image from "next/image";
import Link from 'next/link'
import { PiSignInLight } from "react-icons/pi";
import { RiUserAddLine } from "react-icons/ri";

import DarkMode from "../DarkMode/DarkMode";
import './header.scss';
import { useSession } from "next-auth/react";

export default function Header(){
    const session = useSession();
    console.log(session);
    return (
        <header>
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
                <li><Link href="#" className="link">Новости</Link></li>
                <li><Link href="#" className="link">Список курсов</Link></li>
                <li><Link href="#" className="link">О нас</Link></li>
            </ul>
            <ul className="Auth">
                <li>
                    <RiUserAddLine className="icon" />
                    <Link href='/Signup' className="link">Регистрация</Link>
                </li>
                <li>
                    <PiSignInLight className="icon" />
                    <Link href="/SignIn" className="link">Вход</Link>
                </li>
                <Provider store={store}>
                    <DarkMode/>
                </Provider>
            </ul>
        </header>
    );
}