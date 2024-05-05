import {Button} from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";

export default function  FormButton({text, isLoading, isLoadingGoogle, handle}) {
    return(
        <>
            {isLoading 
                ?
                <>
                    <Button  
                        className='w-9/12 mt-3 mx-auto' 
                        color="primary" 
                        variant="shadow" 
                        isLoading={isLoading} 
                        type="submit"
                    > 
                        {text} 
                    </Button >
                    <Button 
                        className='w-9/12 mt-3 mx-auto bg-Default' 
                        type="button" 
                        startContent={<FcGoogle />} 
                        isLoading={isLoadingGoogle} 
                        onClick={handle}
                        isDisabled
                    >
                        
                        Войти с помощью google
                    </Button >
                </>
                : isLoadingGoogle ?
                <>
                    <Button  
                        className='w-9/12 mt-3 mx-auto' 
                        color="primary" 
                        variant="shadow" 
                        isLoading={isLoading} 
                        type="submit"
                        isDisabled
                    >     
                        {text} 
                    </Button >
                    <Button 
                        className='w-9/12 mt-3 mx-auto bg-Default' 
                        type="button" 
                        startContent={<FcGoogle />} 
                        isLoading={isLoadingGoogle} 
                        onClick={handle}
                        >
                        Войти с помощью google
                    </Button >
                </>
                :
                <>
                    <Button  
                        className='w-9/12 mt-3 mx-auto' 
                        color="primary" 
                        variant="shadow" 
                        isLoading={isLoading} 
                        type="submit"> 
                        {text} 
                    </Button >
                    <Button 
                        className='w-9/12 mt-3 mx-auto bg-Default' 
                        type="button" 
                        startContent={<FcGoogle />} 
                        isLoading={isLoadingGoogle} 
                        onClick={handle}>
                        Войти с помощью google
                    </Button >
                </>
            }
        </>
    );
}