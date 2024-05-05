import { useDispatch, useSelector } from "react-redux";
import {Input, Textarea, Button} from "@nextui-org/react";
import { ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { setIsClose, setLessonDescription, setLessonMaterials, setLessonName } from "@/store/lessonSlice";
import { IoCreateOutline } from "react-icons/io5";

export default function FormUpdateLessonComponent({handleCreateCourse}){
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.lesson.loading);
    const lessonNames = useSelector(state => state.lesson.lessonName);
    const lessonDescriptions = useSelector(state => state.lesson.lessonDescription);
    const lessonMaterials = useSelector(state => state.lesson.lessonMaterials);

    const handleChangeName = (value) => dispatch(setLessonName(value));
    const handleChangeDescription = (value) => dispatch(setLessonDescription(value));
    const handleChangeMaterial = (value) => dispatch(setLessonMaterials(value));

    return(
        <section className="container">
            <ToastContainer />
            <div className="w-1/2 bg-layout mx-auto min-h-fit flex flex-col flex-1 mt-11 border-2 border-solid border-zinc-600 rounded-xl">
                <div className="bg-layout w-1/3 mx-auto text-center my-5">
                    <div className="flex items-center justify-center">
                            <IoCreateOutline className="w-6 h-6"/>
                            <h1 className="p-2 text-xl">Создание урока</h1>
                        </div>
                    </div>  
                <form className="px-10 pb-5 h-max flex flex-col justify-between" onSubmit={handleCreateCourse}>
                    <Input 
                        size="md"
                        value={lessonNames}
                        className="mt-5" 
                        type="text" 
                        variant="bordered"
                        label="Название урока" 
                        placeholder="Введите название урока"
                        labelPlacement="outside"
                        onValueChange={handleChangeName}
                    />
                    <Textarea
                        minRows={2}
                        maxRows={22}
                        value={lessonDescriptions}
                        className="mt-5"
                        variant="bordered"
                        label="Описание урока"
                        labelPlacement="outside"
                        placeholder="Введите описание урока"
                        onValueChange={handleChangeDescription}

                    />
                    <Textarea
                        id="materialTextarea"
                        minRows={2}
                        maxRows={22}
                        variant="bordered"
                        label="Материал урока"
                        labelPlacement="outside"
                        placeholder="Введите материал урока"
                        onValueChange={handleChangeMaterial}
                        value={lessonMaterials}
                    />
                    <div className="flex justify-end mt-5">
                    {
                        isLoading 
                        ?(
                            <div>
                                <Button color="primary" isLoading={isLoading}>Создать</Button>
                                <Button color="danger"  isLoading={isLoading}>Закрыть</Button>
                            </div>

                        ):(
                            <div className="space-x-3">
                                <Button color="primary" type="submit">Создать</Button>
                                <Button color="danger"  onClick={()=>dispatch(setIsClose(false))}>Закрыть</Button>
                            </div>
                        )
                    }
                    </div> 
                </form>
            </div>
        </section>
    );
}