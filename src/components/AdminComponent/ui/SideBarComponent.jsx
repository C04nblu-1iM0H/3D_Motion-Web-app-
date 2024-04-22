import Image from "next/image";
import { useState } from 'react';
import { useSession } from "next-auth/react";
import { AiOutlineHome } from "react-icons/ai";
import { GrUserSettings } from "react-icons/gr";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { BsDashLg } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

import SpinnerWithBackdrop from "@/components/Button/Spinner";


export default function SideBarComponent(){
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };
    
    if(status === 'loading'){return <SpinnerWithBackdrop isLoading={true}/>;}
    if(status === 'unauthenticated'){return redirect('/Signin');}
    const {name, email, image} = session.user;
    return(
        <div className="w-[260px] h-[52.5rem] bg-layout border-gray-200 mt-[-1rem]">
            <div className="pt-6 flex flex-col items-center border-b border-dashed border-zinc-600">
                <figure>
                    {!image
                        ? <FaUserCircle 
                            alt="avatar"
                            className=" w-44 h-44 rounded-full"
                        />
                        : <Image
                            alt="avatar"
                            className="rounded-full"
                            src={image}
                            width={170}
                            height={170}
                            quality={100}
                            priority={true}
                        />
                    }
                    <figcaption className="flex flex-col items-center gap-y-1 mt-2 mb-4">
                        <h2>{name}</h2>
                        <p className="text-xs text-neutral-400">{email}</p>
                    </figcaption>
                </figure>
            </div>
            <nav className="p-6 w-full flex flex-col flex-wrap border-b border-dashed border-zinc-600">
                <ul className="space-y-1.5">
                    <li>

                        <a className="flex items-center gap-x-3.5 py-2 px-2.5 bg-neutral-700 text-sm rounded-lg hover:bg-zinc-150" href="#">
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
                                    <a className="flex items-center cursor-pointer gap-x-3.5 py-2 px-2.5 text-sm rounded-md hover:bg-zinc-150" href="#"> 
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
        </div>
    );
}