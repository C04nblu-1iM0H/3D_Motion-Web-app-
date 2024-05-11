'use client'
import { useEffect } from "react";
import { useSelector} from "react-redux";
import axios from "axios";
import { redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";
import {Progress,} from "@nextui-org/react";
import { FaUsers } from "react-icons/fa";

import Image from "next/image";
import UserGoogleTableComponent from "@/components/UserTableComponent/UserGoogleTableComponent";
import { useQuery } from "@tanstack/react-query";


export default function GoogleTable() {
  const userrole = useSelector(state => state.user.role);
  if(userrole !== 1)redirect('/');

  const {isSuccess, data, isLoading, isError} = useQuery({
    queryKey: ['userDataGoogle'],
    queryFn: async ({signal}) => await axios.get('/api/googlecrud', {signal}),
  })

  useEffect(() => {
    if (isError) {
      console.error('Error fetching data:', isError);
    }
  }, [isError]);

  const users = isSuccess ? data.data.allUsersGoogle : [];
  return(
      <section className="container h-screen ml-8">
          <ToastContainer/>
          <div className="bg-layout w-1/4 mx-auto text-center my-5 rounded-xl shadow-xl">
            <div className="flex items-center justify-center">
              <FaUsers />
              <h1 className="p-3">Список всех пользователей</h1>
            </div>  
          </div>
          {isLoading && users.length === 0 ? (
            <section className="w-full flex flex-col items-center justify-center mt-20">
              <Progress
              size="md"
              isIndeterminate
              aria-label="Loading..."
              className="max-w-md"
              />
            </section>
          ) :  users.length === 0 ?(
            <Image
                alt="no data"
                src={'/adminpanel/no_user_data.svg'}
                width={500}
                height={500}
                quality={100}
                priority={true}
                className="mx-auto"
            />
          ):(
            <div className="flex items-center justify-center">
                <UserGoogleTableComponent users={users}/>
            </div>
          )}
    </section>
  );
}