import {useSelector, useDispatch} from 'react-redux';
import {Input, Divider, Button} from "@nextui-org/react";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { CiMail } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { RiLockPasswordLine } from "react-icons/ri";
import { setEmail, setIsVisible, setPassword, setIsLoadingGoogle } from '@/store/userSlice';
import { signIn } from 'next-auth/react';

export default function Form({handleSubmit, text, head}){
    const dispatch = useDispatch();
    const email = useSelector(state => state.regUser.email);
    const password = useSelector(state => state.regUser.password);
    const isLoading = useSelector(state => state.regUser.isLoading);
    const isVisible = useSelector(state => state.regUser.isVisible);
    const isLoadingGoogle = useSelector(state => state.regUser.isLoadingGoogle);
 
    const toggleVisibility = () => dispatch(setIsVisible(!isVisible));
    const handleEmail = (value) => dispatch(setEmail(value));
    const handlePassword = (value) => dispatch(setPassword(value));

    const handleGoogleSignIn = () => {
        dispatch(setIsLoadingGoogle(true));
        signIn('google', { callbackUrl: process.env.NEXTAUTH_URL });
    };

    return(
        <form  onSubmit={handleSubmit} className='bg-layout w-96 h-96 mt-52 mx-auto border-solid border-1 border-layout rounded-xl p-8 flex flex-col justify-evenly shadow-xl'>
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
                endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? <LuEyeOff/> : <LuEye />}
                    </button>
                }
                />
            </div>
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
                onClick={handleGoogleSignIn}
            >
                Войти с помощью google
            </Button >
        </form>
    )
}