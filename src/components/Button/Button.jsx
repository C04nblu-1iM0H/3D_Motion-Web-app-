import {Button} from "@nextui-org/react";

export default function LoginButton({text}){
    
    return <Button className='w-9/12 mt-3 mx-auto' color="primary" variant="shadow" type="submit"> {text} </Button >
}