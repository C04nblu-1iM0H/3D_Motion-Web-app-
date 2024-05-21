import { useSelector } from "react-redux";
import {Card, CardFooter} from "@nextui-org/react";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function ProfilImage({image, sassionName, email}) {
    const pathname = usePathname();
    const {userData} = useSelector(state => state.userProfile);
    const {username, surname} = userData || {};
    const fullName = `${username || ''} ${surname || ''}`;
    return(
        <div className="pt-6 flex flex-col items-center border-b border-dashed border-zinc-600">
            <figure>
                <Card 
                    isFooterBlurred
                    radius="lg"
                    className="mt-4 border-none w-52 items-center">
                    {!image
                        ? <FaUserCircle 
                            alt="avatar"
                            className="object-cover w-44 h-44"
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
                    {pathname === '/Profile/setting_profile' && (
                        <CardFooter className="flex justify-between items-center mb-[-0.2rem] before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                            <p className="text-xs text-white/80">загрузить фото</p>
                            <label className="mb-[0.15rem]">
                                <input type="file" className="hidden"/>
                                <span className="text-white bg-black/20 p-2 rounded-lg text-xs">
                                    Click me
                                </span>
                            </label>
                        </CardFooter>
                    )}
                </Card>
                <figcaption className="flex flex-col items-center gap-y-1 mt-2 mb-4">
                    <h2>{sassionName || fullName || ''}</h2>
                    <p className="text-xs text-neutral-400">{email || ''}</p>
                </figcaption>
            </figure>
        </div>
    );
}