'use client'
import {useSelector, useDispatch} from 'react-redux';
import {signIn} from "next-auth/react";
import { ToastContainer, toast } from 'react-toastify';
import Image from "next/image";

import Form from '@/components/Form/Form';
import FooterSingUp from '@/components/Footer/FooterSignUp';
import { validateForm } from '@/utils/validationForm';
import 'react-toastify/dist/ReactToastify.css';
import '../page.scss';
import { resetForm, setIsLoading } from "@/store/User";

export default function SinginPageForm() {
  const dispatch = useDispatch();
  const email = useSelector(state => state.regUser.email);
  const password = useSelector(state => state.regUser.password);
  const signInH1 = 'Вход', signInButtonText = 'Войти'

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const validationError = validateForm(email, password);
        if (validationError) {
          toast.error(validationError);
          return;
        }
        dispatch(setIsLoading(true));
        dispatch(resetForm());
        
        await signIn('credentials', {email, password});

        dispatch(setIsLoading(false));
      };


    return (
        <>
        <ToastContainer/>
        <section className='content relative z-10 w-screen'>
          <Image
            className=' svg share1_svg'
            src="/share1.svg"
            alt='icon'
            width={220}
            height={220}
            priority
          />
          <Image
              className=' svg share2_svg'
              src="/share2.svg"
              alt='icon'
              width={260}
              height={260}
              priority
          />
          <Image
            className=' svg share3_svg'
            src="/share3.svg"
            alt='icon'
            width={150}
            height={150}
            priority
          />
          <Image
              className=' svg share4_svg'
              src="/share4.svg"
              alt='icon'
              width={180}
              height={180}
              priority
          />
          <Form handleSubmit={handleSubmit} text={signInButtonText} head={signInH1}/>
        </section>
        <FooterSingUp />
      </>
    );
}