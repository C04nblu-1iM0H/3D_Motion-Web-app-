'use client'
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import SpinnerWithBackdrop from "@/components/Button/Spinner";
import ProfileAvatar from "@/components/ProfileAvatar/ProfileAvatar";
import MessangerComponent from "@/components/Profile/MessagerComponent";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import NoMassegeComponent from "@/components/Profile/noMessageComponent";
import LoadingSkeletonMessageComponent from "@/components/LoadingSkeleton/LoadingSkeletonMessageComponent";


export default function Messager(){
    const id_user = useSelector(state => state.user.id);
    const [chats, setChats]= useState([]);
    const { data: session, status } = useSession();
    
    const {data, isSuccess, isError, isPending, error} = useQuery({
        queryKey:['getMessages'],
        queryFn:async ({signal})=> {
            const response = await axios.get(`/api/chat?id_user=${id_user}`,{signal});
            return response.data.getAllChat;
        }
    });
    useEffect(()=>{
        if(isSuccess){
            setChats(data)
        }
    },[isSuccess, data])

    if(status === 'loading'){return <SpinnerWithBackdrop isLoading={true}/>;}
    if(status === 'unauthenticated'){return redirect('/Signin');}
    if(isPending) return <LoadingSkeletonMessageComponent />
    const {name, email, image} = session.user;
    return(
        <section className="w-screen">
            <section className="flex gap-x-5 flex-wrap">
                <ProfileAvatar image={image} sassionName={name} email={email}/>
                {chats.length > 0 ?(
                    <MessangerComponent chats={chats}/>
                ):(
                    <NoMassegeComponent/>
                )}
            </section>
        </section>
    )
}