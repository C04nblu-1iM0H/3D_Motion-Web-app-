import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/navigation'
import axios from "axios";
import DeleteCourseModalComponent from "@/components/CoursesComponent/DeleteCourseModalComponent";
import { setLoading } from "@/store/courseSlice";
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function DeleteCourse({id_course}){
    const dispatch = useDispatch();
    const router = useRouter();
    const queryClient = useQueryClient();
    const user_course_id = useSelector(state => state.user.id);

    const mutation = useMutation({
        mutationFn: async ({id_course}) => {
            await  axios.delete('/api/course', { data: { id_course } });
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCoutseIdUser', user_course_id);
            toast.success('Данные успешно загружены 👍');
            router.push('/adminpanel/course/delete_courses');
        },
        onError: (error) => {
            if(error) toast.error("К сожалению курс не  удалён, попробуйте позже или перазагрузите страницу 😞😓🙏🏻")
        },
        onSettled: () =>{
            dispatch(setLoading(false));
        }
    })

    const handleDelete = async() =>{
        try {
            dispatch(setLoading(true));
            mutation.mutateAsync({id_course})
        } catch (error) {
           toast.error("error delete on course");
        }
    }

    return(
        <DeleteCourseModalComponent handleDelete={handleDelete} />
    )
}