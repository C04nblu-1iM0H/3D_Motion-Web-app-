'use client'
import SpinnerWithBackdrop from "@/components/Button/Spinner";
import MessageComponent from "@/components/Profile/MessageComponent";
import ProfileAvatar from "@/components/ProfileAvatar/ProfileAvatar";
import { validateSendMessage } from "@/utils/validationForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Message(){
    const {id} = useParams();
    const queryClient = useQueryClient();
    const [messages, setMessages] = useState([]);
    const [sendMessage, setSendMessage] = useState('');
    const { data: session, status } = useSession();
    const id_user = useSelector(state => state.user.id);

    const {data, isSuccess, isError, isPending} = useQuery({
        queryKey:['getChatMessage', id],
        queryFn: async ({signal}) => {
            const response = await axios.get(`/api/message?id=${id}`, {signal});
            return response.data.getChatMessage
        },
    });

    useEffect(()=>{
        if(isSuccess){
            setMessages(data);
        }
    },[isSuccess, data])

    const mutation = useMutation({
        mutationFn: async ({sendMessage, id_user, id}) => await axios.post('/api/message', {sendMessage, id_user, id}),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey:['getChatMessage', id]});
            queryClient.invalidateQueries({queryKey:['getMessages']});
            setSendMessage('');
        }
    });

    const mutationDelMessage = useMutation({
        mutationFn: async({message_id}) => await axios.delete(`/api/message?message_id=${message_id}`),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey:['getChatMessage', id]});
            queryClient.invalidateQueries({queryKey:['getMessages']});
        }
    });
    const mutationEditMessage = useMutation({
        mutationFn: async({message_id, message}) => await axios.put('/api/message', {message_id, message}),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey:['getChatMessage', id]});
            queryClient.invalidateQueries({queryKey:['getMessages']});
        }
    });

    const handleChangeMessage = (value) => setSendMessage(value);

    const hendleMessage = async(e) =>{
        e.preventDefault();
        const validationError = validateSendMessage(sendMessage);
        if (validationError || !id) {
            toast.error(validationError);
            return;
        }
        mutation.mutateAsync({sendMessage, id_user, id});
    }

    const handleDeletMessage = async (message_id) => {
        if(!message_id) return;
        mutationDelMessage.mutateAsync({message_id});
    }

    const handleEdithMessage = async (message_id, message) => {
        const validationError = validateSendMessage(message);
        if (validationError) {
            toast.error(validationError);
            return;
        }
        mutationEditMessage.mutateAsync({message_id, message})
    }
    
    
    if(isError) console.error('Не могу вывести сообщение');
    if(status === 'loading'){return <SpinnerWithBackdrop isLoading={true}/>;}
    if(status === 'unauthenticated'){return redirect('/Signin');}
    
    const {name, email, image} = session.user;
    return(
        <section className="w-screen">
            <section className="flex">
                <ProfileAvatar image={image} sassionName={name} email={email}/>
                <MessageComponent 
                    messages={messages} 
                    sendMessage={sendMessage}
                    handleChangeMessage={handleChangeMessage}
                    hendleMessage={hendleMessage}
                    handleDeletMessage={handleDeletMessage}
                    handleEdithMessage={handleEdithMessage}
                />
            </section>
        </section>
    );
}