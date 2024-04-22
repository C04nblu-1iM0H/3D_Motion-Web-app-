import { PiUserSquareLight } from "react-icons/pi";
import {Progress} from "@nextui-org/react";
import {useSelector} from 'react-redux';

export default function TotalUsersComponent(){
    const countUsers = useSelector(state => state.regUser.countUsers);

    return(
        <div className="flex flex-col w-80 p-5 h-32 ml-16 mt-10 bg-layout rounded-md">
            <h3>Всего пользователей</h3>
            <div className="flex items-center mt-3">
                <PiUserSquareLight className="w-10 h-10" />
                <div className="flex flex-col ml-4 w-full">
                    <Progress
                        aria-label="Loading..."
                        size="md"
                        value={countUsers}
                        color={countUsers <= 100 ? 'danger' : value <= 1000 ? 'warning' : 'success'}
                        label={countUsers}
                        showValueLabel={true}
                    />
                </div>
            </div>
        </div>
    );
}