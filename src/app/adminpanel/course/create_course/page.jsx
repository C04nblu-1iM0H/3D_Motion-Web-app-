'use client'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { setCourseDescription, setCourseName, setLoading } from "@/store/courseSlice";
import {  toast } from 'react-toastify';
import { validateCreateCourseForm } from "@/utils/validationForm";
import CreateCourseComponent from "@/components/CoursesComponent/CreateCourseComponent";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Create() {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    
    const id_user = useSelector(state => state.user.id);
    const courseName = useSelector(state => state.course.courseName);
    const courseDescription = useSelector(state => state.course.courseDescription);
    const user_course_id = useSelector(state => state.user.id);

    const mutation = useMutation({
        mutationFn: async ({courseName, courseDescription, id_user}) => {
            await axios.post('/api/course', {courseName, courseDescription, id_user});
        },
        onSuccess: () => {
            toast.success('Данные успешно загружены 👍');
            queryClient.invalidateQueries({queryKey: ['getCourseIdUser', user_course_id]});
        },
        onError: (error) => {
            if(error) toast.error("К сожалению курс не загружен, попробуйте позже или перазагрузите страницу 😞😓🙏🏻")
        },
        onSettled: () =>{
            dispatch(setLoading(false));
            dispatch(setCourseName(''));
            dispatch(setCourseDescription(''));
        }
    })

    const handleCreateCourse = async (e) =>{
        e.preventDefault();
        const validationError = validateCreateCourseForm(courseName, courseDescription);
        if (validationError) {
            toast.error(validationError);
            return;
        }
        try {
            dispatch(setLoading(true));
            await mutation.mutateAsync({courseName, courseDescription, id_user});
        } catch (error) {
            toast.error('Error add course')
        }
    }   

    return(
        <CreateCourseComponent handleCreateCourse={handleCreateCourse}/>
    )
}