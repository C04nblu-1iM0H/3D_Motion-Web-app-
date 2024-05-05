'use client';

import {useParams, usePathname} from "next/navigation";
import { useState } from "react";
import axios from "axios";
import {Input, Textarea, Button} from "@nextui-org/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoCreateOutline } from "react-icons/io5";
import BreadCrumbsComponent from "@/components/BreadCrumbsComponent/BreadCrumbsComponent";
import SideBarComponent from "@/components/AdminComponent/components/SideBarComponent";


export default function createLesson(){
    const {id} = useParams();
    const pathname = usePathname();
    console.log(pathname);
    const [courseName, setCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChangeName = (value) => setCourseName(value);
    const handleChangeDescription = (value) => setCourseDescription(value);

    const handleCreateCourse = async (e) =>{
        e.preventDefault();
        const validationError = validateCreateCourseForm(courseName, courseDescription);
        if (validationError) {
            toast.error(validationError);
            return;
        }
        try {
            setIsLoading(true);
            toast.promise(
                axios.post('/api/course', {courseName, courseDescription, id_user}),
                {
                  pending: "Подождите пожалуйста...",
                  success: "Данные успешно загружены 👍",
                  error: "Произошла ошибка, попробуйте ещё раз"
                }
            );

        } catch (error) {
            toast.error('Error add course')
        }finally{
            setCourseName('');
            setCourseDescription('');
            setIsLoading(false);
        }
    }   

    return(
        <section className="flex">
            <SideBarComponent />
            <section className="container flex flex-col mt-10 mx-auto">
                <BreadCrumbsComponent id={id} pathname={pathname}/>
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
                            className="mt-5" 
                            type="text" 
                            variant="bordered"
                            label="Название урока" 
                            placeholder="Введите в это поле название курса"
                            labelPlacement="outside"
                            onValueChange={handleChangeName}
                        />
                        <Textarea
                            minRows={2}
                            maxRows={22}
                            className="mt-5"
                            variant="bordered"
                            label="Описание урока"
                            labelPlacement="outside"
                            placeholder="Введите описание курса"
                            onValueChange={handleChangeDescription}
                        />
                        <div className="flex justify-end mt-5">
                        {
                            isLoading 
                            ?(<Button color="primary" type="submit" isLoading={isLoading}>Создать</Button>)
                            :(<Button color="primary" type="submit">Создать</Button>)
                        }
                        </div> 
                    </form>
                </div>
            </section>
        </section>
    )
}