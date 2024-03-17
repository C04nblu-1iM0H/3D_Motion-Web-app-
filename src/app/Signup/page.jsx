'use client'
import { useState } from 'react';
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify';
import {Input, Button, Divider} from "@nextui-org/react";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { CiMail } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { useRouter } from 'next/navigation';
import Image from "next/image";

import FooterSingUp from '@/components/Footer/FooterSignUp';
import {validateForm} from '../../utils/validationForm';
import 'react-toastify/dist/ReactToastify.css';
import './button.scss';
import './page.scss';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);


  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm(email, password);
    if (validationError) {
      toast.error(validationError);
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post('/api/signup', {email, password});
      if (response.status === 200) {
        toast.success("Вы успешно зарегистрировались", { icon: "👍" });
        setTimeout(() => router.push('/Signin'),5000);
        toast.info("Вы будете перенаправлены на страницу входа");
      }else{
        toast.error("Failed to sign up");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.warning(
          <div>
            <span>{error.response.data.message}</span>
            <button 
              className='btn-warning' 
              onClick={() => router.push('/pages/Login')}
            >Перейти к входу</button>
          </div>,
          {icon: "🤔",}
        );
      } else {
        return;
      }
    } finally {
      setIsLoading(false); 
    }
  };


  return ( 
    <>
      <ToastContainer/>
      <section className='content relative z-10 w-screen'>
        <Image
          className=' svg circle_svg'
          src="/circle.svg"
          alt='icon'
          width={220}
          height={220}
          priority
        />
        <Image
            className=' svg circle2'
            src="/circle2.svg"
            alt='icon'
            width={260}
            height={260}
            priority
        />
        <Image
          className=' svg circle3'
          src="/circle.svg"
          alt='icon'
          width={150}
          height={150}
          priority
        />
        <Image
            className=' svg circle4'
            src="/circle2.svg"
            alt='icon'
            width={180}
            height={180}
            priority
        />
        <form  onSubmit={handleSubmit} className='bg-white w-1/4 h-96 mt-32 mx-auto border-solid border-1 rounded-xl p-8 flex flex-col justify-evenly shadow-xl'>
          <h1 className=''>Sign Up</h1>
          <Divider/>
          <div>
              <Input
                key='outside'
                type="email"
                label="Email"
                labelPlacement='outside'
                placeholder="you@example.com"
                value={email}
                onChange={handleEmail}
                autoComplete="email"
                startContent={<CiMail />}
              />
          </div>
          <div>
              <Input
                key="outside"
                label="Password"
                labelPlacement="outside"
                type={isVisible ? "text" : "password"}
                value={password}
                onChange={handlePassword}
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
          {!isLoading ? 
            <Button  
              className='w-1/3 mt-3 mx-auto'
              color="primary"
              variant="shadow"
              type="submit" 
            >
              SignUp
            </Button >
            :
            <Button 
              color="primary" 
              isLoading
              className='w-1/3 mt-3 mx-auto'
            >
              Loading
            </Button>
          }

        </form>
      </section>
      <FooterSingUp />
    </>
  );
} 