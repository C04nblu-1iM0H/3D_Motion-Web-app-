import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { toast } from 'react-toastify';
import { validateCreateLessonForm } from "@/utils/validationForm";
import { setIsClose, setLessonDescription, setLessonMaterials, setLessonName, setLoading } from "@/store/lessonSlice";
import LoadingFormSkeleton from "@/components/LoadingSkeleton/LoadingFormSkeleton";
import FormUpdateLessonComponent from "@/components/LessonComponent/FormUpdateLessonComponent";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export default function UpdateLesson() {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const currentIdLesson = useSelector(state => state.lesson.currentIdSelectedLesson);
    const lessonName = useSelector(state => state.lesson.lessonName);
    const lessonDescription = useSelector(state => state.lesson.lessonDescription);
    const lessonMaterial = useSelector(state => state.lesson.lessonMaterials);

    const {data: getCurrentLesson, isSuccess, isPending, isError } = useQuery({
        queryKey:['getCurrentLesson', currentIdLesson],
        queryFn: async ({signal}) => {
            const response = await axios.get('/api/lesson?_id=' + currentIdLesson, {signal})
            return response.data.getCurrentLesson[0];
        },
    })

    const mutation = useMutation({
        mutationFn: async ({lessonName, lessonDescription, lessonMaterial, currentIdLesson}) => {
            await axios.put('/api/lesson', {lessonName, lessonDescription, lessonMaterial, currentIdLesson});
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['getLessnonsIdUser', currentIdLesson]});
            toast.success('Данные успешно загружены 👍');
            setTimeout(() => {
                dispatch(setIsClose(false));
            }, 5000);
        },
        onError: (error) => {
            if(error) toast.error("К сожалению урок не обновлён, попробуйте позже или перазагрузите страницу 😞😓🙏🏻")
        },
        onSettled: () =>{
            dispatch(setLoading(false));
            dispatch(setLessonName(" "));
            dispatch(setLessonDescription(" "));
            dispatch(setLessonMaterials(" "));
        }
    })
    
    useEffect(() => {
        if (isSuccess) {
            dispatch(setLessonName(getCurrentLesson.lesson_name));
            dispatch(setLessonDescription(getCurrentLesson.lesson_description));
            dispatch(setLessonMaterials(getCurrentLesson.lesson_materials));
        }
    }, [isSuccess, getCurrentLesson]);
      
    if(isPending) return <LoadingFormSkeleton />
    if(isError) console.error('Данные о уроке не загружены');

    const handleCreateCourse = async (e) =>{
        e.preventDefault();
        const validationError = validateCreateLessonForm(lessonName, lessonDescription, lessonMaterial);
        if (validationError) {
            toast.error(validationError);
            return;
        }
        try {
            dispatch(setLoading(true));
            mutation.mutateAsync({lessonName, lessonDescription, lessonMaterial, currentIdLesson})
        } catch (error) {
            toast.error('Error add course')
        }
    }   
    return <FormUpdateLessonComponent  handleCreateCourse={handleCreateCourse}/>
}