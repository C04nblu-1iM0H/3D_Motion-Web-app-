import {ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import { FaUserCircle } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

export default function AuthorsDataComponent({username, surname, authore, onClose, startChat}) {
    const handleStartChat = () => {
        startChat(authore);
    };
    return(
        <>
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
                <Button color="danger" variant="ghost" onPress={onClose}>Close</Button>
            </ModalFooter>
        </>
    );
}