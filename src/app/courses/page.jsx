'use client'
import { useQuery } from "@tanstack/react-query";
import ReadComponent from "@/components/CoursesComponent/ReadComponent";
import LoadingSkeleton from "@/components/LoadingSkeleton/LoadingSkeleton";
import axios from "axios";
 
export default function Сourses(){
  const {isSuccess, isPending, isError, data, error } = useQuery({
    queryKey: ['get-course'],
    queryFn:({signal})=> axios.get('/api/getAllCourse',{signal}),
  });

  const courses = isSuccess ? data.data.getAllCourse : [];
  
  if (isPending) return <LoadingSkeleton />
  if (isError) return <span>Error: {error.message}</span>
  
  return <ReadComponent courses={courses}/>
}