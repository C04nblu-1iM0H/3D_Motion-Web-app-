import {Modal, ModalContent, Button, useDisclosure} from "@nextui-org/react";
import ViewNoDataUser from "@/components/AdminComponent/components/ui/ViewNoDataUser";
import AuthorsDataComponent from "./AuthorsDataComponent";
import { useSelector } from "react-redux";

export default function AuthoreComponent({dataAuthore, startChat}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const id_user = useSelector(state => state.user.id);
    const {username, surname, id_Authore} = dataAuthore;
    const currentUserIsAuthore = id_Authore !== id_user? `${surname} ${username}`: 'Вы'

    const handleOpen = () => {
        if (id_Authore !== id_user) {
            onOpen();
        }
    };
    return ( 
        <>  
            <div className="flex justify-end mt-4">
                <Button className="underline" size="sm" variant="light" onPress={handleOpen}>автор {currentUserIsAuthore}</Button>
            </div>
            <Modal 
                isOpen={isOpen} 
                onOpenChange={onOpenChange}
                placement="top-center"
            >

                <ModalContent>
                {(onClose) => (
                    <>
                        {
                            username === null && surname === null
                            ?<ViewNoDataUser authore={id_Authore} onClose={onClose}/>
                            :<AuthorsDataComponent  
                                username={username} 
                                surname={surname} 
                                authore={id_Authore}
                                startChat={startChat}
                                onClose={onClose}
                            /> 
                        }
                    </>
                )}
                </ModalContent>
            </Modal>
        </>
  );
}