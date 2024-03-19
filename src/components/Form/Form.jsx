import {useSelector, useDispatch} from 'react-redux';
import {Input, Divider} from "@nextui-org/react";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { CiMail } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { setEmail, setIsVisible, setPassword } from '@/store/User';

import LoginButton from '../Button/Button';
import IsLoadingButton from '../Button/isLoadButton';

export default function Form({handleSubmit, text, head}){
    const dispatch = useDispatch();
    const email = useSelector(state => state.regUser.email);
    const password = useSelector(state => state.regUser.password);
    const isLoading = useSelector(state => state.regUser.isLoading);
    const isVisible = useSelector(state => state.regUser.isVisible);
 
    const toggleVisibility = () => dispatch(setIsVisible(!isVisible));
    const handleEmail = (value) => dispatch(setEmail(value));
    const handlePassword = (value) => dispatch(setPassword(value));

    return(
        <form  onSubmit={handleSubmit} className='bg-white w-96 h-96 mt-32 mx-auto border-solid border-1 rounded-xl p-8 flex flex-col justify-evenly shadow-xl'>
            <h1 className=''>{head}</h1>
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
            {!isLoading ? (<LoginButton text={text} />) : (<IsLoadingButton />)}
        </form>
    )
}