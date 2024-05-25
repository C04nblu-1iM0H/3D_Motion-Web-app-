'use client'
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSkeleton from "@/components/LoadingSkeleton/LoadingSkeleton";
import axios from "axios";
import { useSelector } from "react-redux";
import ViewCourseComponent from "@/components/CoursesComponent/ViewCourseComponent";

 
export default function Сourses(){
  const [courses, setCourses] = useState([]);
  const queryClient = useQueryClient();
  const id_user = useSelector(state => state.user.id);
  
  const {data, isSuccess, isPending, isError, error } = useQuery({
    queryKey: ['getCourses'],
    queryFn: async ({signal})=>{
      const response = await axios.get(`/api/getAllCourse?id_user=${id_user}`, {signal});
      return response.data.getAllCourse;
    },
    enabled: !!id_user
  });
  useEffect(() => {
    if(isSuccess && data !== undefined){
      setCourses(data);
    }
  }, [isSuccess, data]);

  const mutationEnableFavourites = useMutation({
    mutationFn: async ({id_course, id_user}) => await axios.post('/api/favourites', {id_course, id_user}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCourses'] })
    },
  });

  const mutationDisabledFavourites = useMutation({
    mutationFn: async ({id_course, id_user}) => await axios.delete('/api/favourites', { data:{id_course, id_user}}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCourses'] })
    },
  }); 

  const mutationEnableSubscribe = useMutation({
    mutationFn: async ({id_course, id_user}) => await axios.post('/api/subscribe', {id_course, id_user}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCourses'] })
    },
  }); 

  const mutationDisabledSubscribe = useMutation({
    mutationFn: async ({id_course, id_user}) => await axios.delete('/api/subscribe', { data:{id_course, id_user}}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCourses'] })
    },
  }); 


  const handleEnableFavourites = async (id_course) =>{
    if(!id_course) return;
    mutationEnableFavourites.mutateAsync({id_course, id_user});
  }

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
  
  

  if (isPending) return <LoadingSkeleton />
  if (isError) return <span>Error: {error.message}</span>


  return <ViewCourseComponent 
          courses={courses} 
          handleEnableFavourites={handleEnableFavourites} 
          handleDisabledFavourites={handleDisabledFavourites}
          handleEnableSubscribe={handleEnableSubscribe}
          handleDisabledSubscribe = {handleDisabledSubscribe} 
        />
}