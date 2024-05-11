export default function CourseComponent({course}) {
    return(
        <div className="w-full bg-layout rounded-xl mt-10">
            {
                course.map(({id, course_name, course_description}) =>(
                    <div key={id} className="flex flex-col items-center mt-10">
                        <div>
                            <h1 className="font-bold text-2xl">{course_name}</h1>
                        </div>
                        <div className="px-20 pt-10 pb-20">
                            <p>{course_description}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}