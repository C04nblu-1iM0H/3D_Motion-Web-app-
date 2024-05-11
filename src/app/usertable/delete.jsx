import { Button } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from 'axios';
import { toast } from 'react-toastify';
import { RiDeleteBin6Line } from "react-icons/ri";
import 'react-toastify/dist/ReactToastify.css';


export default function DeleteComponent({userid}){
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: () => axios.delete('/api/crud', { data: { userid } }),
        onSuccess: () => {
            toast.success('Данные успешно удалены');
            queryClient.invalidateQueries('userData');
        },
        onError: (error) => {
            if(error) toast.error("Failed to delete user");
        } 
    })

    const handleDeleteClick = async (e) =>{
        e.preventDefault();
        mutation.mutate();
    }
    return(
        <>  
            <Button size="sm" variant="light" onClick={handleDeleteClick}><RiDeleteBin6Line className="w-5 h-5 text-danger"/></Button>
        </>


    )
}