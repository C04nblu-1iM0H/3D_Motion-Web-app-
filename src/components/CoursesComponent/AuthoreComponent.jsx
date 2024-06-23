import {Modal, ModalContent, Button, useDisclosure} from "@nextui-org/react";
import ViewNoDataUser from "@/components/AdminComponent/components/ui/ViewNoDataUser";
import AuthorsDataComponent from "./AuthorsDataComponent";
import { useSelector } from "react-redux";

export default function AuthoreComponent({dataAuthore, startChat, idChat}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const current_user = useSelector(state => state.user.id);
    const {username, surname, authore, id_authore} = dataAuthore;

    const currentUserIsAuthore = authore !== current_user ? `${surname} ${username}`: 'Вы'
    const handleOpen = () => {
        if (authore !== current_user) {
            onOpen();
        }
    };
    return ( 
        <>  
            <div className="flex justify-end mt-4 w-4/5 mx-auto">
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
                            ?<ViewNoDataUser authore={authore} onClose={onClose}/>
                            :<AuthorsDataComponent  
                                username={username} 
                                surname={surname} 
                                id_authore={id_authore}
                                startChat={startChat}
                                onClose={onClose}
                                idChat={idChat}
                            /> 
                        }
                    </>
                )}
                </ModalContent>
            </Modal>
        </>
  );
}