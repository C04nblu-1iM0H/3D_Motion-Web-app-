import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';
import './style.css'


const ReactQuill = dynamic(() => import("react-quill"), {
    ssr: false
});

export default function FormatTextForUpdateLessonComponent({handleDescription, handleMaterial}){
    const descriptions = useSelector(state => state.lesson.lessonDescription);
    const materials = useSelector(state => state.lesson.lessonMaterials);
    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'color': [] }],
            [{ 'align': [] }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['image',],
        ],
    };
    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'color',
        'align',
        'list', 'bullet',
        'indent',
        'image',
    ];
    return(
        <div className="flex flex-col">
            <p className="mt-5">Описание урока</p>    
            <ReactQuill
                className="my-4 dark:border-secondary-40 border-gray-500 rounded-md text-gray-800 dark:text-white text-md"
                placeholder='Введите описание информационного ресурса'
                value={descriptions}
                onChange={handleDescription}
                modules={modules}
                formats={formats}
                theme="snow"
            />
            <p className="mt-5">Материалы урока</p>  
            <ReactQuill
                className="my-4 dark:border-secondary-40 border-gray-500 rounded-md text-gray-800 dark:text-white text-md"
                placeholder='Введите описание информационного ресурса'
                value={materials}
                onChange={handleMaterial}
                modules={modules}
                formats={formats}
                theme="snow"
            /> 
        </div>

    );
}
