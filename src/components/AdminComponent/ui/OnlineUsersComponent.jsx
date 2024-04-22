import { BsPersonLinesFill } from "react-icons/bs";
import {Progress} from "@nextui-org/react";
import { useEffect, useState } from "react";
import {useSelector} from 'react-redux';

export default function OnlineUsersComponent(){
    const [value, setValue] = useState(0);
    
    const onlineUsersCount =  useSelector(state => state.regUser.isOnlineCount);
    const countUsers = useSelector(state => state.regUser.countUsers);

    useEffect(() => {
        if (countUsers > 0) {
            const percentage = (onlineUsersCount / countUsers) * 100;
            setValue(percentage);
        }
    }, [onlineUsersCount, countUsers]);
    return(
        <div className="flex flex-col w-80 p-5 h-32 ml-16 mt-10 bg-layout rounded-md">
            <h3>Сейчас онлайн пользователей</h3>
            <div className="flex items-center mt-3">
                <BsPersonLinesFill className="w-11 h-11" />
                <div className="flex flex-col ml-4 w-full">
                    <Progress
                        aria-label="Loading..."
                        size="md"
                        value={value}
                        color={value <= 25 ? 'danger' : value <= 50 ? 'warning' : 'success'}
                        label={onlineUsersCount}
                        showValueLabel={true}
                    />
                </div>
            </div>
        </div>
    );
}