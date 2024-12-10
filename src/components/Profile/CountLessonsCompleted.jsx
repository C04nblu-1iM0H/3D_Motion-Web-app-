import { BsPersonLinesFill } from "react-icons/bs";
import {Progress} from "@nextui-org/react";

export default function CountLessonsCompleted({lessons, completed}) {
    const half = Math.ceil(lessons/2);
    const quarter = Math.ceil(lessons/4);
    return(
        <div className="flex flex-col w-80 p-5 h-32 ml-16 mt-10 bg-layout rounded-md">
            <h3>Пройденых уроков</h3>
            <div className="flex items-center mt-3">
                <BsPersonLinesFill className="w-10 h-10" />
                <div className="flex flex-col ml-4 w-full">
                    <Progress
                        aria-label="Loading..."
                        size="md"
                        value={(completed/lessons) * 100}
                        color={completed <= quarter ? 'danger' : completed <= half ? 'warning' : 'success'}
                        label={completed}
                        showValueLabel={true}
                    />
                </div>
            </div>
        </div>
    );
}