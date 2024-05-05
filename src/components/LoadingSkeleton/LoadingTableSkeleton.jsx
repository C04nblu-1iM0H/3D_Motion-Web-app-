import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Skeleton, Tooltip } from '@nextui-org/react';
import { MdOutlineNumbers } from "react-icons/md";
import { LiaEdit } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function LoadingTableSkeleton() {
    return(
        <Table aria-label="Example table with custom cells">
            <TableHeader>
                <TableColumn><MdOutlineNumbers className="w-5 h-5"/></TableColumn>
                <TableColumn>Название урока</TableColumn>
                <TableColumn>Описание урока</TableColumn>
                <TableColumn>Дейсвтия</TableColumn>
            </TableHeader>
            <TableBody>
                {[1, 2, 3].map((item) => (
                <TableRow key={item}>
                    <TableCell>
                        <Skeleton className='h-3 w-3/5 rounded-lg' />
                    </TableCell>
                    <TableCell>
                        <Skeleton className='h-3 w-3/5 rounded-lg'/>
                    </TableCell>
                    <TableCell>
                        <Skeleton className='h-3 w-3/5 rounded-lg'/>
                    </TableCell>
                    <TableCell>
                        <div className="relative flex items-center gap-2">
                            <Tooltip content="Edit user">
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                    <LiaEdit className="w-5 h-5 text-warning-600"/>
                                </span>
                            </Tooltip>
                            <Tooltip color="danger" content="Delete user">
                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                    <RiDeleteBin6Line className="w-5 h-5 text-danger"/>
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