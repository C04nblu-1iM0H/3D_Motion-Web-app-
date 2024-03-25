import {Button} from "@nextui-org/react";

export default function GroupButtonProfile({setState}){
    const handleClick = () =>{
        setState(true)
    }

    return(
        <div className="flex">
            <Button color="success" className="w-full mr-1"> Сохранить </Button>
            <Button color="danger" className="w-full ml-1" onClick={handleClick}>Выйти</Button>  
        </div>
    )
}