'use client'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { setCourseDescription, setCourseName, setLoading } from "@/store/courseSlice";
import {  toast } from 'react-toastify';
import { validateCreateCourseForm } from "@/utils/validationForm";
import CreateCourseComponent from "@/components/CoursesComponent/CreateCourseComponent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Create() {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const router = useRouter()
    
    const id_user = useSelector(state => state.user.id);
    const courseName = useSelector(state => state.course.courseName);
    const courseDescription = useSelector(state => state.course.courseDescription);
    const user_course_id = useSelector(state => state.user.id);

    const mutation = useMutation({
        mutationFn: (formData) => {
            axios.post('/api/course', formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
        },
        onSuccess: () => {
            toast.success('Данные успешно загружены 👍');
            queryClient.invalidateQueries({queryKey: ['getCourseIdUser', user_course_id]});
            router.push('/setting_course')
        },
        onError: (error) => {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("К сожалению курс не загружен, попробуйте позже или перезагрузите страницу 😞😓🙏🏻");
            }
        },
        onSettled: () =>{
            dispatch(setLoading(false));
            dispatch(setCourseName(''));
            dispatch(setCourseDescription(''));
        }
    })

    const handleCreateCourse = (e, file) =>{
        e.preventDefault();
        const validationError = validateCreateCourseForm(courseName, courseDescription);
        if (validationError) {
            toast.error(validationError);
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            toast.error('Размер фото не должено привышать 2MB');
            return;
        }

        try {
            dispatch(setLoading(true));
            const formData = new FormData();
            formData.append('courseName', courseName);
            formData.append('courseDescription', courseDescription);
            formData.append('id_user', id_user);
            formData.append('file', file);
            mutation.mutate(formData);
        } catch (error) {
            toast.error('Error add course')
        }
    }   

    return(
        <CreateCourseComponent handleCreateCourse={handleCreateCourse}/>
    )
}