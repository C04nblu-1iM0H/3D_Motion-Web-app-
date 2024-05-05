'use client';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { toast } from 'react-toastify';
import { validateCreateLessonForm } from "@/utils/validationForm";
import FormCreateLessonComponent from "@/components/LessonComponent/FormCreateLessonComponent";
import { setIsClose, setIsSuccess, setLoading } from "@/store/lessonSlice";


export default function CreateLesson({id}){
    const dispatch = useDispatch()
    const lessonName = useSelector(state => state.lesson.lessonName);
    const lessonDescription = useSelector(state => state.lesson.lessonDescription);
    const lessonMaterials = useSelector(state => state.lesson.lessonMaterials);



    const handleCreateCourse = async (e) =>{
        e.preventDefault();
        const validationError = validateCreateLessonForm(lessonName, lessonDescription, lessonMaterials);
        if (validationError) {
            toast.error(validationError);
            return;
        }
        try {
            dispatch(setLoading(true));
            const createLessonPromise = toast.promise(
                axios.post('/api/lesson', {lessonName, lessonDescription, lessonMaterials, id}),
                {
                  pending: "Подождите пожалуйста...",
                  success: "Данные успешно загружены 👍",
                  error: "Произошла ошибка, попробуйте ещё раз"
                }
            );
            const response = await createLessonPromise;
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
        }
    }   

    return(
        <FormCreateLessonComponent handleCreateCourse={handleCreateCourse}/>
    )
}