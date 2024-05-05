import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { toast } from 'react-toastify';
import { validateCreateLessonForm } from "@/utils/validationForm";
import FormCreateLessonComponent from "@/components/LessonComponent/FormCreateLessonComponent";
import { setIsClose, setIsSuccess, setLessonDescription, setLessonMaterials, setLessonName, setLoading } from "@/store/lessonSlice";
import LoadingFormSkeleton from "@/components/LoadingSkeleton/LoadingFormSkeleton";
import FormUpdateLessonComponent from "@/components/LessonComponent/FormUpdateLessonComponent";


export default function UpdateLesson() {
    const dispatch = useDispatch();
    const [initialLoading, setInitialLoading] = useState(false)
    const currentIdLesson = useSelector(state => state.lesson.currentIdSelectedLesson);
    const lessonName = useSelector(state => state.lesson.lessonName);
    const lessonDescription = useSelector(state => state.lesson.lessonDescription);
    const lessonMaterial = useSelector(state => state.lesson.lessonMaterials);
    const loading = useSelector(state => state.lesson.loading);

    useEffect(() => {
        const fetchCurrentLesson = async () => {
          try {
            setInitialLoading(true);
            const response = await axios.get('/api/lesson?_id=' + currentIdLesson);
              if(response.status === 200){
                dispatch(setLessonName(response.data.getCurrentLesson[0].lesson_name));
                dispatch(setLessonDescription(response.data.getCurrentLesson[0].lesson_description));
                dispatch(setLessonMaterials(response.data.getCurrentLesson[0].lesson_materials));
              }
            } catch (error) {
                console.error('Failed to fetch courses:', error);
            }finally{
                setInitialLoading(false);
            }
        };
        if(currentIdLesson){
            fetchCurrentLesson();
        }
    }, [currentIdLesson]);


    const handleCreateCourse = async (e) =>{
        e.preventDefault();
        const validationError = validateCreateLessonForm(lessonName, lessonDescription, lessonMaterial);
        if (validationError) {
            toast.error(validationError);
            return;
        }
        try {
            dispatch(setLoading(true));
            const updateLessonPromise = toast.promise(
                axios.put('/api/lesson', {lessonName, lessonDescription, lessonMaterial, currentIdLesson}),
                {
                  pending: "Подождите пожалуйста...",
                  success: "Данные успешно загружены 👍",
                  error: "Произошла ошибка, попробуйте ещё раз"
                }
            );
            const response = await updateLessonPromise;
            if(response.status === 200){
                dispatch(setIsSuccess(true));
                setTimeout(() => {
                    dispatch(setIsClose(false));
                }, 5000);
            }
        } catch (error) {
            toast.error('Error add course')
        }finally{
            dispatch(setLoading(false));
            dispatch(setLessonName(''));
            dispatch(setLessonDescription(''));
            dispatch(setLessonMaterials(''));
        }
    }   
    return(
        <>
            {initialLoading ?(
                <LoadingFormSkeleton />
            ):(
                <FormUpdateLessonComponent  handleCreateCourse={handleCreateCourse}/>
            )}
        </>
    );
}