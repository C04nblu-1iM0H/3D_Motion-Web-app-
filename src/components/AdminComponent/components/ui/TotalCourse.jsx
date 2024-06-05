import { MdLibraryBooks } from "react-icons/md";
import {Progress} from "@nextui-org/react";
import {useSelector} from 'react-redux';

export default function TotalCourse(){
    const totalCourse = useSelector(state => state.adminPanelInfo.totalCourse);
    // const totalCourse = 1;
    // console.log(totalCourse);
    return(
        <div className="flex flex-col w-80 p-5 h-32 ml-16 mt-10 bg-layout rounded-md">
            <h3>Всего курсов</h3>
            <div className="flex items-center mt-3">
                <MdLibraryBooks  className="w-10 h-10" />
                <div className="flex flex-col ml-4 w-full">
                    <Progress
                        aria-label="Loading..."
                        size="md"
                        value={totalCourse}
                        color={totalCourse <= 20 ? 'danger' : value <= 40 ? 'warning' : 'success'}
                        label={totalCourse}
                        showValueLabel={true}
                    />
                </div>
            </div>
        </div>
    );
}