'use client'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import SpinnerWithBackdrop from "@/components/Button/Spinner";
import ProfileAvatar from "@/components/ProfileAvatar/ProfileAvatar";
import DashboardComponent from "@/components/Profile/DashboardComponent";
import LoadingStatisticsSkeleton from "@/components/LoadingSkeleton/LoadingStatisticsSkeleton";




export default function Profile(){
    const { data: status } = useSession();
    const userId = useSelector(state => state.user.id);
    const [countCourses, setCountCourses] = useState([]);
    const [countLessons, setCountLessons] = useState([]);
    const [countLessonsCompleted, setCountLessonsCompleted] = useState([]);
    const [completedCoursesCount, setCompletedCoursesCount] = useState([]);
    const [statisticsAboutLessons, setStatisticsAboutLessons] = useState([]);

    const {data, isSuccess, isPending, isError} = useQuery({
        queryKey:['dashboard'],
        queryFn: async ({signal}) => {
            const response = await axios.get(`/api/dashboard?userId=${userId}`, {signal});
            return response.data;
        }
    })
    useEffect(() => {
        if (isSuccess && data) {
            setCountCourses(data.countCourses._count.id)
            setCountLessons(data.countLessons._count.id);
            setCountLessonsCompleted(data.countLessonsCompleted._count.lesson_id);
            setCompletedCoursesCount(data.completedCoursesCount);
            setStatisticsAboutLessons(data.subscribedCoursesWithLessonCount);
        }
    }, [isSuccess, data]);


    if(status === 'loading') return <SpinnerWithBackdrop isLoading={true}/>;
    if(status === 'unauthenticated') return redirect('/Signin');
    if(isError) return console.error('Error is load data');
    if(isPending) return <LoadingStatisticsSkeleton />
    return(
        <>
            <section className="w-screen">
                <section className="flex">
                    <ProfileAvatar />
                    <DashboardComponent 
                        courses={countCourses} 
                        lessons={countLessons}
                        lessonsCompleted = {countLessonsCompleted}   
                        coursesCompleted = {completedCoursesCount}   
                        statisticsAboutLessons = {statisticsAboutLessons}
                    />
                </section>
            </section>
        </>
    )
}