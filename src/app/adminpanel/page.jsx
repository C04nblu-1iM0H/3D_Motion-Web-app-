'use client'
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from "react";

import SpinnerWithBackdrop from '@/components/Button/Spinner';
import AdminDataComponent from '@/components/AdminComponent/components/AdminDataComponent';
import SideBarComponent from '@/components/AdminComponent/components/SideBarComponent';
import UserTable from '../usertable/page';
import GoogleTable from '../googletable/page';
import { setTotalCourse, setTotalUsers, setTotalUsersOnline } from '@/store/adminPanelSlice';

export default function Admin() {
    const dispatch = useDispatch();
    const onlineUsersCount =  useSelector(state => state.adminPanelInfo.isOnlineCount);
    const totalUser = useSelector(state => state.adminPanelInfo.totalUser);
    const totalCourse = useSelector(state => state.adminPanelInfo.totalCourse);
    const menuComponent = useSelector(state => state.panel.panel);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/getDataInfo');
                if(response.status === 200){
                    dispatch(setTotalUsersOnline(response.data.onlineUsersCount));
                    dispatch(setTotalUsers(response.data.countUsers));
                    dispatch(setTotalCourse(response.data.totalCourse[0].id_course));
                }else{
                    console.error('Данные не получены');
                }
            } catch (error) {
                console.error("Error fetching user count:", error);
            }
        };
        fetchData();
    }, []);

    if(onlineUsersCount === null && totalUser === null && totalCourse === null) return <SpinnerWithBackdrop isLoading={true}/>
    return (
        <section className="w-full flex">

            <SideBarComponent />
            { menuComponent === 'dashboard' && <AdminDataComponent />}
            { menuComponent === 'usertable' && <UserTable />}
            { menuComponent === 'googletable' && <GoogleTable />}
        </section>
    );
}

