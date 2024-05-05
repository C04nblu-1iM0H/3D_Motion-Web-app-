'use client';
import {useParams} from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import {Button} from "@nextui-org/react";
import axios from 'axios';
import dynamic from 'next/dynamic';

import CourseComponent from "@/components/CoursesComponent.jsx/CourseComponent";
import SideBarComponent from "@/components/AdminComponent/components/SideBarComponent";
import BreadCrumbsComponent from "@/components/BreadCrumbsComponent/BreadCrumbsComponent";
import LoadingSkeletonKurs from "@/components/LoadingSkeleton/LoadingSkeletonKurs";
import LessonComponent from "@/components/LessonComponent/LessonComponent";
import { setIsClose, setIsSuccess } from "@/store/lessonSlice";
// import { setIsSuccessCourse } from "@/store/courseSlice";

const CreateLesson = dynamic(() => import('./CreateLesson'), {
  loading: () => <LoadingSkeletonKurs />,
});

export default function Course() {
  const {id} = useParams();
  const dispatch = useDispatch();
  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const showCreateLesson = useSelector(state => state.lesson.isCloseLesson);
  const isSuccess = useSelector(state => state.lesson.success);


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get('/api/course?_id='+id);
        if(response.status === 200){
          setCourse(response.data.getCourse);
        }
      } catch (error) {
        console.error('Failed to fetch course:', error);
      }
    };
    if (id) {
      fetchCourse();
    }
  }, [id]);

  useEffect(() => {
    const getAllLessonOfTheCourse = async () => {
      try {
        const response = await axios.get('/api/getAllLessonOfTheCourse?_id='+id);
        if(response.status === 200){
          setLesson(response.data.getAllLessonOfTheCourse);
        }
      } catch (error) {
        console.error('Failed to fetch course:', error);
      }finally{
        dispatch(setIsSuccess(false))
      }
    };
    if (isSuccess, id) {
      getAllLessonOfTheCourse();
    }
  }, [isSuccess, id]);
  

  return (
    <section className="flex">
      <SideBarComponent/>
      {!course
        ?(
          <LoadingSkeletonKurs />
        ):(
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
          {!showCreateLesson && (<LessonComponent lessons={lesson}/>)}
          </section>
        ) 
      }
    </section>
  );
}
