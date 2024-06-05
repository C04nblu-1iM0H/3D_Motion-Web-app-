import {Modal, ModalContent, Button, useDisclosure} from "@nextui-org/react";
import { FaRegEye } from "react-icons/fa6";
import ViewUser from "@/components/AdminComponent/components/ui/ViewUser";
import ViewNoDataUser from "@/components/AdminComponent/components/ui/ViewNoDataUser";

export default function ViewComponent({email, username, surname, gender, data_birthday, telephone}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return ( 
    <>
      <Button size="sm" variant="light" onPress={onOpen}><FaRegEye className="w-5 h-5 text-primary"/></Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >

        <ModalContent>
          {(onClose) => (
            <>
                {
                    username === null && surname === null && data_birthday === null && telephone === null
                    ?<ViewNoDataUser onClose={onClose}/>
                    :<ViewUser 
                        email={email} 
                        username={username} 
                        surname={surname} 
                        gender={gender} 
                        data_birthday={data_birthday} 
                        telephone={telephone} 
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