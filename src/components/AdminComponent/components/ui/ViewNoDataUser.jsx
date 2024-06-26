import {ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import Image from "next/image";

export default function ViewNoDataUser({onClose, authore}){
    console.log(authore);
    return(
        <>
            <ModalHeader className="flex flex-col gap-1">Пользователь решил остаться ананимом</ModalHeader>
            <ModalBody>
                <Image
                    alt="no data"
                    src={'/adminpanel/no_data.svg'}
                    width={500}
                    height={500}
                    quality={100}
                    priority={true}
                />
            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="ghost" onPress={onClose}>Close</Button>
            </ModalFooter>
        </>
    )
}