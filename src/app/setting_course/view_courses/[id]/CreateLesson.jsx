'use client';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { toast } from 'react-toastify';
import { validateCreateLessonForm } from "@/utils/validationForm";
import FormCreateLessonComponent from "@/components/LessonComponent/FormCreateLessonComponent";
import { setIsClose, setLessonDescription, setLessonMaterials, setLessonName, setLoading } from "@/store/lessonSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export default function CreateLesson({id}){
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const lessonName = useSelector(state => state.lesson.lessonName);
    const lessonDescription = useSelector(state => state.lesson.lessonDescription);
    const lessonMaterials = useSelector(state => state.lesson.lessonMaterials);


    const mutation = useMutation({
        mutationFn: async ({lessonName, lessonDescription, lessonMaterials, id}) => {
            await axios.post('/api/lesson', {lessonName, lessonDescription, lessonMaterials, id});
        },
        onSuccess: () => {
            toast.success('Данные успешно загружены 👍');
            queryClient.invalidateQueries({queryKey: ['getLessnonsIdUser', id]});
            setTimeout(() => {
                dispatch(setIsClose(false));
            }, 3000);
        },
        onError: (error) => {
            if(error) toast.error("К сожалению урок не загружен, попробуйте позже или перазагрузите страницу 😞😓🙏🏻")
        },
        onSettled: () =>{
            dispatch(setLoading(false));
            dispatch(setLessonName(''));
            dispatch(setLessonDescription(''));
            dispatch(setLessonMaterials(''));
        }
    })

    const handleCreateCourse = async (e) =>{
        e.preventDefault();
        const validationError = validateCreateLessonForm(lessonName, lessonDescription, lessonMaterials);
        if (validationError) {
            toast.error(validationError);
            return;
        }
        try {
            dispatch(setLoading(true));
            mutation.mutateAsync({lessonName, lessonDescription, lessonMaterials, id});
        } catch (error) {
            toast.error('Error add course')
        }
    }   

    return(
        <FormCreateLessonComponent handleCreateCourse={handleCreateCourse}/>
    )
}