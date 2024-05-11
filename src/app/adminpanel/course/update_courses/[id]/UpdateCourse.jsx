'use state'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from 'react-toastify';
import UpdateFormComponent from "@/components/CoursesComponent/UpdateFormComponent";
import { validateCreateCourseForm } from "@/utils/validationForm";
import { setCourseDescription, setCourseName, setIsClose, setLoading } from "@/store/courseSlice";

export default function UpdateCourse({id}){
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const courseName = useSelector(state => state.course.courseName);
    const courseDescription = useSelector(state => state.course.courseDescription);

    const mutation = useMutation({
        mutationFn: async ({courseName, courseDescription, id}) => {
            await axios.put('/api/course', {courseName, courseDescription, id});
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['getCourseIdUser', id]})
            toast.success('Данные успешно загружены 👍');
            setTimeout(() => {
                dispatch(setIsClose(false));
            }, 3000);
        },
        onError: (error) => {
            if(error) toast.error("К сожалению курс не обновлён, попробуйте позже или перазагрузите страницу 😞😓🙏🏻")
        },
        onSettled: () =>{
            dispatch(setLoading(false));
            dispatch(setCourseName(" "));
            dispatch(setCourseDescription(" "));
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
            mutation.mutateAsync({courseName, courseDescription, id})
        } catch (error) {
            if(error) toast.error('Error add course')
        } finally{
    
        }
    }   
    return <UpdateFormComponent handleCreateCourse={handleCreateCourse} />
}