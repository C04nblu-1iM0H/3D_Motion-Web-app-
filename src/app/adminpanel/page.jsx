'use client'
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from "react";

import { setCountUsers, setCountUsersOnline } from '@/store/userSlice';
import SpinnerWithBackdrop from '@/components/Button/Spinner';
import AdminDataComponent from '@/components/AdminComponent/components/AdminDataComponent';
import SideBarComponent from '@/components/AdminComponent/components/SideBarComponent';
import UserTable from '../usertable/page';


export default function Admin() {
    const dispatch = useDispatch();

    const onlineUsersCount =  useSelector(state => state.regUser.isOnlineCount);
    const countUsers = useSelector(state => state.regUser.countUsers);
    const menuComponent = useSelector(state => state.panel.panel);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/getDataInfo');
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

    if(onlineUsersCount === null && countUsers === null) return <SpinnerWithBackdrop isLoading={true}/>

    return (
        <section className="w-full flex">

            <SideBarComponent />
            { menuComponent === 'dashboard' && <AdminDataComponent />}
            { menuComponent === 'usertable' && <UserTable />}
        </section>
    );
}

