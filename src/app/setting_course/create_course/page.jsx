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
            if(error) toast.error("К сожалению курс не загружен, попробуйте позже или перазагрузите страницу 😞😓🙏🏻")
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
        try {
            console.log(file);
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
    let str = `\course_image\Motion4.png`;
    const correctedPath = str.replace(/\\/g, "/").replace(/^/, '/').replace('M', '/M');
    console.log(correctedPath); 
    return(
        <CreateCourseComponent handleCreateCourse={handleCreateCourse}/>
    )
}