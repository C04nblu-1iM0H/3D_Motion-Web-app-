import {Card, CardFooter} from "@nextui-org/react";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function ProfileAvatar({image, sassionName, email}) {
    const {userData} = useSelector(state => state.userProfile);
    const {name} = userData || {};
    return(
        <figure className="bg-layout-50 w-1/4 h-[21rem] flex flex-col items-center mr-6 rounded-lg">
            <Card 
                isFooterBlurred
                radius="lg"
                className="mt-4 border-none">
                {!image
                    ? <FaUserCircle 
                        alt="avatar"
                        className="object-cover w-[18rem] h-[17rem]"
                    />
                    : <Image
                        alt="avatar"
                        className="object-cover"
                        src={image}
                        width={270}
                        height={270}
                        quality={100}
                        priority={true}
                    />
                }
                <CardFooter className="flex justify-between items-center  before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                    <p className="text-tiny text-white/80">загрузить фото</p>
                    <label className="mb-[0.15rem]">
                        <input type="file" className="hidden"/>
                        <span className="text-tiny text-white bg-black/20 p-2 rounded-lg">
                            Click me
                        </span>
                    </label>
                </CardFooter>
            </Card>
            <figcaption className="mt-3" >{sassionName || name || email}</figcaption>
        </figure>   
    )
}