import {Textarea, Button, Tooltip} from "@nextui-org/react";
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";

export default function MessageComponent({messages, sendMessage, handleChangeMessage, hendleMessage}){
    const currentUserId = useSelector(state => state.user.id);
    return(
        <section className="flex flex-col items-center container h-96 mt-10">
            <section className="flex flex-col w-3/4">
                <div className="flex flex-col justify-end h-[calc(100vh-19rem)] overflow-y-auto rounded-lg border-2 border-solid border-zinc-600">
                {messages.length > 0
                    ?messages.map(message =>(
                        <div 
                            key={message.id}
                            className={` w-full my-3 ${message.id_user === currentUserId ? 'flex justify-end' : 'flex justify-start'}`}
                        >
                            <div 
                                className={`flex flex-col py-2 px-4 rounded-lg w-auto max-w-96
                                    ${message.id_user === currentUserId 
                                        ?'bg-primary text-white text-right mr-4' 
                                        :'bg-default text-white text-left ml-4'
                                    }`
                                }
                            >
                                <span  className="text-xs text-stone-300">{message.surname} {message.username}</span>
                                <span className="text-sm">{message.text_message}</span>
                            </div>
                        </div>
                    )
                ):(
                    <div className="flex justify-center items-center h-full">
                        <h1>Сообщений нет</h1>
                    </div>
                    
                )}
                </div>
                <form onSubmit={hendleMessage}>
                    <div className="bg-layout mt-2 py-2 border-t-2 border-x-2 border-zinc-600 rounded-t-lg">
                            <Textarea
                                maxRows={3}
                                variant="underlined"
                                labelPlacement="outside"
                                placeholder="Вы можете начать диалог с автором."
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
                </form>
            </section>
        </section>
    );
}