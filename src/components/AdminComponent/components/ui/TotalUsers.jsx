import { FaUsers } from "react-icons/fa";
import {Progress} from "@nextui-org/react";
import {useSelector} from 'react-redux';

export default function TotalUsers(){
    const totalUser = useSelector(state => state.adminPanelInfo.totalUser);
    return(
        <div className="flex flex-col w-80 p-5 h-32 ml-16 mt-10 bg-layout rounded-md">
            <h3>Всего пользователей</h3>
            <div className="flex items-center mt-3">
                <FaUsers  className="w-10 h-10" />
                <div className="flex flex-col ml-4 w-full">
                    <Progress
                        aria-label="Loading..."
                        size="md"
                        value={totalUser}
                        color={totalUser <= 100 ? 'danger' : totalUser <= 1000 ? 'warning' : 'success'}
                        label={totalUser}
                        showValueLabel={true}
                    />
                </div>
            </div>
        </div>
    );
}