'use client';
import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import {Input, Button, Select, SelectItem, Card, CardFooter} from "@nextui-org/react";
import { CiMail } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";

import GroupButtonProfile from "@/components/Button/GroupButtonProfile";

export default function Profile(){
    const session = useSession();
    const [isEdit, setIsEdit] = useState(true);
    const [isDisabled, setIsDisabled] = useState(true);
    const {status} = session;

    
    if(status === 'loading'){
        return 'Loading...';
    }

    if(status === 'unauthenticated'){
        return redirect('/Signin');
    }

    const {name, email, image} = session?.data?.user;

    const handleEditToggle = () => {
        setIsEdit(false);
    };


    return(
        <section className="w-screen">
            <section className="w-3/4 h-3/4 flex justify-center mx-auto mt-11 flex-wrap">
                <figure className="bg-Layout-50 w-1/4 h-[21rem] flex flex-col items-center mr-6">
                        <Card 
                            isFooterBlurred
                            radius="lg"
                            className="mt-4 border-none">
                            <Image
                                alt="avatar"
                                className="object-cover"
                                src={image}
                                width={270}
                                height={270}
                                quality={100}
                                priority={true}
                            />
                            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                                <p className="text-tiny text-white/80">зугрузить фото</p>
                                <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
                                    Click me
                                </Button>
                            </CardFooter>
                        </Card>
                    <figcaption className="mt-3" >{name || email}</figcaption>
                </figure>
                <section className="bg-Layout-50 w-1/3 h-[40rem] flex flex-col items-center">
                    <div className="mt-8 mb-1 flex items-center">
                        <IoSettingsOutline />
                        <h1 className="ml-2">Настройки данных профиля</h1>
                    </div>
                    <form className="w-3/4 h-3/4 mt-4 flex flex-col justify-evenly">
                        <Input
                            type="text"
                            label="Email"
                            placeholder={email}
                            labelPlacement="outside"
                            disabled={isEdit}
                            startContent={
                                <CiMail />
                            }
                        />
                        <Input
                            type="text"
                            label="Name"
                            placeholder={email}
                            labelPlacement="outside"
                            disabled={isEdit}
                            startContent={
                                <FaRegUser />
                            }
                        />
                        <Input
                            type="text"
                            label="Surname"
                            placeholder={email}
                            labelPlacement="outside"
                            disabled={isEdit}
                            startContent={
                                <FaRegUser />
                            }
                        />
                          <Select
                            labelPlacement="outside"
                            label="Ваш пол"
                            placeholder="Выберите ваш пол"
                            className="w-full"
                            >
                                <SelectItem key={0} value="Женский">Женский</SelectItem>
                                <SelectItem key={1} value="Мужской">Мужской</SelectItem>
                        </Select>
                        <div className="relative flex flex-col justify-between h-[4.4rem]">
                            <label className="text-sm">Введите дату вашего рождения</label>
                            <input
                                type="date"
                                disabled={isEdit}
                                className="block bg-Layout-100 w-full py-2 pl-3 pr-10 mt-1 box-border border-none rounded-xl hover:bg-default-200 focus:outline-none focus:ring-0 select-none"
                            />
                            <IoIosArrowDown className="absolute w-3.5 h-3.5 inset-y-2/3 right-3 -translate-y-1/2 pointer-events-none"/>
                        </div>
                        {isEdit
                            ?(
                                <Button 
                                color="primary"
                                onClick={handleEditToggle}
                                >Редактировать</Button> 
                            ):(
                                <GroupButtonProfile setState={setIsEdit}/> 
                            )
                        }

                    </form>
                </section>
            </section>
        </section>
    )
}