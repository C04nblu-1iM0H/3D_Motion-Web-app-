'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import SpinnerWithBackdrop from "@/components/Button/Spinner";
import ViewCourseComponent from "@/components/CoursesComponent/ViewCourseComponent";
import LoadingSkeleton from "@/components/LoadingSkeleton/LoadingSkeleton";
import ProfileAvatar from "@/components/ProfileAvatar/ProfileAvatar";

export default function Favorite(){
    const { data: session, status } = useSession();
    const [courses, setCourses] = useState([]);
    const queryClient = useQueryClient();
    const id_user = useSelector(state => state.user.id);

    const {data, isSuccess, isPending, isError, error } = useQuery({
        queryKey: ['getCoursesFavorite'],
        queryFn: async ({signal})=>{
          const response = await axios.get(`/api/getAllCourseFavorite?id_user=${id_user}`,{signal});
          return response.data.getAllCourseFavorite;
        }
      });

    useEffect(() => {
        if(isSuccess){
            setCourses(data);
        }
    }, [isSuccess, data]);

    const mutationDisabledFavourites = useMutation({
        mutationFn: async ({id_course, id_user}) => await axios.delete('/api/favourites', { data:{id_course, id_user}}),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getCoursesFavorite'] })
        },
    }); 
    
    const mutationEnableSubscribe = useMutation({
        mutationFn: async ({id_course, id_user}) => await axios.post('/api/subscribe', {id_course, id_user}),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getCoursesFavorite'] })
        },
    }); 
    
    const mutationDisabledSubscribe = useMutation({
        mutationFn: async ({id_course, id_user}) => await axios.delete('/api/subscribe', { data:{id_course, id_user}}),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getCoursesFavorite'] })
        },
    }); 
    
    
    
    const handleDisabledFavourites = async(id_course) =>{
        if(!id_course) return;
        mutationDisabledFavourites.mutateAsync({id_course, id_user})
    }
    
    const handleEnableSubscribe = async(id_course) =>{
        if(!id_course) return;
        mutationEnableSubscribe.mutateAsync({id_course, id_user})
    }
    
    const handleDisabledSubscribe = async(id_course) =>{
        if(!id_course) return;
        mutationDisabledSubscribe.mutateAsync({id_course, id_user})
    }


    if(status === 'loading'){return <SpinnerWithBackdrop isLoading={true}/>;}
    if(status === 'unauthenticated'){return redirect('/Signin');}
    const {name, email, image} = session.user;
    if (isPending) return <LoadingSkeleton />
    if (isError) return <span>Error: {error.message}</span>
    return(
        <>
            <ToastContainer/>
            <section className="w-screen">
                <section className="flex">
                    <ProfileAvatar image={image} sassionName={name} email={email}/>
                    <ViewCourseComponent 
                        courses={courses}
                        handleDisabledFavourites={handleDisabledFavourites}
                        handleEnableSubscribe={handleEnableSubscribe}
                        handleDisabledSubscribe={handleDisabledSubscribe}
                    />
                </section>
            </section>
        </>
    )
} 