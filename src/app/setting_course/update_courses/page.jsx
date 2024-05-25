'use client'
import { useState,useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import ReadComponent from "@/components/CoursesComponent/ReadComponent";
import SideBarComponent from "@/components/AdminComponent/components/SideBarComponent";
import LoadingSkeleton from "@/components/LoadingSkeleton/LoadingSkeleton";

export default function Update(){
const [courses, setCourses] = useState([]);
    const user_course_id = useSelector(state => state.user.id);

    const {data, isSuccess, isError, isPending} = useQuery({
      queryKey:['getCourseUser', user_course_id],
      queryFn: async ({signal}) => {
        const response = await axios.get(`/api/getCourseUser?user_course_id=${user_course_id}`,{signal});
        return response.data.getCourseCurrentUser;
      },
    })

    useEffect(() => {
      if(isSuccess){
        setCourses(data);
      }
    }, [isSuccess, data]);
    
    if(isPending) return <LoadingSkeleton />
    if(isError) console.error('Ошибка в получении курсов пользователя');

    return(
      <section className="flex">
        <SideBarComponent/>
        <ReadComponent courses={courses}/>
      </section>
        
    )
}