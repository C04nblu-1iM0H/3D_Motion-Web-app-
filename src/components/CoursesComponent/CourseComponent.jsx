export default function CourseComponent({course}) {
    const {course_name, course_description} = course;
    return(
        <div className="w-full bg-layout rounded-xl mt-10">
            <div className="flex flex-col items-center mt-10">
                <div>
                    <h1 className="font-bold text-2xl">{course_name}</h1>
                </div>
                <div className="px-20 pt-10 pb-20">
                    <p>{course_description}</p>
                </div>
            </div>
        </div>
    );
}