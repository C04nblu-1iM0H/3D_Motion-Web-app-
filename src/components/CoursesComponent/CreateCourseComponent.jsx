import { setCourseDescription, setCourseName } from "@/store/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import {Input, Textarea, Button} from "@nextui-org/react";
import { useState } from "react";

import SideBarComponent from "../AdminComponent/components/SideBarComponent";
import { ToastContainer } from 'react-toastify';
import { IoCreateOutline } from "react-icons/io5";
import { GrDownload } from "react-icons/gr";
import 'react-toastify/dist/ReactToastify.css';
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";
import FormatTextComponent from "./FormatTextComponent";

export default function CreateCourseComponent({handleCreateCourse}){
    const role = useSelector(state => state.user.role);
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.course.loading);
    const [file, setFile] = useState(null);

    const handleChangeName = (value) => dispatch(setCourseName(value));
    const handleChangeDescription = (value) => dispatch(setCourseDescription(value));
    const handleFileChange = (event) => setFile(event.target.files[0]);
    
    const onSubmit = (e) => {
        handleCreateCourse(e, file);
    };

    return(
        <section className="flex">
            {role !== 1 ? <ProfileAvatar/> : <SideBarComponent /> }
            <section className="container">
                <ToastContainer />
                <div className="w-4/5 bg-layout mx-auto min-h-fit flex flex-col flex-1 mt-11 border-2 border-solid border-zinc-600 rounded-xl">
                    <div className="bg-layout w-1/3 mx-auto text-center my-5">
                        <div className="flex items-center justify-center">
                                <IoCreateOutline className="w-6 h-6"/>
                                <h1 className="p-2 text-xl">Создание курса</h1>
                        </div>
                    </div>  
                    <form className="px-10 pb-5 h-max flex flex-col justify-between" onSubmit={onSubmit}>
                        <Input 
                            size="md"
                            className="mt-5" 
                            type="text" 
                            variant="bordered"
                            label="Название курса" 
                            placeholder="Введите в это поле название курса"
                            labelPlacement="outside"
                            onValueChange={handleChangeName}
                        />
                        {/* <Textarea
                            minRows={2}
                            maxRows={22}
                            className="mt-5"
                            variant="bordered"
                            label="Описание курса"
                            labelPlacement="outside"
                            placeholder="Введите описание курса"
                            onValueChange={handleChangeDescription}
                        /> */}
                        <FormatTextComponent handleChangeDescription={handleChangeDescription}/>
                        <div className="flex justify-end items-center mt-5">
                            <div className="mr-3">
                                <label className=" flex items-center border-2 border-solid border-green-700 rounded-xl p-2 cursor-pointer hover:bg-success-200 transition duration-200 ease-in-out">
                                    <GrDownload  className="mr-2"/>
                                    <input type="file" className="hidden" onChange={handleFileChange}/>
                                    <span>Загрузить фото курса</span>
                                </label>
                            </div>
                            <div>
                            {
                                isLoading 
                                ?(<Button color="primary" type="submit" isLoading={isLoading}>Добавить</Button>)
                                :(<Button color="primary" type="submit">Добавить</Button>)
                            }
                            </div> 
                        </div>
                    </form>
                </div>
            </section>
        </section>
    );
}