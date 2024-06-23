import {Textarea, 
        Button, 
        Tooltip,
        DropdownTrigger,
        Dropdown,
        DropdownMenu,
        DropdownItem,} from "@nextui-org/react";
import { FiSend } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useState } from "react";

import { MdOutlineModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdCancel } from "react-icons/md";

export default function MessageComponent({messages, 
        sendMessage, 
        handleChangeMessage, 
        hendleMessage, 
        handleDeletMessage, 
        handleEdithMessage
    }){
    const currentUserId = useSelector(state => state.user.id);
    const [editMode, setEditMode] = useState(null);
    const [editMessage, setEditMessage] = useState('');

    const handleEditClick = (message_id, text) => {
        setEditMode(message_id);
        setEditMessage(text);
    }

    const hendleSaveMessage = (e) => {
        e.preventDefault();
        handleEdithMessage(editMode, editMessage);
        setEditMode(null);
        setEditMessage('');
    }

    const handleCancelEdit = () => {
        setEditMode(null);
        setEditMessage('');
    };

    return(
        <section className="flex flex-col items-center container h-96 mt-10">
            <section className="flex flex-col w-3/4">
                <div className="flex flex-col justify-end h-[calc(100vh-19rem)] overflow-y-auto rounded-lg border-2 border-solid border-zinc-20">
                {messages.length > 0
                    ?messages.map(message =>(
                        <div 
                            key={message.id}
                            className={` w-full flex items-center my-3 ${message.id_user === currentUserId ? 'flex justify-end' : 'flex justify-start'}`}
                        >
                            <div 
                                className={`flex py-2 px-4 rounded-lg w-auto max-w-96
                                    ${message.id_user === currentUserId 
                                        ?'bg-primary text-white text-right' 
                                        :'bg-zinc-30 text-white text-left ml-4'
                                    }`
                                }
                            >
                                <div className="flex flex-col">
                                    <span  className="text-xs text-zinc-35 text-left">{message.username}</span>
                                    <span className="text-sm break-all">{message.text_message}</span>
                                </div>
                            </div>
                            {message.id_user === currentUserId  && (
                                <Dropdown
                                    className ="min-w-0 w-44"
                                >
                                    <DropdownTrigger>
                                        <Button isIconOnly size="sm" variant="light">
                                            <BsThreeDotsVertical className="w-4 h-4"/>
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Message options">
                                        <DropdownItem 
                                            className="text-right"
                                            startContent={<MdOutlineModeEdit className="text-primary-500 w-4 h-4"/>}
                                            onClick={() => handleEditClick(message.id, message.text_message)}
                                        >Редактировать</DropdownItem>
                                        <DropdownItem 
                                            className="text-right"
                                            startContent={<MdDelete className="text-danger-500 w-4 h-4"/>}
                                            onClick={() => handleDeletMessage(message.id)}
                                        >Удалить</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            )}
                        </div>
                    )
                ):(
                    <div className="flex justify-center items-center h-full">
                        <h1>Сообщений нет</h1>
                    </div>
                    
                )}
                </div>
                {editMode !== null ?(
                    <form onSubmit={hendleSaveMessage}>
                        <div className="bg-layout mt-2 py-2 border-t-2 border-x-2 border-zinc-20 rounded-t-lg">
                            <Textarea
                                maxRows={3}
                                variant="underlined"
                                labelPlacement="outside"
                                placeholder="Вы можете начать диалог с автором."
                                className="w-full"
                                value={editMessage}
                                onValueChange={(value) => setEditMessage(value)}
                            />
                        </div>
                        <div className="flex pb-2 justify-end px-3 bg-layout border-b-2 border-x-2 border-zinc-20 rounded-b-lg">
                            <Tooltip
                                color="primary"
                                content="Отправить"
                            >
                                <Button 
                                    isIconOnly 
                                    type="submit"
                                    color="primary" 
                                    variant="light"
                                    aria-label="send message">
                                    <FiSend className="w-6 h-6" />
                                </Button>
                            </Tooltip>
                            <Tooltip color="danger" content="Отмена">
                                <Button
                                    isIconOnly
                                    type="button"
                                    color="danger"
                                    variant="light"
                                    aria-label="Cancel edit"
                                    onClick={handleCancelEdit}>
                                    <MdCancel className="w-6 h-6" />
                                </Button>
                            </Tooltip>
                        </div>
                    </form>
                ):(
                    <form onSubmit={hendleMessage}>
                        <div className="bg-layout mt-2 py-2 border-t-2 border-x-2 border-zinc-20 rounded-t-lg">
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
                        <div className="flex pb-2 justify-end px-3 bg-layout border-b-2 border-x-2 border-zinc-20 rounded-b-lg">
                            <Tooltip
                                color="primary"
                                content="Отправить"
                            >
                                <Button 
                                    isIconOnly 
                                    type="submit"
                                    color="primary" 
                                    variant="light"
                                    aria-label="send message">
                                    <FiSend className="w-6 h-6" />
                                </Button>
                            </Tooltip>
                        </div>
                    </form>
                )}
            </section>
        </section>
    );
}