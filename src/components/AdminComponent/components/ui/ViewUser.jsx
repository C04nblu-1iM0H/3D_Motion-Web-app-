import { useSession } from "next-auth/react";
import {ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import SpinnerWithBackdrop from "@/components/Button/Spinner";
import { formatDate } from "@/utils/dateСonversion";


export default function ViewUser({email, username, surname, gender, data_birthday, telephone, onClose}) {
    const { data: session, status } = useSession();
    const data = formatDate(data_birthday);
    if(status === 'loading'){return <SpinnerWithBackdrop isLoading={true}/>;}
    const {image} = session.user;
    return(
        <>
            <ModalHeader className="flex flex-col gap-1">Информация о пользователе</ModalHeader>
            <ModalBody>
                <section>
                    <figure className="flex flex-wrap items-center gap-x-8">
                        <div>
                            {!image
                                ? <FaUserCircle 
                                    alt="avatar"
                                    className="object-cover w-32 h-32"
                                />
                                : <Image
                                    alt="avatar"
                                    className="object-cover"
                                    src={image}
                                    width={170}
                                    height={170}
                                    quality={100}
                                    priority={true}
                                />
                            }
                        </div>
                        <figcaption className="flex flex-col gap-y-2">
                            <h2>{`${username || '' } ${surname || ''}`}</h2>
                            <h3>{email}</h3>
                        </figcaption>
                    </figure>
                    <section className="mt-4 flex flex-col gap-y-3">
                        <p>Пол: <span>{gender}</span></p>
                        <p>Дата рождения: <span>{data}</span></p>
                        <p>Номер телефона: <span>{telephone}</span></p>
                    </section>
                </section>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="ghost" onPress={onClose}>Close</Button>
            </ModalFooter>
        </>
    );
}