import { useMemo, useState } from "react";
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

import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineNumbers } from "react-icons/md";
import SpinnerWithBackdrop from "@/components/Button/Spinner";
import ViewComponent from "@/app/usertable/view";
import EditComponent from "@/app/usertable/edit";
import DeleteComponent from "@/app/usertable/delete";

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
                    <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody loadingContent={<SpinnerWithBackdrop label="Loading..." />}>
                    {items.map((user, index) => (
                    <TableRow key={user.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.password}</TableCell>
                    <TableCell>{user.id_role === 1 ? 'Администратор ' : user.id_role === 2 ? 'Преподаватель' : 'Студент'}</TableCell>
                    <TableCell>
                        <Chip className="capitalize" color={user.id_online === 0 ? "warning" : "success"} size="sm" variant="flat">
                        {user.id_online === 0 ? 'offline' : 'online'}
                        </Chip>
                    </TableCell>
                    <TableCell>
                        <div className="relative flex items-center justify-center">
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
                                <EditComponent userid={user.id} email={user.email} password={user.password} user_role={user.id_role}/>
                            </span>
                            </Tooltip>
                            <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteComponent userid={user.id}/>
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