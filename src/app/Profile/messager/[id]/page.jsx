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
            const response = await axios.get('/api/message', {
                headers:{id},
                signal
            });
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
    })

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

    if(status === 'loading'){return <SpinnerWithBackdrop isLoading={true}/>;}
    if(status === 'unauthenticated'){return redirect('/Signin');}
    const {name, email, image} = session.user;
    return(
        <section className="w-screen">
            <section className="flex gap-x-5 flex-wrap">
                <ProfileAvatar image={image} sassionName={name} email={email}/>
                <MessageComponent 
                    messages={messages} 
                    sendMessage={sendMessage}
                    handleChangeMessage={handleChangeMessage}
                    hendleMessage={hendleMessage}
                />
            </section>
        </section>
    );
}