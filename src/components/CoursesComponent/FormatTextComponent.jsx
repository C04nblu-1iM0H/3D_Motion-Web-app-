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
    'image',
];
export default function FormatTextComponent({handleChangeDescription}){
    return(
       
        <div className="flex flex-col">
            <p className="mt-5">Описание ресурса</p>    
            <ReactQuill
                className="mt-5"
                placeholder='Введите описание информационного ресурса'
                onChange={handleChangeDescription}
                modules={modules}
                formats={formats}
            />
        </div>
    );
}