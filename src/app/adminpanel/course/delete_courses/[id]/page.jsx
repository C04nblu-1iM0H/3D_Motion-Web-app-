'use client';
import {useParams} from "next/navigation";
import { useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ToastContainer, toast } from 'react-toastify';

import CourseComponent from "@/components/CoursesComponent/CourseComponent";
import SideBarComponent from "@/components/AdminComponent/components/SideBarComponent";
import BreadCrumbsComponent from "@/components/BreadCrumbsComponent/BreadCrumbsComponent";
import LoadingSkeletonKurs from "@/components/LoadingSkeleton/LoadingSkeletonKurs";
import LessonComponent from "@/components/LessonComponent/LessonComponent";
import { setLoading } from "@/store/lessonSlice";
import 'react-toastify/dist/ReactToastify.css';
import LoadingTableSkeleton from "@/components/LoadingSkeleton/LoadingTableSkeleton";


const DeleteCourse = dynamic(() => import('./DeleteCourse'), {
  loading: () => <LoadingSkeletonKurs />,
});

export default function Course() {
  const {id} = useParams();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [course, setCourse] = useState([]);
  const [lesson, setLesson] = useState([]);
  
  const {data: getCourse, isSuccess, isError, isPending} = useQuery({
    queryKey:['getCoutseIdUser', id],
    queryFn: async ({signal}) => {
      const response = await axios.get('/api/course?_id='+id, {signal});
      return response.data.getCourse;
    },
  })

  const {data: getLessons, status, error } = useQuery({
    queryKey:['getLessnonsIdUser', id],
    queryFn: async ({signal}) => {
      const response = await axios.get('/api/getAllLessonOfTheCourse?_id='+id, {signal})
      return response.data.getAllLessonOfTheCourse;
    }
  })


  const mutation = useMutation({
    mutationFn: async ({lessonId}) => {
        await axios.delete('/api/lesson', { data: { lessonId } });
    },
    onSuccess: () => {
        toast.success('Данные успешно загружены 👍');
        queryClient.invalidateQueries('getLessnonsIdUser');
    },
    onError: (error) => {
        if(error) toast.error("К сожалению урок не  удалён, попробуйте позже или перазагрузите страницу 😞😓🙏🏻")
    },
    onSettled: () =>{
        dispatch(setLoading(false));
    }
  })

  useEffect(() => {
    if(isSuccess){
      setCourse(getCourse);
    }
  }, [isSuccess, getCourse]);


  useEffect(() => {
    if (status === 'success') {
      setLesson(getLessons);
    }
  }, [status, getLessons]);
  
  if(isPending) return <LoadingSkeletonKurs />
  if(isError) console.error('Данные о кусре не загружены');

  if(status === 'pending') return <LoadingTableSkeleton />
  if(status === 'error') console.error('Данные о уроке не загружены', error);

  const handleDelete = async (lessonId) =>{
    try {
      dispatch(setLoading(true));
      mutation.mutateAsync({lessonId});
    } catch (error) {
      toast.error("error deleting a lesson");
    }
  } 
    
  return (
    <section className="flex">
      <SideBarComponent/>
      <ToastContainer />
      <section className="flex flex-col container mx-auto mt-10">
        <BreadCrumbsComponent id={id} />
        <CourseComponent course={course} />
          <div className="w-full flex justify-end mt-5">
            <DeleteCourse id_course={id}/>  
          </div>
        <LessonComponent handleDelete={handleDelete} id={id} lessons={lesson}/>
      </section>
    </section>
  );
}
