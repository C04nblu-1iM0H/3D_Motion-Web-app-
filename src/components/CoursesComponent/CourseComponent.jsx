import React from 'react';
import 'react-quill/dist/quill.snow.css';

export default function CourseComponent({course}) {
    const {course_name, course_description} = course;
    const CourseContentDisplay = ({ content }) => {
        return (
            <div className="quill-content" dangerouslySetInnerHTML={{ __html: content }} />
        );
    };
    return(
        <div className="w-full bg-layout rounded-xl mt-10">
            <div className="flex flex-col mt-10">
                <div className='w-full'>
                    <h1 className="font-bold text-2xl text-center">{course_name}</h1>
                </div>
                <div className="px-20 pt-10 pb-20 ql-editor">
                    {course_description && <CourseContentDisplay content={course_description} />}
                </div>
            </div>
        </div>
    );
}