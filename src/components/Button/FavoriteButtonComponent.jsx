import { Button, Tooltip } from "@nextui-org/react";
import { IoIosHeartEmpty, IoMdHeart  } from "react-icons/io";

export default function FavoriteButtonComponent({id ,id_favorite, handleDisabledFavourites, handleEnableFavourites}) {
    return(
        <>
            { id_favorite !== null 
                ?(
                    <Tooltip
                        color="danger"
                        content="Избранное"
                    >
                        <Button 
                            isIconOnly 
                            size="sm"
                            variant="light"
                            color="danger"
                            onClick={()=>handleDisabledFavourites(id)}
                        >
                            <IoMdHeart className='w-5 h-5'/>
                        </Button>
                    </Tooltip>
                ):(
                    <Tooltip
                        color="danger"
                        content="Избранное"
                    >
                        <Button 
                            isIconOnly 
                            size="sm"
                            variant="light"
                            color="danger"
                            onClick={()=>handleEnableFavourites(id)}
                        >
                            <IoIosHeartEmpty className='w-5 h-5'/>
                        </Button>
                    </Tooltip>
                )
            }
        </>
    );
}