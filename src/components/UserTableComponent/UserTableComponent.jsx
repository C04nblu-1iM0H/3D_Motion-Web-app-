import { useMemo, useState } from "react";
import dynamic from 'next/dynamic'
import {
    Table, 
    TableHeader,
    TableColumn, 
    TableBody, 
    TableRow, 
    TableCell, 
    Chip, 
    Tooltip,
    Pagination,
    Input,
} from "@nextui-org/react";

import { FaRegEye } from "react-icons/fa6";
import { LiaEdit } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineNumbers } from "react-icons/md";
import SpinnerWithBackdrop from "@/components/Button/Spinner";

const ViewComponent = dynamic(() => import('../../app/adminpanel/usertable/view'), {
    loading: () => <FaRegEye  className="w-5 h-5 mr-6" />,
});
const EditComponent = dynamic(() => import('../../app/adminpanel/usertable/edit'), {
    loading: () => <LiaEdit  className="w-5 h-5 mr-6" />,
});
const DeleteComponent = dynamic(() => import('../../app/adminpanel/usertable/delete'), {
    loading: () => <RiDeleteBin6Line className="w-5 h-5 " />,
});

export default function UserTableComponent({users}) {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const rowsPerPage = 4;
    const pages = Math.ceil(users.length / rowsPerPage);

    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, users]);


    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
    
        return filteredUsers.slice(start, end);
    }, [page, filteredUsers]);
    return(
        <div>
            <Input 
                type="text"
                size="md"
                placeholder="Поиск по почте"
                startContent={
                    <IoSearchOutline />
                }
                className="w-1/5 my-6"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Table 
                aria-label="Example table with custom cells"
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="secondary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }
            >
                <TableHeader>
                    <TableColumn><MdOutlineNumbers className="w-5 h-5 " /></TableColumn>
                    <TableColumn>EMAIL</TableColumn>
                    <TableColumn>PASSWORD</TableColumn>
                    <TableColumn>ROLE</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn><span className="flex justify-center">ACTIONS</span></TableColumn>
                </TableHeader>
                <TableBody loadingContent={<SpinnerWithBackdrop label="Loading..." />}>
                    {items.map(({id, email, password, id_role, id_online, user_data}, index) => (
                    <TableRow key={id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell>{password}</TableCell>
                    <TableCell>{id_role === 1 ? 'Администратор ' : id_role === 2 ? 'Преподаватель' : 'Студент'}</TableCell>
                    <TableCell>
                        <Chip className="capitalize" color={id_online === 0 ? "warning" : "success"} size="sm" variant="flat">
                        {id_online === 0 ? 'offline' : 'online'}
                        </Chip>
                    </TableCell>
                    <TableCell>
                        <div className="relative flex items-center justify-center">
                            <Tooltip color="primary" content="View user">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <ViewComponent 
                                    email={email} 
                                    username={user_data.username} 
                                    surname={user_data.surname} 
                                    gender={user_data.gender_name} 
                                    data_birthday={user_data.data_birthday}
                                    telephone={user_data.telephone}
                                />
                            </span>
                            </Tooltip>
                            <Tooltip color="warning" content="Edit user">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditComponent userid={id} email={email} password={password} user_role={id_role}/>
                            </span>
                            </Tooltip>
                            <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteComponent userid={id}/>
                            </span>
                            </Tooltip>
                        </div>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
    )   
}