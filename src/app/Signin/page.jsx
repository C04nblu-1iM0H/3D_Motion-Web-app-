'use client'
import { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {signIn} from "next-auth/react";
import { ToastContainer, toast } from 'react-toastify';
import Image from "next/image";
import { useRouter } from 'next/navigation';

import Form from '@/components/Form/Form';
import { validateForm } from '@/utils/validationForm';
import 'react-toastify/dist/ReactToastify.css';
import './page.scss';
import { resetForm } from "@/store/userSlice";
import MatteFon from '@/components/MatteFon/MatteFon';
import { useMutation } from '@tanstack/react-query';

export default function SinginPageForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const email = useSelector(state => state.user.email);
  const password = useSelector(state => state.user.password);
  const signInH1 = 'Вход', signInButtonText = 'Войти';


  const mutation = useMutation({
    mutationFn: async ({email, password})=>{
      const result = await signIn('credentials', { email, password, redirect: false });
      if (result.error) {
        throw new Error(result.error);
      }
      return result;
    },
    onSuccess: ()=>{
      dispatch(resetForm());
      setIsLoading(false);
      router.push(process.env.NEXTAUTH_URL);
    },
    onError: (error)=>{
      setIsLoading(false);
      if (error) {
        toast.error(error.message || 'Ошибка входа');
      }
    }
  })


  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm(email, password);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsLoading(true);

    try {
      await mutation.mutateAsync({ email, password });
    } catch (error) {
      console.log(error);
    }
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
        <Form handleSubmit={handleSubmit} text={signInButtonText} head={signInH1} isLoading={isLoading}/>
      </section>
      <MatteFon />
    </>
  );
}