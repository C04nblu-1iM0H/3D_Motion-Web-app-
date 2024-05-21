import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Skeleton } from '@nextui-org/react';
import { MdOutlineNumbers } from "react-icons/md";

export default function LoadingTableLessonsSkeleton() {
    return(
        <Table aria-label="Example table with custom cells">
            <TableHeader>
                <TableColumn><MdOutlineNumbers className="w-5 h-5"/></TableColumn>
                <TableColumn>Название урока</TableColumn>
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
                </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}