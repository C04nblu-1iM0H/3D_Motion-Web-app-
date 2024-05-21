import { Button, Tooltip } from "@nextui-org/react";
import { IoBookmarksOutline, IoBookmarks  } from "react-icons/io5";

export default function SubscribeButtonComponent({id, id_subscribe, handleEnableSubscribe, handleDisabledSubscribe}){
    return(
         <>
         { id_subscribe !== null 
             ?(
                <Tooltip
                    color="success"
                    content="Отписаться"
                >
                    <Button 
                        isIconOnly 
                        size="sm"
                        variant="light"
                        color="success"
                        onClick={()=>handleDisabledSubscribe(id)}
                    >
                        <IoBookmarks className='w-5 h-5'/>
                    </Button>
                </Tooltip>
             ):(
                <Tooltip
                    color="warning"
                    content="Подписаться"
                >
                    <Button 
                        isIconOnly 
                        size="sm"
                        variant="light"
                        color="warning"
                        onClick={()=>handleEnableSubscribe(id)}
                    >
                        <IoBookmarksOutline className='w-5 h-5'/>
                    </Button>
                </Tooltip>
            )
         }
     </>
    )
}