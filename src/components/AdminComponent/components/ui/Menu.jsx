import { useState } from 'react';
import { AiOutlineHome } from "react-icons/ai";
import { GrUserSettings } from "react-icons/gr";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { BsDashLg } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { setSelectedPanel } from '@/store/panelSlice';


export default function Menu() {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return(
        <nav className="p-6 w-full flex flex-col flex-wrap border-b border-dashed border-zinc-600">
            <ul className="space-y-1.5">
                <li>
                    <a className="flex items-center gap-x-3.5 py-2 px-2.5 bg-neutral-700 text-sm rounded-lg hover:bg-zinc-150" onClick={()=>dispatch(setSelectedPanel('dashboard'))}>
                        <AiOutlineHome />
                        Dashboard
                    </a>
                </li>

                <li>
                    <a className="flex justify-between items-center gap-x-3.5 py-2 px-2.5  text-sm  rounded-lg hover:bg-zinc-150" onClick={toggleAccordion}>
                        <span className="flex items-center">
                            <GrUserSettings className="mr-2" />
                            Users
                        </span>
                        <span className={`transition-transform transform ${isOpen ? '-rotate-90' : ''}`}>
                            <IoIosArrowBack />
                        </span>

                    </a>
                        <ul className={`pl-5 duration-700 ease-in-out ${isOpen ? 'h-20 opacity-100' : 'h-0 opacity-0 overflow-hidden'}`}>
                            <li>
                                <a className="flex items-center cursor-pointer gap-x-3.5 py-2 px-2.5 text-sm rounded-md hover:bg-zinc-150"  onClick={()=>dispatch(setSelectedPanel('usertable'))}> 
                                    <BsDashLg /> 
                                    <span className="ml-2">user tabel</span>
                                </a>
                            </li>
                            <li>
                                <a className="flex items-center cursor-pointer gap-x-3.5 py-2 px-2.5 text-sm rounded-md hover:bg-zinc-150" href="#"> 
                                    <BsDashLg /> 
                                    <span className="ml-2">user google tabel</span>
                                </a>
                            </li>
                        </ul>
                </li>
                <li>
                    <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg hover:bg-zinc-150" href="#">
                        <HiOutlineBookOpen />
                        Kurs
                    </a>
                </li>
            </ul>
        </nav>
    );
}