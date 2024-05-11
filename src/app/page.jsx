'use client'
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import Home from '@/components/Home/Home';
import SpinnerWithBackdrop from "@/components/Button/Spinner";
import { setEmail, setId, setUserRole } from "@/store/userSlice";
import { setUserData } from "@/store/userProfileSlice";

export default function App() {
  const dispatch = useDispatch()
  const { data: session, status } = useSession();
  const email = useSelector(state => state.user.email);

  const {isSuccess, data, isLoading} = useQuery({
    queryKey:['initialUser'],
    queryFn: async  ({signal}) => {
      const response = await axios.get('/api/getUserData', {
        headers:{email: session?.user?.email}, 
        signal
      });
      return response.data;
    },
    enabled: status === 'authenticated',
  })

  useEffect(() => {
    if (status === 'authenticated' &&  isSuccess && data && data.resultUser && data.resultUser.length > 0) {
      dispatch(setId(data.resultUser[0].id));
      dispatch(setEmail(data.resultUser[0].email));
      dispatch(setUserRole(data.resultUser[0].id_role));
      dispatch(setUserData(data.userData[0]));
    }else{
      return;
    }
  }, [status, isSuccess, data]);

  useEffect(()=>{
    if(email){
      mutation.mutate({email});
    }
  }, [email])

  const mutation = useMutation({
    mutationFn: async ({email, signal}) => await axios.put('/api/installOnline', {email, logout:false, signal}),
  });

  if (status === 'loading' || isLoading || mutation.isPending) {
    return <SpinnerWithBackdrop isLoading={true} />;
  }
  return ( 
    <>
      <Home/>
    </>

  );
}