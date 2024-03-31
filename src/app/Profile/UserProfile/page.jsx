'use client';
import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { IoSettingsOutline } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'; 

import SpinnerWithBackdrop from "@/components/Button/Spinner";
import ProfileFormEnabled from "@/components/ProfileForm/ProfileFormEnabled";
import ProfileFormDisabled from "@/components/ProfileForm/ProfileFormDisabled";
import ProfileAvatar from "@/components/ProfileAvatar/ProfileAvatar";
import validationProfileForm from '@/utils/validationProfileForm';
import 'react-toastify/dist/ReactToastify.css';
import { resetForm, setIsLoading } from '@/store/userProfileSlice';


export default function UserProfile(){
    const dispatch = useDispatch();
    const session = useSession();
    const {status} = session;
    const isEdit = useSelector(state => state.userProfile.isEdit);
    const changeName = useSelector(state => state.userProfile.name);
    const changeSurname = useSelector(state => state.userProfile.surname);
    const changeGender = useSelector(state => state.userProfile.gender);
    const changeDate = useSelector(state => state.userProfile.date);
    const changePhone = useSelector(state => state.userProfile.phone);

    if(status === 'loading'){return <SpinnerWithBackdrop isLoading={true}/>;}
    if(status === 'unauthenticated'){return redirect('/Signin');}
    const {name, email, image} = session?.data?.user;


    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validationProfileForm(changeName, changeSurname, changeGender, changePhone);

        if (validationError) {
            toast.error(validationError);
            return;
        }

        dispatch(setIsLoading(true));
        try {
            const response = await axios.post('/api/changeProfile', {email, changeName, changeSurname, changeGender, changeDate, changePhone});
            if (response.status === 200) {
                toast.success("Вы успешно внесли свои данные", { icon: "👍" });
                dispatch(resetForm());
            }else{
              toast.error("Failed to data in form");
            }
        } catch (error) {
            console.error(error)
        }finally {
            dispatch(setIsLoading(false));
        }
    }

    return(
        <>
            <ToastContainer/>
            <section className="w-screen">
                <section className="w-3/4 h-3/4 flex justify-center mx-auto mt-11 flex-wrap">
                    <ProfileAvatar image={image} name={name} email={email}/>
                    <section className="bg-layout-50 w-1/3 h-[40rem] flex flex-col items-center rounded-lg">
                        <div className="mt-8 mb-1 flex items-center">
                            <IoSettingsOutline />
                            <h1 className="ml-2">Настройки данных профиля</h1>
                        </div>
                        {isEdit
                            ?<ProfileFormDisabled />
                            :<ProfileFormEnabled handleSubmit={handleSubmit} /> 
                        }           
                    </section>
                </section>
            </section>
        </>
    )
}