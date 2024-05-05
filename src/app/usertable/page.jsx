'use client'
import { useState, useEffect, useCallback } from "react";
import { useSelector} from "react-redux";
import axios from "axios";
import { redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";
import {
    Table, 
    TableHeader,
    TableColumn, 
    TableBody, 
    TableRow, 
    TableCell, 
    User, 
    Chip, 
    Tooltip,
    Progress 
} from "@nextui-org/react";
import { FaUsers } from "react-icons/fa";

import { columns } from "@/const";
import EditComponent from "./edit";
import DeleteComponent from "./delete";
import ViewComponent from "./view";


export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userrole = useSelector(state => state.user.role);
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
      const fetchData = async () => {
          try {
              setIsLoading(true)
              const response = await axios.get('/api/crud');
              setUsers(response.data.allUsers);
          } catch (error) {
              console.error('Error fetching data:', error);

          }finally{
            setIsLoading(false)
          }
      };
      fetchData();
      if(isSuccess){
        fetchData();
        setIsSuccess(false);
      }
  }, [isSuccess]);

  const handleSuccess = () => {
    setIsSuccess(true);
  };

  const renderCell = useCallback((user, columnKey) => {
      const cellValue = user[columnKey];
      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{radius: "lg", src: user.avatar}}
              description={user.email}
              name={cellValue}
            >
              {user.email}
            </User>
          );
        case "role":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
              <p className="text-bold text-sm capitalize text-default-400">{user.id_role === 1 ? 'Администратор ' : user.id_role === 2 ? 'Преподаватель' : 'Студент'}</p>
            </div>
          );
        case "status":
          return (
            <Chip className="capitalize" color={user.id_online === 0 ? "warning" : "success"} size="sm" variant="flat">
              {user.id_online === 0 ? 'offline' : 'online'}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center">
              <Tooltip color="primary" content="View user">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <ViewComponent 
                    email={user.email} 
                    username={user.username} 
                    surname={user.surname} 
                    gender={user.gender_name} 
                    data_birthday={user.data_birthday}
                    telephone={user.telephone}
                  />
                </span>
              </Tooltip>
              <Tooltip color="warning" content="Edit user">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditComponent userid={user.id} email={user.email} password={user.password} user_role={user.id_role} onSuccess={handleSuccess}/>
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteComponent userid={user.id} onSuccess={handleSuccess}/>
                </span>
              </Tooltip>
            </div>
          );
        default: return cellValue;
      }
  }, []);

  if(userrole !== 1){return redirect('/');}
    return(
        <section className="container h-screen ml-8">
          <ToastContainer/>
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
            <Table aria-label="Example table with custom cells">
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={users}>
                {(item) => (
                  <TableRow key={item.id}>
                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </section>
    );
}