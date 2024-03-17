import { PiSignInLight } from "react-icons/pi";
import { RiUserAddLine } from "react-icons/ri";
import Link from 'next/link'

export default function EntryMenu() {
    return(
        <>
            <li>
                <RiUserAddLine className="icon" />
                <Link href='/Signup' className="link">Регистрация</Link>
            </li>
            <li>
                <PiSignInLight className="icon" />
                <Link href="/Signin" className="link">Вход</Link>
            </li>
        </>
    );
}