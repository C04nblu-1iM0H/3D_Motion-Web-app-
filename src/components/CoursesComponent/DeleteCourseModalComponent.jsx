import { setIsClose } from "@/store/courseSlice";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DeleteCourseModalComponent({handleDelete}){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const dispatch = useDispatch();
    return(
        <div className="flex flex-col gap-2">
            <ToastContainer />
            <Button color="danger" onPress={onOpen} className="max-w-fit" variant="solid" startContent={<RiDeleteBinLine/>}>Удалить курс</Button>
            <Modal 
                isOpen={isOpen} 
                placement="bottom-center"
                onOpenChange={onOpenChange} 
            >
                <ModalContent backdrop="blur">
                    {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Удаление курса</ModalHeader>
                        <ModalBody>
                        <p> 
                            Вы действительно хотите удалить весь курс?
                            При удалении всего курса удалятся и все уроки относящиеся к этому курсу.
                        </p>
                        </ModalBody>
                        <ModalFooter>
                        <Button color="danger" variant="solid" onPress={onClose} onClick={dispatch(setIsClose(false))}>
                            Закрыть
                        </Button>
                        <Button color="danger" variant="ghost" onClick={handleDelete}>
                            Удалить
                        </Button>
                        </ModalFooter>
                    </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}