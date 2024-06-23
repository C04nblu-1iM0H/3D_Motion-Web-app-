'use client'
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'
import { useSession } from "next-auth/react";
import {useTheme} from "next-themes";
import Link from 'next/link'
import Image from 'next/image';

import DarkMode from "../DarkMode/DarkMode";
import MenuAccount from "../../app/MenuAccount";
import EntryMenu from "./ui/EntryMenu";
import { FiMenu, FiX } from 'react-icons/fi';


export default function Header(){
    const { data: session, status } = useSession();
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme } = useTheme()

    const isAuthenticated = status === 'authenticated'
    const isHome = pathname === '/';
    
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={`bg-${isHome ? 'black ' : 'layout'}`}>

            <div className={`lg:hidden h-16 relative z-10 bg-${isHome ? 'black ' : 'layout'}`}>
                <button onClick={toggleMenu} className="text-layout-450 mt-3 ml-10">
                    {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            <div className={`h-16 flex relative z-10 justify-around items-center ${isMenuOpen ? 'burger-visible' : 'burger-hidden'} lg:flex`}>
                <Link rel="preload" href='/' as="image">
                    {theme === 'dark' || isHome ?(
                        <Image
                            src={'/DL4.png'}
                            width={200}
                            height={200}
                            quality={100}
                            alt='logo'
                            priority={true}
                            className='burger-image_logo'
                        />
                    ):(
                        <Image
                            src={'/DL_White.png'}
                            width={200}
                            height={200}
                            quality={100}
                            alt='logo'
                            priority={true}
                            className='burger-image_logo'
                        />
                    )}
                    

                </Link>
                <ul className="burger-ul flex w-96 justify-around">
                    <li className="burger-li list-none cursor-pointer"><Link href="/" className={`text-${isHome ? 'layout-450' : ''} hover:underline`}>Главная</Link></li>
                    <li className="burger-li list-none cursor-pointer"><Link href="/courses" className={`text-${isHome ? 'layout-450' : ''} hover:underline`}>Электронные ресурсы</Link></li>
                </ul>
                <ul className="burger-ul flex justify-around items-center">
                    {
                        !isAuthenticated
                            ? <EntryMenu isHome={isHome}/> 
                            : <MenuAccount username={session.user.name} email={session.user.email} />
                    }
                    <DarkMode/>
                </ul>
            </div>
        </header>
    );
}