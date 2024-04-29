
import { useState } from 'react';

import { HiOutlineBookOpen } from "react-icons/hi2";
import { RiHomeWifiLine } from "react-icons/ri";
import { IoMdHeartHalf } from "react-icons/io";

export default function ProfilMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return(
        <nav className="p-6 w-full flex flex-col flex-wrap border-b border-dashed border-zinc-600">
            <ul className="space-y-1.5">
                <li>
                    <a className="flex items-center gap-x-3.5 py-2 px-2.5 bg-neutral-700 text-sm rounded-lg hover:bg-zinc-150" href="#">
                        <RiHomeWifiLine />
                        Dashboard
                    </a>
                </li>

                <li>
                    <a className="flex items-center gap-x-3.5 py-2 px-2.5  text-sm  rounded-lg hover:bg-zinc-150 " href="#">
                        <IoMdHeartHalf />
                        Избранное
                    </a>
                </li>
                <li>
                    <a className="flex items-center gap-x-3.5 py-2 px-2.5  text-sm  rounded-lg hover:bg-zinc-150">
                        <HiOutlineBookOpen />
                        Мои курсы
                    </a>
                </li>
            </ul>
        </nav>
    );
}