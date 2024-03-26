'use client';
import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { IoSettingsOutline } from "react-icons/io5";
// import {Spinner} from "@nextui-org/react";

import SpinnerWithBackdrop from "@/components/Button/Spinner";
import ProfileFormEnabled from "@/components/ProfileForm/ProfileFormEnabled";
import ProfileFormDisabled from "@/components/ProfileForm/ProfileFormDisabled";
import ProfileAvatar from "@/components/ProfileAvatar/ProfileAvatar";


export default function Profile(){
    const session = useSession();
    const [isEdit, setIsEdit] = useState(true);
    const {status} = session;

    if(status === 'loading'){
        return <SpinnerWithBackdrop isLoading={true}/>;
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
                <ProfileAvatar image={image} name={name} email={email}/>
                <section className="bg-Layout-50 w-1/3 h-[40rem] flex flex-col items-center">
                    <div className="mt-8 mb-1 flex items-center">
                        <IoSettingsOutline />
                        <h1 className="ml-2">Настройки данных профиля</h1>
                    </div>
                    {isEdit
                        ?<ProfileFormDisabled handleClick={handleEditToggle} isEdit={isEdit} setStateIsEdit={setIsEdit}  email={email} name={name}/>
                        :<ProfileFormEnabled handleClick={handleEditToggle} isEdit={isEdit} setStateIsEdit={setIsEdit} /> 
                    }           
                   
                </section>
            </section>
        </section>
    )
}