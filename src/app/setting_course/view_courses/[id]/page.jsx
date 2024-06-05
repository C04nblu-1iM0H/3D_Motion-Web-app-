'use client';
import {useParams} from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import {Button} from "@nextui-org/react";
import axios from 'axios';
import dynamic from 'next/dynamic';

import CourseComponent from "@/components/CoursesComponent/CourseComponent";
import SideBarComponent from "@/components/AdminComponent/components/SideBarComponent";
import BreadCrumbsComponent from "@/components/BreadCrumbsComponent/BreadCrumbsComponent";
import LoadingSkeletonKurs from "@/components/LoadingSkeleton/LoadingSkeletonKurs";
import { setIsClose } from "@/store/lessonSlice";
import { useQuery } from "@tanstack/react-query";
import LessonViewComponent from "@/components/LessonComponent/LessonViewComponent";
import LoadingTableLessonsSkeleton from "@/components/LoadingSkeleton/LoadingTableLessonsSkeleton";
import ProfileAvatar from "@/components/ProfileAvatar/ProfileAvatar";

const CreateLesson = dynamic(() => import('./CreateLesson'), {
  loading: () => <LoadingSkeletonKurs />,
});

export default function Course() {
  const {id} = useParams();
  const dispatch = useDispatch();
  const role = useSelector(state => state.user.role);
  const [course, setCourse] = useState([]);
  const [lesson, setLesson] = useState([]);
  const showCreateLesson = useSelector(state => state.lesson.isCloseLesson);

  const {data, isSuccess, isError, isPending} = useQuery({
    queryKey:['getCourseIdUser', id],
    queryFn: async ({signal}) => {
      const response = await axios.get(`/api/course?_id=${id}`, {signal});
      return response.data.getCourse;
    },
  })
  
  useEffect(() => {
    if(isSuccess && data){
      setCourse(data);
    }
  }, [isSuccess, data]);

  const {data: getLessons, status } = useQuery({
    queryKey:['getLessnonsIdUser', id],
    queryFn: async ({signal}) => {
      const response = await axios.get('/api/getAllLessonOfTheCourse?_id='+id, {signal})
      return response.data.getAllLessonOfTheCourse;
    }
  })

  useEffect(() => {
    if (status === 'success' && getLessons) {
      setLesson(getLessons);
    }
  }, [status, getLessons]);
  
  if(isPending || status === 'pending') return (
    <section className="flex flex-col justify-evenly gap-y-7 container mx-auto mt-10">
      <LoadingSkeletonKurs />
      <LoadingTableLessonsSkeleton />
    </section>
  )
  if(isError || status === 'error') console.error('Данные о ресурсе или уроках не загружены');

  return (
    <section className="flex">
      {role !== 1 ? <ProfileAvatar/> : <SideBarComponent /> }
      <section className="flex flex-col container mx-auto mt-10">
        {!showCreateLesson && (
          <>
            <BreadCrumbsComponent id={id} />
            <CourseComponent course={course} />
            <div className="w-full flex justify-end mt-5">
              <Button onClick={() => dispatch(setIsClose(true))}>Создать урок</Button>
            </div>
          </>
        )}
        {showCreateLesson && <CreateLesson id={id} />}
        {!showCreateLesson && (<LessonViewComponent id={id} lessons={lesson}/>)}
      </section>
    </section>
  );
}
