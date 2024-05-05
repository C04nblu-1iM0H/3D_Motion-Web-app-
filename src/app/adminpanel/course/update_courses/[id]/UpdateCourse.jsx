'use state'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { toast } from 'react-toastify';
import UpdateFormComponent from "@/components/CoursesComponent.jsx/UpdateFormComponent";
import { validateCreateCourseForm } from "@/utils/validationForm";
import { setCourseDescription, setCourseName, setIsClose, setIsSuccessCourse, setLoading } from "@/store/courseSlice";

export default function UpdateCourse({id}){
    const dispatch = useDispatch();
    const courseName = useSelector(state => state.course.courseName);
    const courseDescription = useSelector(state => state.course.courseDescription);

    const handleCreateCourse = async (e) =>{
        e.preventDefault();

        const validationError = validateCreateCourseForm(courseName, courseDescription);
        if (validationError) {
            toast.error(validationError);
            return;
        }
        try {
            dispatch(setLoading(true));
            const updateCourse = toast.promise(
                axios.put('/api/course', {courseName, courseDescription, id}),
                {
                  pending: "Подождите пожалуйста...",
                  success: "Данные успешно загружены 👍",
                  error: "Произошла ошибка, попробуйте ещё раз"
                }
            );
            const response = await updateCourse;
            if(response.status === 200){
                dispatch(setIsSuccessCourse(true));
                setTimeout(() => {
                    dispatch(setIsClose(false));
                }, 5000);
            }
        } catch (error) {
            toast.error('Error add course')
        }finally{
            dispatch(setLoading(false));
            dispatch(setCourseName(''));
            dispatch(setCourseDescription(''));
        }
    }   
    return(
        <UpdateFormComponent handleCreateCourse={handleCreateCourse} />
    )
}