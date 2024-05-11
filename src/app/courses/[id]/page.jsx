'use client'
import {useParams} from "next/navigation";
import { useEffect } from 'react';
import axios from 'axios';
import { useQuery } from "@tanstack/react-query";

import CourseComponent from "@/components/CoursesComponent/CourseComponent";
import BreadCrumbsComponent from "@/components/BreadCrumbsComponent/BreadCrumbsComponent";
import LoadingSkeletonKurs from "@/components/LoadingSkeleton/LoadingSkeletonKurs";


export default function Course(){
  const {id} = useParams();

  const { data: course, isLoading, isError, error } = useQuery({ queryKey: ['course', id], queryFn:() => fetchCourse(id)});

  const fetchCourse = async (id) =>{
    const response = await axios.get(`/api/course?_id=${id}`);
    return response.data.getCourse;
  };

  useEffect(() => {
    if (!id) return;

    const interval = setInterval(() => {
      fetchCourse(id);
    }, 5000);

    return () => clearInterval(interval);
  }, [id]);

  if (isLoading) return <LoadingSkeletonKurs />;
  if (isError) return <span>Error: {error.message}</span>;
  
  return (
    <section className="flex flex-col container mx-auto mt-10">
      <BreadCrumbsComponent id={id} />
      <CourseComponent course={course} />
    </section>
  );
}

