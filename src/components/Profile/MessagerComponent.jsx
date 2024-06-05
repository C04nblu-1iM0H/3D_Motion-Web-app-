import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function MessangerComponent({chats}){
    const path = usePathname();
    const currentIdUser = useSelector(state => state.user.id);
    return(
        <div className="w-1/2 mx-auto mt-6">
            <ul className="w-full h-[calc(100vh-7rem)] border-2 border-zinc-600 rounded-md">
                {chats?.map( chat => (
                    <Link 
                        key={chat.id} 
                        className="flex flex-row justify-between items-center p-4 border-b-2 border-zinc-600 hover:bg-neutral-700" 
                        href={`${path}/${chat.id_chat}`}
                    >
                        <figure className="flex items-center">
                            <FaUserCircle alt="avatar" className="object-cover w-12 h-12"/>
                            <figcaption className="flex flex-col ml-5">
                                <div className="flex">
                                    <h3 className="text-base text-blue-400 mr-2">
                                        {
                                            chat.surname === null && chat.username === null
                                            ? chat.email : `${chat.surname} ${chat.username}`
                                        } 
                                    </h3>
                                    <p>[{chat.course_name}]</p>
                                </div>
                                
                                {chat.id_user === currentIdUser ? (
                                    <p className="text-sm ">
                                        <span className="text-blue-400">Вы:</span> {chat.text_message}
                                    </p>
                                ):(
                                    <p className="text-sm">{chat.text_message}</p>
                                )}
                            </figcaption>
                        </figure>
                    </Link>
                ))}
            </ul>
        </div>
    );
}