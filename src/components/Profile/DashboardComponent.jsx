import CompletedCoursesCount from "./CompletedCoursesCount";
import CountLessonsCompleted from "./CountLessonsCompleted";
import StatisticsAboutLessons from "./StatisticsAboutLessons";

export default function DashboardComponent({courses, lessons, lessonsCompleted, coursesCompleted, statisticsAboutLessons}) {
    return(
        <div className="flex flex-col w-full">
            <div className="w-1/2">
                <div className="flex">
                    <CountLessonsCompleted  lessons={lessons} completed={lessonsCompleted}/>
                    <CompletedCoursesCount courses={courses} completed={coursesCompleted}/>
                </div>
            </div>
            <StatisticsAboutLessons statistics={statisticsAboutLessons} />
        </div>
    );
}