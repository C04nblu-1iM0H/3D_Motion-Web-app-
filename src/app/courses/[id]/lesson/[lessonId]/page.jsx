'use client'
import React from 'react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import axios from "axios";
import {Button, Chip} from "@nextui-org/react";
import 'react-quill/dist/quill.snow.css';


import { toast, ToastContainer } from 'react-toastify';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLessonDescription, setLessonMaterials, setLessonName } from "@/store/lessonSlice";
import 'react-toastify/dist/ReactToastify.css';
import BreadCrumbsComponent from "@/components/BreadCrumbsComponent/BreadCrumbsComponent";
import { IoMdCheckmarkCircle } from "react-icons/io";
import LoadingSkeletonLesson from "@/components/LoadingSkeleton/LoadingSkeletonLesson";

export default function Lesson() {
    const {id, lessonId} = useParams();
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [passed, setPassed] = useState(0);

    const id_user = useSelector(state => state.user.id);
    const lessonName = useSelector(state => state.lesson.lessonName);
    const lessonDescription = useSelector(state => state.lesson.lessonDescription);
    const lessonMaterials = useSelector(state => state.lesson.lessonMaterials);

    const {data, isSuccess, isError, isPending} = useQuery({
        queryKey:['getLesson', lessonId],
        queryFn: async ({signal}) => {
            const response = await axios.get(`/api/lesson?_id=${lessonId}`, {signal})
            return response.data.getCurrentLesson[0];
        },
    });

    const {data:getPassedLesson, status} = useQuery({
        queryKey:['getPassedLesson', lessonId],
        queryFn: async ({signal}) =>{
            const response = await axios.get(`/api/userLessonProgress?lessonId=${lessonId}&userid=${id_user}`, {signal});
            return response.data.getPassedLesson[0];
        },
    });

    const mutation = useMutation({
        mutationFn: async ({id_user, id, lessonId})=>{
            await axios.post('/api/userLessonProgress', {id_user, id, lessonId})
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getPassedLesson', lessonId]})
            toast.success("Вы успешно прошли урок, можете двигаться дальше");
        },
        onError: (error) =>{
            console.log(`Произошла ошибка ${error}`)
        },
        onSettled: () => {
            setLoading(false);
        }
    })

    useEffect(()=>{
        if(status === 'success' && getPassedLesson.passed !== undefined){
            const {passed} = getPassedLesson;
            setPassed(passed)
        }
    }, [status, getPassedLesson ])

    useEffect(()=>{
        if(isSuccess){
            dispatch(setLessonName(data.lesson_name));
            dispatch(setLessonDescription(data.lesson_description));
            dispatch(setLessonMaterials(data.lesson_materials));
        }
    }, [data, isSuccess, dispatch])


    const handleSuccessLesson = async () =>{
        try {
            setLoading(true);
            mutation.mutateAsync({id_user, id, lessonId})
        } catch (error) {
            console.error('Ошибка курс не пройден');
        }
    } 

    if(isPending || status === 'pending'){
        return <LoadingSkeletonLesson />
    }
    
    isError ? <span>Error: ошибка в отображении курса</span>: null;

    const CourseContentDisplay = ({ content }) => {
        return (
            <div className="quill-content" dangerouslySetInnerHTML={{ __html: content }} />
        );
    };
    return(
        <section className="w-full flex flex-col items-center">
            <ToastContainer />
            <div className="mt-16 container flex justify-start">
                <BreadCrumbsComponent id={id} lessonId={lessonId}/>
            </div>
            <div className="container bg-layout rounded-xl mt-10">
                <div className="flex flex-col items-center mt-10">
                    <div>
                        <h1 className="font-bold text-2xl">{lessonName}</h1>
                    </div>
                    <div className="px-20 py-10 ql-editor">
                        {lessonDescription && <CourseContentDisplay content={lessonDescription} />}
                    </div>

                    <div className="px-20 pb-20 ql-editor">
                        {lessonMaterials && <CourseContentDisplay content={lessonMaterials} />}
                    </div>
                </div>
            </div>
            <div  className="mt-5 container flex justify-end">
                {passed === 1 
                ?(
                    <Chip
                    startContent={<IoMdCheckmarkCircle size={18} />}
                    variant="faded"
                    color="success"
                    size="lg"
                  >
                    Урок пройден
                  </Chip>
                ):(
                    <Button color="primary" isLoading={loading} onClick={handleSuccessLesson}>Прошел</Button>  
                )}
            </div>
        </section>
    )
}