import { BsPersonLinesFill } from "react-icons/bs";
import {Progress} from "@nextui-org/react";
import { useEffect, useState } from "react";
import {useSelector} from 'react-redux';

export default function OnlineUsers(){
    const [value, setValue] = useState(0);
    
    const onlineUsersCount =  useSelector(state => state.adminPanelInfo.isOnlineCount);
    const totalUser = useSelector(state => state.adminPanelInfo.totalUser);
    // const onlineUsersCount = 1;
    // const totalUser =1;
    useEffect(() => {
        if (totalUser > 0) {
            const percentage = (onlineUsersCount / totalUser) * 100;
            setValue(percentage);
        }
    }, [onlineUsersCount, totalUser]);
    return(
        <div className="flex flex-col w-80 p-5 h-32 ml-16 mt-10 bg-layout rounded-md">
            <h3>Сейчас онлайн пользователей</h3>
            <div className="flex items-center mt-3">
                <BsPersonLinesFill className="w-10 h-10" />
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