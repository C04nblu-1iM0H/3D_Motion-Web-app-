import { setCourseDescription, setCourseName } from "@/store/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import {Input, Textarea, Button} from "@nextui-org/react";
import { useState } from "react";

import SideBarComponent from "../AdminComponent/components/SideBarComponent";
import { ToastContainer } from 'react-toastify';
import { IoCreateOutline } from "react-icons/io5";
import 'react-toastify/dist/ReactToastify.css';
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";
import FormatTextComponent from "./FormatTextComponent";
import ImageUploadComponent from "./ImageUploadComponent";

export default function CreateCourseComponent({handleCreateCourse}){
    const role = useSelector(state => state.user.role);
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.course.loading);
    const [file, setFile] = useState(null);
    const [fileInfo, setFileInfo] = useState({ name: '', size: 0 });
    
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileInfo({
                name: selectedFile.name,
                size: (selectedFile.size / 1024 / 1024).toFixed(2),
            });
        }
    };


    const handleChangeName = (value) => dispatch(setCourseName(value));
    const handleChangeDescription = (value) => dispatch(setCourseDescription(value));
    
    const onSubmit = (e) => {
        handleCreateCourse(e, file);
    };

    return(
        <section className="flex">
            {role !== 1 ? <ProfileAvatar/> : <SideBarComponent /> }
            <section className="container">
                <ToastContainer />
                <div className="w-4/5 bg-layout mx-auto min-h-fit flex flex-col flex-1 mt-11 border-2 border-solid border-zinc-20 rounded-xl">
                    <div className="bg-layout w-1/3 mx-auto text-center my-5">
                        <div className="flex items-center justify-center">
                                <IoCreateOutline className="w-6 h-6"/>
                                <h1 className="p-2 text-xl">Создание электронного ресурса</h1>
                        </div>
                    </div>  
                    <form className="px-10 pb-5 h-max flex flex-col justify-between" onSubmit={onSubmit}>
                        <Input 
                            size="md"
                            className="mt-5" 
                            type="text" 
                            variant="bordered"
                            label="Название ресурса" 
                            placeholder="Введите в это поле название ресурса"
                            labelPlacement="outside"
                            onValueChange={handleChangeName}
                        />
                        <FormatTextComponent handleChangeDescription={handleChangeDescription}/>
                        <div className="flex justify-between items-center mt-5">
                            <ImageUploadComponent 
                                fileInfo={fileInfo} 
                                file={file} 
                                setFile={setFile} 
                                setFileInfo={setFileInfo} 
                                handleFileChange={handleFileChange}
                            />
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