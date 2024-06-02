'use client'
import {useParams, useRouter} from "next/navigation";
import axios from 'axios';
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";

import CourseComponent from "@/components/CoursesComponent/CourseComponent";
import BreadCrumbsComponent from "@/components/BreadCrumbsComponent/BreadCrumbsComponent";
import LoadingSkeletonKurs from "@/components/LoadingSkeleton/LoadingSkeletonKurs";
import OpenLessonsComponent from "@/components/LessonComponent/OpenLessonsComponent";
import LoadingTableLessonsSkeleton from "@/components/LoadingSkeleton/LoadingTableLessonsSkeleton";
import LoadingSkeletonAuthore from "@/components/LoadingSkeleton/LoadingSkeletonAuthore";
import LoadingFeedback from "@/components/LoadingSkeleton/LoadingFeedback";
import { useSession } from "next-auth/react";

const Feedback = dynamic(() => import('./feedback'), {
  loading: () => <LoadingFeedback />,
});

const Authore = dynamic(() => import('./authore'), {
  loading: () => <LoadingSkeletonAuthore />,
});


export default function Course(){
  const {id} = useParams();
  const session = useSession();
  const userId = useSelector(state => state.user.id);
  const router = useRouter();

  const { data: course, isLoading, isError } = useQuery({
    queryKey: ['course', id], 
    queryFn: async ({signal}) => {
      const response = await axios.get(`/api/course?_id=${id}&userId=${userId}`, {signal});
      return response.data.getCourse[0];
    },
    onError: (data) => {
      if(data === 'undefined'){
        router.push('/not-found');
      }
    }
  });

  const {data: getLessons, status } = useQuery({
    queryKey:['getLessnons', userId, id],
    queryFn: async ({signal}) => {
      const response = await axios.get(`/api/getAllLessonOfTheCourse?_id=${id}&userId=${userId}`, {signal})
      return response.data.getAllLessonOfTheCourse;
    },
    onError: (data) => {
      if(data === 'undefined'){
        router.push('/not-found');
      }
    }
  })


  if(isLoading || status === 'pending') return (
    <section className="flex flex-col justify-evenly gap-y-7 container mx-auto mt-10">
      <LoadingSkeletonKurs />
      <LoadingTableLessonsSkeleton />
    </section>
  )

  if (isError || !course) {
    router.push('/not-found');
    return null;
  }

  if(status === 'error') {
    router.push('/not-found');
    return null;
  }
  const {id_subscribe} = course; 

  return (
    <section className="flex flex-col container mx-auto mt-10">
      <BreadCrumbsComponent id={id} />
      <CourseComponent course={course} />
      {session.status !== 'unauthenticated' &&(<Authore />)}  
        { session.status === 'unauthenticated' ?(
          <section className="w-1/2 bg-layout mx-auto p-5 mt-16 text-center rounded-lg">
            <h1>Зарегистрируйтесь, чтобы получить доступ к информации 📝</h1>
          </section>
        ): id_subscribe !== null ?(
          <OpenLessonsComponent lessons={getLessons} />
        ):(
          <section className="w-1/2 bg-layout mx-auto p-5 mt-16 text-center rounded-lg">
            <h1>Вы не подписаны на ресурс, пожалуйста подпишитесь чтобы начать изучение</h1>
          </section>
        )}
      <Feedback />
    </section>
  );
}

