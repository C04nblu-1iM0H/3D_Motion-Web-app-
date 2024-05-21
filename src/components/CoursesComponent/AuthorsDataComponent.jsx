import {ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import SpinnerWithBackdrop from "../Button/Spinner";

export default function AuthorsDataComponent({username, surname, authore, onClose, startChat}) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const handleStartChat = () => {
        startChat(authore);
    };

    // const handleBackChat = () =>{
    //     setIsLoading(true);
    //     router.push(`/Profile/messager/${chatId}`);
    //     setIsLoading(false);
    // }
    return(
        <>
            {isLoading &&(<SpinnerWithBackdrop />)}
            <ModalHeader className="flex flex-col gap-1">Информация о пользователе</ModalHeader>
            <ModalBody>
                <section>
                    <figure className="flex flex-wrap items-center gap-x-8">
                        <div>
                            <FaUserCircle 
                                alt="avatar"
                                className="object-cover w-32 h-32"
                            />
                        </div>
                        <figcaption className="flex flex-col gap-y-2">
                            <h2>{`${username || '' } ${surname || ''}`}</h2>
                        </figcaption>
                    </figure>
                </section>
            </ModalBody>
            <ModalFooter>
                    <Button
                        endContent={<IoChatbubbleEllipsesSharp className="w-6 h-6"/>}
                        onClick={handleStartChat}
                        color="primary"
                        variant="ghost"
                    >
                        Начать чат
                    </Button>
                {/* {!chatId ?(
                    <Button
                        endContent={<IoChatbubbleEllipsesSharp className="w-6 h-6"/>}
                        onClick={handleStartChat}
                        color="primary"
                        variant="ghost"
                    >
                        Начать чат
                    </Button>
                ):(
                    <Button
                        endContent={<IoChatbubbleEllipsesSharp className="w-6 h-6"/>}
                        onClick={handleBackChat}
                        color="primary"
                        variant="ghost"
                    >
                        Продолжить чат
                    </Button>
                )

                } */}

                <Button color="danger" variant="ghost" onPress={onClose}>Close</Button>
            </ModalFooter>
        </>
    );
}