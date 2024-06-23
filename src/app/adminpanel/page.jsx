'use client'
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import SpinnerWithBackdrop from '@/components/Button/Spinner';
import AdminDataComponent from '@/components/AdminComponent/components/AdminDataComponent';
import SideBarComponent from '@/components/AdminComponent/components/SideBarComponent';
import { setTotalCourse, setTotalUsers, setTotalUsersOnline } from '@/store/adminPanelSlice';


export default function Admin() {
  const dispatch = useDispatch();
  const role = useSelector(state => state.user.role);
  const [countUserOnline, setCountUserOnlineInDay] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (role !== 1) {
      router.push('/');
    }
  }, [role, router]);

  const { data, isSuccess , isLoading, isError } =  useQuery({
      queryKey: ['adminData'],
      queryFn: async ({ signal }) => {
        const response = await axios.get('/api/favourites', {signal});
        return response.data;
      },
      enabled: role === 1
  });
  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setTotalUsersOnline(data.onlineUsersCount));
      dispatch(setTotalUsers(data.countUsers));
      dispatch(setTotalCourse(data.totalCourse));
      setCountUserOnlineInDay(data.formattedCountOnlineInDay);
    }
  }, [isSuccess, data, dispatch]);

  if (isLoading) return <SpinnerWithBackdrop isLoading={true} />;
  if (isError) {
    console.error('Failed to fetch admin data:', isError);
    return null;
  }
  
  return (
      <section className="w-full flex">
          <SideBarComponent />
          <AdminDataComponent countUserOnline={countUserOnline}/>
      </section>
  );
}

