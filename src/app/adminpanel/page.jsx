'use client'
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from "react";
import { useQuery } from '@tanstack/react-query';

import SpinnerWithBackdrop from '@/components/Button/Spinner';
import AdminDataComponent from '@/components/AdminComponent/components/AdminDataComponent';
import SideBarComponent from '@/components/AdminComponent/components/SideBarComponent';
import UserTable from '../usertable/page';
import { setTotalCourse, setTotalUsers, setTotalUsersOnline } from '@/store/adminPanelSlice';
import { redirect } from 'next/navigation';

export default function Admin() {
    const dispatch = useDispatch();
    const role = useSelector(state => state.user.role)
    const menuComponent = useSelector(state => state.panel.panel);

    const { data, isSuccess , isLoading, isError } =  useQuery({
        queryKey: ['adminData'],
        queryFn: ({ signal }) => axios.get('/api/getDataInfo', {signal}),
    })
    
    useEffect(() => {
      if (isSuccess) {
        dispatch(setTotalUsersOnline(data.data.onlineUsersCount));
        dispatch(setTotalUsers(data.data.countUsers));
        dispatch(setTotalCourse(data.data.totalCourse[0].id_course));
      }
    }, [isSuccess, data]);

    if (isLoading) return <SpinnerWithBackdrop isLoading={true} />;
    if (isError) {
      console.error('Failed to fetch admin data:', isError);
      return null;
    }

    if(role !== 1){
      redirect('/');
    }
  
    return (
        <section className="w-full flex">
            <SideBarComponent />
            { menuComponent === 'dashboard' && <AdminDataComponent />}
            { menuComponent === 'usertable' && <UserTable />}
        </section>
    );
}

