import {Button} from "@nextui-org/react";

export default function LoginButton({text}){
    
    return <Button className='w-3/6 mt-3 mx-auto' color="primary" variant="shadow" type="submit"> {text} </Button >
}