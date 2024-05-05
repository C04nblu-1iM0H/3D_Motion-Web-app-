import { Button } from "@nextui-org/react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { RiDeleteBin6Line } from "react-icons/ri";
import 'react-toastify/dist/ReactToastify.css';

export default function DeleteComponent({userid, onSuccess}){

    const handleDeleteClick = async (e) =>{
        e.preventDefault();
        try {
            console.log(userid);
            const deleteUserPromise = toast.promise(
                axios.delete('/api/googlecrud', { data: { userid } }),
                {
                    pending: "Подождите пожалуйста...",
                    success: "Данные успешно удалены",
                    error: "Произошла ошибка, попробуйте ещё раз"
                }
            );
        const response = await deleteUserPromise;
            if(response.status === 200){
                onSuccess();
            }
        } catch (error) {
            toast.error("Failed to sign up");
        }
    }
    return(
        <>  
            <Button size="sm" variant="light" onClick={handleDeleteClick}><RiDeleteBin6Line className="w-5 h-5 text-danger"/></Button>
        </>


    )
}