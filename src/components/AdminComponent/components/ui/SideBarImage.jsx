import { useSelector } from "react-redux";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

export default function SideBarImage({name, email, image}){
    const {username, surname, picture} = useSelector(state => state.userProfile.userData);
    return(
        <div className="pt-6 flex flex-col items-center border-b border-dashed border-zinc-600">
        <figure>
            {!picture && !image ? (
                <FaUserCircle className="object-cover w-44 h-44" />
            ) : (
                <Image
                    alt="avatar"
                    className="object-cover rounded-lg w-full h-auto"
                    src={picture || image}
                    width={170}
                    height={170}
                    quality={100}
                    priority={true}
                />
            )}
            <figcaption className="flex flex-col items-center gap-y-1 mt-2 mb-4">
                <h2>{name || `${username} ${surname}`}</h2>
                <p className="text-xs text-neutral-400">{email}</p>
            </figcaption>
        </figure>
    </div>
    );
}