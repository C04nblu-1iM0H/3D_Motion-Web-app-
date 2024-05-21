import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function MessangerComponent({chats}){
    const path = usePathname();
    const currentIdUser = useSelector(state => state.user.id);
    console.log(currentIdUser);
    return(
        <div className="w-1/2 mx-auto mt-6">
            <ul className="w-full h-[calc(100vh-7rem)] border-2 border-zinc-600 rounded-md">
                {chats?.map( chat => (
                    <Link 
                        key={chat.id} 
                        className="flex flex-row justify-between items-center p-4 border-b-2 border-zinc-600 hover:bg-neutral-700" 
                        href={`${path}/${chat.id}`}
                    >
                        <figure className="flex items-center">
                            <FaUserCircle alt="avatar" className="object-cover w-12 h-12"/>
                            <figcaption className="flex flex-col ml-5">
                                <h3 className="text-base text-blue-400">{chat.surname} {chat.username}</h3>
                                {chat.id_user === currentIdUser ? (
                                    <p className="text-sm ">
                                        <span className="text-blue-400">Вы:</span> {chat.last_message}
                                    </p>
                                ):(
                                    <p className="text-sm">{chat.last_message}</p>
                                )}
                            </figcaption>
                        </figure>
                    </Link>
                ))}
            </ul>
        </div>
    );
}