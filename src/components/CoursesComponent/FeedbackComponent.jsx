import { useEffect, useRef } from 'react';
import {Textarea, Button, Tooltip} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";
import { ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function FeedbackComponent({handleMessage, handleChangeMessage, messages, sendMessage}) {
    const userId = useSelector(state => state.user.id);
    const session = useSession();
    const messagesContainerRef  = useRef(null);
    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);       
     
    return(
        <section className="flex flex-col items-center w-full h-96 mt-16">
            <ToastContainer />
            <section className="flex flex-col w-3/4">
                <div ref={messagesContainerRef} className="h-96 max-h-96 overflow-y-auto rounded-lg border-2 border-solid border-zinc-600">
                {messages.map(({id, feedback_text, user}) =>(
                        <div 
                            key={id}
                            className={` w-full my-3 ${user.id === userId ? 'flex justify-end' : 'flex justify-start'}`}>
                            <div 
                                className={`flex flex-col py-2 px-4 rounded-lg w-auto max-w-96
                                    ${user.id === userId 
                                        ?'bg-primary text-white text-right mr-4' 
                                        :'bg-default text-white text-left ml-4'
                                    }`
                                }
                            >
                                <span  className="text-xs text-stone-300">{user.email}</span>
                                <span className="text-sm">{feedback_text}</span>
                            </div>
                            
                        </div>
                    )
                )}
                </div>
                <form onSubmit={handleMessage} className="mb-32">
                    
                            {session.status !== 'unauthenticated' ?(
                                <>
                                    <div className="bg-layout mt-2 py-2 border-t-2 border-x-2 border-zinc-600 rounded-t-lg">
                                        <Textarea
                                            maxRows={3}
                                            variant="underlined"
                                            labelPlacement="outside"
                                            placeholder="Вы можете оставить свой отзыв написав его здесь."
                                            className="w-full"
                                            value={sendMessage}
                                            onValueChange={handleChangeMessage}
                                        />
                                    </div>
                                    <div className="flex pb-2 justify-end px-3 bg-layout border-b-2 border-x-2 border-zinc-600 rounded-b-lg">
                                        <Tooltip
                                            color="primary"
                                            content="Отправить"
                                        >
                                            <Button 
                                                isIconOnly 
                                                type="submit"
                                                color="primary" 
                                                variant="solid"
                                                aria-label="Take a photo">
                                                <FiSend className="w-6 h-6" />
                                            </Button>
                                        </Tooltip>
                                    </div>
                                </>
                            ):(
                                <>
                                    <div className="bg-layout mt-2 py-2 border-t-2 border-x-2 border-zinc-600 rounded-t-lg">
                                        <Textarea
                                            maxRows={3}
                                            variant="underlined"
                                            labelPlacement="outside"
                                            placeholder="Чтобы оставить свой отзыв зарегистрируйтесь."
                                            className="w-full"
                                            isDisabled
                                        />
                                    </div>
                                    <div className="flex pb-2 justify-end px-3 bg-layout border-b-2 border-x-2 border-zinc-600 rounded-b-lg">
                                        <Tooltip
                                            color="primary"
                                            content="Отправить"
                                        >
                                            <Button 
                                                isIconOnly 
                                                isDisabled
                                                color="primary" 
                                                variant="solid"
                                                aria-label="Take a photo">
                                                <FiSend className="w-6 h-6" />
                                            </Button>
                                        </Tooltip>
                                    </div>
                                </>
                            )}
                </form>
            </section>
        </section>
    );
}