import {Progress} from "@nextui-org/react";

export default function StatisticsAboutLessons({statistics}) {
    return(
        <div className="flex flex-col w-4/5 p-5 h-fit ml-16 mt-10 bg-layout rounded-md">
            <h3 className="text-center">Статистика</h3>
            {statistics.length > 0 
                ?(statistics.map(({id,course_name, count_lesson, completed_lesson}) =>(
                    <Progress
                        key={id}
                        aria-label="Loading..."
                        size="md"
                        value={ (completed_lesson/count_lesson) * 100 }
                        color={completed_lesson < count_lesson ? 'warning' : 'success' }
                        label={course_name}
                        showValueLabel={true}
                        className="w-4/6 my-4"
                    />
                ))
            ):(
                <p>Данные отсуствуют</p>
            )}
        </div>
    );
}