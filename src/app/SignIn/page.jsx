'use client'
import {useSelector, useDispatch} from 'react-redux';
import {signIn} from "next-auth/react";
import { ToastContainer, toast } from 'react-toastify';
import Image from "next/image";

import Form from '@/components/Form/Form';
import { validateForm } from '@/utils/validationForm';
import 'react-toastify/dist/ReactToastify.css';
import './page.scss';
import { resetForm, setIsLoading } from "@/store/userSlice";
import MatteFon from '@/components/MatteFon/MatteFon';

export default function SinginPageForm() {
  const dispatch = useDispatch();
  const email = useSelector(state => state.regUser.email);
  const password = useSelector(state => state.regUser.password);
  const signInH1 = 'Вход', signInButtonText = 'Войти';

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const validationError = validateForm(email, password);
        if (validationError) {
          toast.error(validationError);
          return;
        }
        dispatch(setIsLoading(true));
        dispatch(resetForm());
        
        await signIn('credentials', {email, password, callbackUrl: process.env.NEXTAUTH_URL });

        dispatch(setIsLoading(false));
      };


    return (
        <>
        <ToastContainer/>
        <section className='content relative z-10 w-screen'>
          {[220, 260, 150, 180].map((size, index) => (
            <Image
              key={index}
              className={`svg share${index + 1}_svg`}
              src={`/share/share${index + 1}.svg`}
              alt='icon'
              width={size}
              height={size}
              priority
            />
          ))}
          <Form handleSubmit={handleSubmit} text={signInButtonText} head={signInH1}/>
        </section>
        <MatteFon />
      </>
    );
}