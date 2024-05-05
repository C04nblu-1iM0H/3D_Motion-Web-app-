'use client'
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { redirect } from "next/navigation";
import Home from '@/components/Home/Home';
import './page.css';
import SpinnerWithBackdrop from "@/components/Button/Spinner";
import { setEmail, setId, setUserRole } from "@/store/userSlice";
import { setUserData } from "@/store/userProfileSlice";

export default function App() {
  const dispatch = useDispatch()
  const { data: session, status } = useSession();
  useEffect(() => {
      const fetchData = async () => {
          try {
              if(status === 'authenticated') {
                  const {email} = session.user
                  const response = await axios.post('/api/getUserData', {email});
                  if(response.status === 200){
                      dispatch(setId(response.data.resultUser[0].id));
                      dispatch(setEmail(response.data.resultUser[0].email));
                      dispatch(setUserRole(response.data.resultUser[0].id_role));
                      dispatch(setUserData(response.data.userData[0]));
                  }
              }
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
      fetchData();
  }, [status, session]);

  if(status === 'loading'){return <SpinnerWithBackdrop isLoading={true}/>;}
  if(status === 'unauthenticated'){return redirect('/Signin');}
  return ( 
    <>
      <Home/>
    </>

  );
}