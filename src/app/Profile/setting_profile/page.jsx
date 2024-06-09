'use client'
import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { IoSettingsOutline } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'; 
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


import SpinnerWithBackdrop from "@/components/Button/Spinner";
import ProfileFormEnabled from "@/components/Profile/ProfileFormEnabled";
import ProfileFormDisabled from "@/components/Profile/ProfileFormDisabled";
import ProfileAvatar from "@/components/ProfileAvatar/ProfileAvatar";
import validationProfileForm from '@/utils/validationProfileForm';
import 'react-toastify/dist/ReactToastify.css';
import { resetForm, setIsLoading, setUserData } from '@/store/userProfileSlice';

export default function SettingProfile(){
    const { data: session, status } = useSession();
    const [file, setFile] = useState(null);
    const router = useRouter();
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const id_user = useSelector(state => state.user.id);
    const isEdit = useSelector(state => state.userProfile.isEdit);
    const changeName = useSelector(state => state.userProfile.name);
    const changeSurname = useSelector(state => state.userProfile.surname);
    const changeGender = useSelector(state => state.userProfile.gender);
    const changeDate = useSelector(state => state.userProfile.date);
    const changePhone = useSelector(state => state.userProfile.phone);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/Signin');
        }
    }, [status, router]);

    const email = session?.user?.email;

    const {data, isSuccess, isError, isPending, error} = useQuery({
        queryKey:['getUserData', id_user],
        queryFn: async ({signal}) =>{
            const response = await axios.get(`/api/getUserData?email=${email}`,{signal});
            return response.data.userData;
        },
        enabled: !!id_user && !!email,
    });

    useEffect(() => {
        queryClient.refetchQueries(['getUserData', id_user]);
    }, [id_user, queryClient]);

    useEffect(() => {
        if (isSuccess && data) {
            dispatch(setUserData(data))
        }
    }, [isSuccess, data, dispatch]);

    const mutation = useMutation({
        mutationFn: async(formData) => {
            await axios.put('/api/changeProfile', formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey:['getUserData', id_user]})
            dispatch(resetForm());
            dispatch(setIsLoading(false));
        },
        onError: (error) => {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            }
        },
    })
    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validationProfileForm(changeName, changeSurname, changePhone);
        if (validationError) {
            toast.error(validationError);
            return;
        }
        
        try {
            dispatch(setIsLoading(true));
            const formData = new FormData();
            formData.append('email', email);
            formData.append('changeName', changeName);
            formData.append('changeSurname', changeSurname);
            formData.append('changeGender', changeGender);
            formData.append('changeDate', changeDate);
            formData.append('changePhone', changePhone);
            formData.append('file', file);
            mutation.mutateAsync(formData);
        } catch (error) {
            console.error(error)
        }
    }

    if(status === 'loading'){return <SpinnerWithBackdrop isLoading={true}/>;}
    if(status === 'unauthenticated'){return redirect('/Signin');}
    if(isPending || data === undefined) {return <SpinnerWithBackdrop isLoading={true}/>;}
    if(isError){console.error(`Error: ${error.message}`);}

    return(
        <>
            <ToastContainer/>
            <section className="w-screen">
                <section className="flex gap-x-5 flex-wrap">
                    <ProfileAvatar handleFileChange={handleFileChange} />
                    <section className="mt-4 bg-layout w-1/3 h-[40rem] flex flex-col items-center rounded-lg">
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