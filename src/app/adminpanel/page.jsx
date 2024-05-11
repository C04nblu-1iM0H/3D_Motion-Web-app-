'use client'
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from "react";
import { useQuery } from '@tanstack/react-query';

import SpinnerWithBackdrop from '@/components/Button/Spinner';
import AdminDataComponent from '@/components/AdminComponent/components/AdminDataComponent';
import SideBarComponent from '@/components/AdminComponent/components/SideBarComponent';
import UserTable from '../usertable/page';
import GoogleTable from '../googletable/page';
import { setTotalCourse, setTotalUsers, setTotalUsersOnline } from '@/store/adminPanelSlice';

export default function Admin() {
    const dispatch = useDispatch();
    const menuComponent = useSelector(state => state.panel.panel);

    const { data, isLoading, isError } =  useQuery({
        queryKey: ['adminData'],
        queryFn: ({ signal }) => axios.get('/api/getDataInfo', {signal,}),
    })

    useEffect(() => {
      if (data) {
        dispatch(setTotalUsersOnline(data.data.onlineUsersCount));
        dispatch(setTotalUsers(data.data.countUsers));
        dispatch(setTotalCourse(data.data.totalCourse[0].id_course));
      }
    }, [data, dispatch]);

    if (isLoading) return <SpinnerWithBackdrop isLoading={true} />;
    if (isError) {
      console.error('Failed to fetch admin data:', isError);
      return null;
    }
  
    return (
        <section className="w-full flex">
            <SideBarComponent />
            { menuComponent === 'dashboard' && <AdminDataComponent />}
            { menuComponent === 'usertable' && <UserTable />}
            { menuComponent === 'googletable' && <GoogleTable />}
        </section>
    );
}

