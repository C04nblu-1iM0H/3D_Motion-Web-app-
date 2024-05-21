'use client';
import {useParams} from "next/navigation";
import { useEffect, useState } from 'react';
import {Button} from "@nextui-org/react";
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useQuery } from "@tanstack/react-query";

import SideBarComponent from "@/components/AdminComponent/components/SideBarComponent";
import BreadCrumbsComponent from "@/components/BreadCrumbsComponent/BreadCrumbsComponent";
import LoadingSkeletonKurs from "@/components/LoadingSkeleton/LoadingSkeletonKurs";
import LessonComponent from "@/components/LessonComponent/LessonComponent";
import CourseComponent from "@/components/CoursesComponent/CourseComponent";
import { GrUpdate } from "react-icons/gr";
import { setCourseDescription, setCourseName, setIsClose} from "@/store/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingTableSkeleton from "@/components/LoadingSkeleton/LoadingTableSkeleton";


const UpdateCourse = dynamic(() => import('./UpdateCourse'), {
  loading: () => <LoadingSkeletonKurs />,
});

const UpdateLesson = dynamic(() => import('./UpdateLesson'), {
  loading: () => <LoadingSkeletonKurs />,
});

export default function Course() {
  const {id} = useParams();
  const dispatch = useDispatch()
  const [course, setCourse] = useState([]);
  const [lessons, setLesson] = useState([]);
  const currentIdLesson = useSelector(state => state.lesson.currentIdSelectedLesson);
  const showUpdateCourse = useSelector(state => state.course.isClose);
  const showUpdateLesson = useSelector(state => state.lesson.isCloseLesson);

  const {data: dataCourse, isSuccess, isError, isPending} = useQuery({
    queryKey:['getCourseIdUser', id],
    queryFn: async ({signal}) => {
      const response = await axios.get('/api/course?_id='+id, {signal});
      return response.data.getCourse[0];
    },
  });

  const {data: getLessons, status, error } = useQuery({
    queryKey:['getLessnonsIdUser', currentIdLesson],
    queryFn: async ({signal}) => {
      const response = await axios.get('/api/getAllLessonOfTheCourse?_id='+id, {signal})
      return response.data.getAllLessonOfTheCourse;
    },
  });

  useEffect(() => {
    if(isSuccess && dataCourse !== undefined ){
      setCourse(dataCourse);
      dispatch(setCourseName(dataCourse.course_name));
      dispatch(setCourseDescription(dataCourse.course_description));
    }
  }, [isSuccess, dataCourse]);

  useEffect(() => {
    if (status === 'success' && getLessons !== undefined) {
      setLesson(getLessons);
    }
  }, [status, getLessons]);
  
  if(isPending) return <LoadingSkeletonKurs />
  if(isError) console.error('Данные о кусре не загружены');

  if(status === 'pending') return <LoadingTableSkeleton />
  if(status === 'error') console.error('Данные о уроке не загружены', error);

  console.log(course);
  return (
    <section className="flex">
      <SideBarComponent/>
        <section className="flex flex-col container mx-auto mt-10">
          {!showUpdateCourse && !showUpdateLesson && (
            <>
              <BreadCrumbsComponent id={id} />
              <CourseComponent course={course} />
              <div className="w-full flex justify-end mt-5">
                <Button 
                    color="primary" 
                    onClick={() => dispatch(setIsClose(true))}
                    endContent={<GrUpdate/>}
                >
                  Обновить курс
                </Button>
              </div>
            </>
          )}
          {showUpdateCourse && <UpdateCourse id={id} />}
          {showUpdateLesson && <UpdateLesson />}
          {!showUpdateCourse  && !showUpdateLesson && <LessonComponent id={id} lessons={lessons} />}
        </section>
    </section>
  );
}
