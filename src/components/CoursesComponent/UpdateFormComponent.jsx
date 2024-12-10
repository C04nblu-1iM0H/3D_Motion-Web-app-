import { setCourseDescription, setCourseName, setIsClose } from "@/store/courseSlice";
import {Input, Button} from "@nextui-org/react";
import { GrDocumentUpdate } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateFormatTextComponent from "./UpdateFormatTextComponent";

export default function UpdateFormComponent({handleCreateCourse}) {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.course.loading);
    const currentCourseName = useSelector(state => state.course.courseName);
    const currentCourseDescription = useSelector(state => state.course.courseDescription);

    const handleChangeName = (value) => dispatch(setCourseName(value));
    const handleChangeDescription = (value) => dispatch(setCourseDescription(value)); 
    return(
        <section className="container">
            <ToastContainer />
            <div className="w-4/5 bg-layout mx-auto min-h-fit flex flex-col flex-1 mt-11 border-2 border-solid border-zinc-20 rounded-xl">
                <div className="bg-layout w-1/3 mx-auto text-center my-5">
                    <div className="flex items-center justify-center">
                            <GrDocumentUpdate className="w-6 h-6"/>
                            <h1 className="p-2 text-xl">Обновление электронного ресурса</h1>
                    </div>
                </div>       
                <form className="px-10 pb-5 h-max flex flex-col justify-between" onSubmit={handleCreateCourse}>
                    <Input 
                        size="md"
                        className="mt-5" 
                        type="text" 
                        variant="bordered"
                        label="Название курса" 
                        placeholder="Введите в это поле название курса"
                        labelPlacement="outside"
                        value = {currentCourseName}
                        onValueChange={handleChangeName}

                    />
                    <UpdateFormatTextComponent 
                        handleChangeDescription={handleChangeDescription}
                        currentCourseDescription={currentCourseDescription}
                    />
                    <div className="flex justify-end mt-5">
                    {isLoading ?(
                        <div className="space-x-3">
                            <Button color="primary" isLoading={isLoading}>Создать</Button>
                            <Button color="danger"  isLoading={isLoading}>Закрыть</Button>
                        </div>

                    ):(
                        <div className="space-x-3">
                            <Button color="primary" type="submit">Обновить</Button>
                            <Button color="danger" onClick={()=> dispatch(setIsClose(false))}>Закрыть</Button>
                        </div>
                    )}
                    </div> 
                </form>
            </div>
        </section>
    )
}