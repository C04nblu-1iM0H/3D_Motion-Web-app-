import { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Input, Divider, Button} from "@nextui-org/react";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { CiMail } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { setEmail, setIsVisible, setPassword } from '@/store/userSlice';
import { signIn } from 'next-auth/react';
import FormButton from '../Button/FormButton';


export default function Form({handleSubmit, text, head, isLoading}){
    const dispatch = useDispatch();
    const [isLoadingGoogle, setIsLoadingGoogle] = useState(false)
    const email = useSelector(state => state.user.email);
    const password = useSelector(state => state.user.password);
    const isVisible = useSelector(state => state.user.isVisible);
 
    const toggleVisibility = () => dispatch(setIsVisible(!isVisible));
    const handleEmail = (value) => dispatch(setEmail(value));
    const handlePassword = (value) => dispatch(setPassword(value));

    const handleGoogleSignIn = () => {
        setIsLoadingGoogle(true);
        signIn('google');
    };

    return(
        <form  
            onSubmit={handleSubmit} 
            className='bg-layout w-96 h-96 mt-52 mx-auto 
            border-solid border-1 border-layout rounded-xl 
            p-8 flex flex-col justify-evenly shadow-xl'
        >
            <h1>{head}</h1>
            <Divider/>
            <div>
                <Input
                type="text"
                name="email"
                label="Email"
                labelPlacement='outside'
                placeholder="you@example.com"
                value={email}
                onValueChange={handleEmail}
                autoComplete="email"
                startContent={<CiMail />}
                />
            </div>
            <div>
                <Input
                label="Password"
                labelPlacement="outside"
                type={isVisible ? "text" : "password"}
                value={password}
                onValueChange={handlePassword}
                autoComplete="current-password"
                placeholder="Enter your password"
                startContent={<RiLockPasswordLine />}
                endContent={(
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                        {isVisible ? <LuEyeOff/> : <LuEye />}
                    </button>
                )}
                />
            </div>
            <FormButton 
                text={text} 
                isLoading={isLoading} 
                isLoadingGoogle={isLoadingGoogle} 
                handle={handleGoogleSignIn}/>
        </form>
    )
}