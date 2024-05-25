'use client'
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useDispatch } from "react-redux";
import Home from '@/components/Home/Home';
import SpinnerWithBackdrop from "@/components/Button/Spinner";
import { setEmail, setId, setUserRole } from "@/store/userSlice";
import { setUserData } from "@/store/userProfileSlice";

export default function App() {
  const dispatch = useDispatch()
  const { data: session, status } = useSession();

  const {isSuccess, data, isLoading} = useQuery({
    queryKey:['initialUser'],
    queryFn: async ({signal}) => {
      const response = await axios.get(`/api/getUserData?email=${encodeURIComponent(session?.user?.email)}`, {signal});
      return response.data;
    },
    enabled: !!session?.user?.email 
  })
  useEffect(() => {
    if (status === 'authenticated' && isSuccess && data?.user?.length > 0 && data?.userData?.length > 0) {
      dispatch(setId(data.user[0].id));
      dispatch(setEmail(data.user[0].email));
      dispatch(setUserRole(data.user[0].id_role));
      dispatch(setUserData(data.userData[0]));
    } else {
      return;
    }
  }, [status, isSuccess, data, dispatch]);

  if (status === 'loading' || isLoading) {
    return <SpinnerWithBackdrop isLoading={true} />;
  }
  return ( 
    <>
      <Home/>
    </>

  );
}