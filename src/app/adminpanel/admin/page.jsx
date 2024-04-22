import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from "react";
import AdminComponent from '@/components/AdminComponent/AdminComponent';
import { setCountUsers, setCountUsersOnline } from '@/store/userSlice';
import SpinnerWithBackdrop from '@/components/Button/Spinner';

export default function Admin() {
    const dispatch = useDispatch();

    const onlineUsersCount =  useSelector(state => state.regUser.isOnlineCount);
    const countUsers = useSelector(state => state.regUser.countUsers);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/getDataInfo');
                console.log(response);
                if(response.status === 200){
                    dispatch(setCountUsersOnline(response.data.onlineUsersCount))
                    dispatch(setCountUsers(response.data.countUsers))
                }else{
                    console.error('Данные не получены');
                }
            } catch (error) {
                console.error("Error fetching user count:", error);
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            {onlineUsersCount !== null && countUsers !== null ? (
                <AdminComponent />
            ) : (
                <SpinnerWithBackdrop isLoading={true}/>
            )}
        </div>
    );
}
