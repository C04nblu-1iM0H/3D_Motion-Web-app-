'use client'
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Image from "next/image";

import Form from '@/components/Form/Form';
import FooterSingUp from '@/components/Footer/FooterSignUp';
import { validateForm } from '@/utils/validationForm';
import 'react-toastify/dist/ReactToastify.css';
import '../page.scss';
import { resetForm, setIsLoading } from "@/store/User";


export default function SingupPageForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const email = useSelector(state => state.regUser.email);
  const password = useSelector(state => state.regUser.password);
  const signInH1 = 'Регистрация', signUpButtonText = 'Зарегистрироваться';

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('email - ',email);
    const validationError = validateForm(email, password);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    dispatch(setIsLoading(true));
    try {
      const response = await axios.post('/api/signup', {email, password});
      if (response.status === 200) {
        dispatch(resetForm());
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
      dispatch(setIsLoading(false)); 
    }
  };


  return ( 
    <>
      <ToastContainer/>
      <section className='content relative z-10 w-screen'>
        {[220, 260, 150, 180].map((size, index) => (
          <Image
            key={index}
            className={`svg circle${index + 1}`}
            src={`/circle${index % 2 === 0 ? '' : '2'}.svg`}
            alt='icon'
            width={size}
            height={size}
            priority
          />
        ))}
        <Form handleSubmit={handleSubmit} text={signUpButtonText} head={signInH1}/>
      </section>
      <FooterSingUp />
    </>
  );
} 