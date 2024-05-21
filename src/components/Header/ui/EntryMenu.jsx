import { PiSignInLight } from "react-icons/pi";
import { RiUserAddLine } from "react-icons/ri";
import Link from 'next/link'

export default function EntryMenu({isHome}) {
    return(
        <>
            <li className="flex items-center cursor-pointer">
                <RiUserAddLine className={`mr-2 bg-${isHome ? 'black' : 'layout'}`} />
                <Link href='/Signup' className={`text-${isHome ? 'layout-450' : ''}  hover:underline`}>Регистрация</Link>
            </li>
            <li className="flex items-center cursor-pointer">
                <PiSignInLight className={`mr-2 ml-4 bg-${isHome ? 'black' : 'layout'}`} />
                <Link href="/Signin" className={`link text-${isHome ? 'layout-450' : ''}  hover:underline`}>Вход</Link>
            </li>
        </>
    );
}