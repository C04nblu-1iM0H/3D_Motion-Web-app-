'use client'
import { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { useTheme } from 'next-themes';

import Form from '@/components/Form/Form';
import { validateForm } from '@/utils/validationForm';
import 'react-toastify/dist/ReactToastify.css';
import './page.scss';
import { resetForm } from "@/store/userSlice";
import MatteFon from '@/components/MatteFon/MatteFon';
import { useMutation } from '@tanstack/react-query';

export default function SingupPageForm() {
  const [isLoading, setIsLoading] = useState(false)
  const {theme} = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const email = useSelector(state => state.user.email);
  const password = useSelector(state => state.user.password);
  const signInH1 = 'Регистрация', signUpButtonText = 'Зарегистрироваться';

  const mutation = useMutation({
      mutationFn: async ({ email, password }) => await axios.post('/api/signup', { email, password }),
      onMutate: () => setIsLoading(true),
      onSuccess: () => {
        dispatch(resetForm());
        setTimeout(() => router.push('/Signin'), 5000);
        toast.success("Вы успешно зарегистрировались 👍");
        toast.info("Вы будете перенаправлены на страницу входа");
      },
      onError: (error) => {
        if (error.response && error.response.status === 400) {
          toast.warning(
            <div>
              <span>{error.response.data.message}</span>
              <button className='btn-warning' onClick={() => router.push('/Signin')}>
                Перейти к входу
              </button>
            </div>,{ icon: "🤔" }
          );
        } else {
          toast.error("Произошла ошибка, перезапустите страницу и попробуйте заново");
        }
      },
      onSettled: () =>setIsLoading(false),
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateForm(email, password);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    mutation.mutate({ email, password });
  };


  return ( 
    <>
      <ToastContainer/>
      <section className='content relative z-10 w-screen'>
        {theme === 'dark'
          ?[220, 260, 150, 180].map((size, index) => (
            <Image
              key={index}
              className={`svg circle${index + 1}`}
              src={`/circle2/circle${index + 1}.svg`}
              alt='icon'
              width={size}
              height={size}
              priority
            />
          ))
          :[220, 260, 150, 180].map((size, index) => (
            <Image
              key={index}
              className={`svg circle${index + 1}`}
              src={`/circle/circle${index + 1}.svg`}
              alt='icon'
              width={size}
              height={size}
              priority
            />
          ))
        }
        <Form isLoading={isLoading} handleSubmit={handleSubmit} text={signUpButtonText} head={signInH1}/>
      </section>
      <MatteFon />
    </>
  );
} 