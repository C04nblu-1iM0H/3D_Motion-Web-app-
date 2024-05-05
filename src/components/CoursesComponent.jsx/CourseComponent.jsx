export default function CourseComponent({course}) {
    return(
        <section className="w-full bg-layout rounded-xl mt-10">
            {
                course.map( item =>(
                    <section key={item.id} className="flex flex-col items-center mt-10">
                        <div>
                            <h1 className="font-bold text-2xl">{item.course_name}</h1>
                        </div>
                        <section className="px-20 pt-10 pb-20">
                            <p>{item.course_description}</p>
                        </section>
                    </section>
                ))
            }
        </section>
    );
}