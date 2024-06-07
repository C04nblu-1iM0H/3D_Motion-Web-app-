'use client'
import { useEffect } from "react";
import { useSelector} from "react-redux";
import axios from "axios";
import { redirect } from "next/navigation";
import { useQuery } from '@tanstack/react-query';
import Image from "next/image";

import { ToastContainer } from "react-toastify";
import { Progress } from "@nextui-org/react";
import { FaUsers } from "react-icons/fa";
import UserTableComponent from "@/components/UserTableComponent/UserTableComponent";
import SideBarComponent from "@/components/AdminComponent/components/SideBarComponent";


export default function UserTable() {
  const userrole = useSelector(state => state.user.role);
  if(userrole !== 1)redirect('/');

  const {isSuccess, data, isLoading, isError} =  useQuery({
    queryKey: ['userData'],
    queryFn: async ({signal}) => await axios.get('/api/crud', {signal}),
  })

  useEffect(() => {
    if (isError) {
      console.error('Error fetching data:', isError);
    }
  }, [isError]);

  const users = isSuccess ? data.data.allUsers : [];
  
  return(
      <section className="w-full flex">
        <SideBarComponent />
        <ToastContainer/>
        <section className="flex flex-col items-center container">
          <div className="bg-layout w-1/4 mx-auto text-center my-5 rounded-xl shadow-xl">
            <div className="flex items-center justify-center">
              <FaUsers />
              <h1 className="p-3">Список всех пользователей</h1>
            </div>  
          </div>

          {isLoading && users.length === 0 ? (  // Показываем Loader, если данные еще загружаются или не загружены
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
            <UserTableComponent users={users}/>
          )}
        </section>
      </section>
  );
}