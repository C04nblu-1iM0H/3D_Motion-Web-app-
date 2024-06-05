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
      queryFn: async ({ signal }) => {
        const response = await axios.get('/api/getDataInfo', {signal});
        return response.data;
      }
  });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setTotalUsersOnline(data.onlineUsersCount));
      dispatch(setTotalUsers(data.countUsers));
      dispatch(setTotalCourse(data.totalCourse));
    }
  }, [isSuccess, data, dispatch]);

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

