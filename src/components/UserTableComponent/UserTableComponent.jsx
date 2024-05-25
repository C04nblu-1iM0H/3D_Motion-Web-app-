import {
    Table, 
    TableHeader,
    TableColumn, 
    TableBody, 
    TableRow, 
    TableCell, 
    Chip, 
    Tooltip,
} from "@nextui-org/react";

import { MdOutlineNumbers } from "react-icons/md";
import SpinnerWithBackdrop from "@/components/Button/Spinner";
import ViewComponent from "@/app/usertable/view";
import EditComponent from "@/app/usertable/edit";
import DeleteComponent from "@/app/usertable/delete";

export default function UserTableComponent({users}) {
    return(
        <Table aria-label="Example table with custom cells">
            <TableHeader>
                <TableColumn><MdOutlineNumbers className="w-5 h-5 " /></TableColumn>
                <TableColumn>EMAIL</TableColumn>
                <TableColumn>PASSWORD</TableColumn>
                <TableColumn>ROLE</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody loadingContent={<SpinnerWithBackdrop label="Loading..." />}>
                {users.map((user, index) => (
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
    )
}