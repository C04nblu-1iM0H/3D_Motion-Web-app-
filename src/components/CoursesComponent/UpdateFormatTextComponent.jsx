import React from "react";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import("react-quill"), {
    ssr: false
});
const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'color': [] }],
        [{ 'align': [] }],
        [{ 'indent': '-1' }, { 'indent': '+1' }], // Добавить отступы
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
export default function UpdateFormatTextComponent({handleChangeDescription, currentCourseDescription}){
    return(
        <div className="flex flex-col">
            <p className="mt-5">Описание ресурса</p>
            <ReactQuill
            className="mt-5"
            placeholder='Введите описание информационного ресурса'
            value={currentCourseDescription}
            onChange={handleChangeDescription}
            modules={modules}
            formats={formats}
            theme="snow"
        />
        </div>
        
        
    );
}