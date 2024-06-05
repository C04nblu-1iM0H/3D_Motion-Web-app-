'use client'
import SpinnerWithBackdrop from "@/components/Button/Spinner";
import AuthoreComponent from "@/components/CoursesComponent/AuthoreComponent";
import LoadingSkeletonAuthore from "@/components/LoadingSkeleton/LoadingSkeletonAuthore";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function  Authore() {
    const {id} = useParams();
    const router = useRouter();
    const [dataAuthore, setDataAuthore] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const id_user = useSelector(state => state.user.id);

    const {data, isSuccess, isError, isPending, error} = useQuery({
        queryKey:['getAuthoreCourse'],
        queryFn: async ({signal})=>{
            const response = await axios.get(`/api/getAuthoreCourse?id=${id}`, {signal});
            return response.data.getAuthoreCourse[0];
        }
    })
    useEffect(()=>{
        if(isSuccess && data){
            setDataAuthore(data);
        }
    },[isSuccess, data]);

    const mutation = useMutation({
        mutationFn: async ({id_user, id_authore})=>{
            const response = await axios.post('/api/chat', {id_user, id_authore});
            return response.data;
        },
        onSuccess: async(data) => {
            router.push(`/Profile/messager/${data.chatId}`);
            setIsLoading(false);
        }
    });

    const startChat = (id_authore) =>{
        setIsLoading(true);
        mutation.mutate({id_user, id_authore});
    }

    if(isPending) return <LoadingSkeletonAuthore />
    if(isError) console.error(`Error: ${error}`);
    return(
        <>
            {isLoading &&(<SpinnerWithBackdrop />)}
            <AuthoreComponent dataAuthore={dataAuthore} startChat={startChat}/>
        </>

    );
}