import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";

import { toast } from 'react-toastify';
import FeedbackComponent from "@/components/CoursesComponent/FeedbackComponent";
import { validateSendMessage } from "@/utils/validationForm";
import LoadingFeedback from "@/components/LoadingSkeleton/LoadingFeedback";

export default function Feedback(){
    const {id} = useParams();
    const [sendMessage, setSendMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const userId = useSelector(state => state.user.id);
    const queryClient = useQueryClient()


    const {data, isSuccess, isError, isPending} = useQuery({
        queryKey:['getFeedbackMessage'],
        queryFn: async ({signal}) => {
            const response = await axios.get(`/api/feedbackCourse?id=${id}`,{signal});
            return response.data.getAllFeedback;
            
        }
    })

    useEffect(()=>{
        if(isSuccess && data !== undefined){
            setMessages(data)
        }
    },[isSuccess, data])

    const mutation = useMutation({
        mutationFn: async({sendMessage, userId, id}) => await axios.post('/api/feedbackCourse', {sendMessage, userId, id}),
        onSuccess: ()=>{
            queryClient.invalidateQueries({ queryKey: ['getFeedbackMessage'] });
            setSendMessage('');
        }
    })

    const handleChangeMessage = (value) => setSendMessage(value);

    const handleMessage = async(e) => {
        e.preventDefault();
        const validationError = validateSendMessage(sendMessage);
        if (validationError || !id) {
            toast.error(validationError);
            return;
        }
        mutation.mutateAsync({sendMessage, userId, id})
    }

    if(isPending) return <LoadingFeedback />

    return(
        <FeedbackComponent 
            messages={messages}
            sendMessage={sendMessage}
            handleMessage={handleMessage} 
            handleChangeMessage={handleChangeMessage}
        />
    )
}