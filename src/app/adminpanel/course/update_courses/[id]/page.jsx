'use client';
import {useParams} from "next/navigation";
import { useEffect, useState } from 'react';
import {Button} from "@nextui-org/react";
import axios from 'axios';
import dynamic from 'next/dynamic';

import SideBarComponent from "@/components/AdminComponent/components/SideBarComponent";
import BreadCrumbsComponent from "@/components/BreadCrumbsComponent/BreadCrumbsComponent";
import LoadingSkeletonKurs from "@/components/LoadingSkeleton/LoadingSkeletonKurs";
import LessonComponent from "@/components/LessonComponent/LessonComponent";
import CourseComponent from "@/components/CoursesComponent.jsx/CourseComponent";
import { GrUpdate } from "react-icons/gr";
import { setCourseDescription, setCourseName, setIsClose, setIsSuccessCourse } from "@/store/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { setIsSuccess } from "@/store/lessonSlice";

const UpdateCourse = dynamic(() => import('./UpdateCourse'), {
  loading: () => <LoadingSkeletonKurs />,
});

const UpdateLesson = dynamic(() => import('./UpdateLesson'), {
  loading: () => <LoadingSkeletonKurs />,
});

export default function Course() {
  const {id} = useParams();
  const dispatch = useDispatch()
  const [course, setCourse] = useState(null);
  const [lessons, setLesson] = useState(null);
  const isCourseSuccess = useSelector(state => state.course.isSuccess);
  const isSuccess =useSelector(state => state.lesson.success);
  const showUpdateCourse = useSelector(state => state.course.isClose);
  const showUpdateLesson = useSelector(state => state.lesson.isCloseLesson);


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get('/api/course?_id='+id);
        if(response.status === 200){
          setCourse(response.data.getCourse);
          dispatch(setCourseName(response.data.getCourse[0].course_name));
          dispatch(setCourseDescription(response.data.getCourse[0].course_description));
        }
      } catch (error) {
        console.error('Failed to fetch course:', error);
      }
    };
    if (id || isCourseSuccess) {
      fetchCourse();
      dispatch(setIsSuccessCourse(false));
    } 
  }, [id, isCourseSuccess]);

  useEffect(() => {
    const getAllLessonOfTheCourse = async () => {
      try {
        const response = await axios.get('/api/getAllLessonOfTheCourse?_id='+id);
        if(response.status === 200){
          setLesson(response.data.getAllLessonOfTheCourse);
        }
      } catch (error) {
        console.error('Failed to fetch course:', error);
      }
    };
    if (isSuccess || id) {
      getAllLessonOfTheCourse();
      dispatch(setIsSuccess(false))
    }
  }, [id, isSuccess]);

  return (
    <section className="flex">
      <SideBarComponent/>
      {!course
        ?(
          <LoadingSkeletonKurs />
        ):(
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
          {showUpdateLesson && <UpdateLesson id_course={id} />}
          {!showUpdateCourse  && !showUpdateLesson && <LessonComponent id={id} lessons={lessons} />}
          </section>
        ) 
      }
    </section>
  );
}
