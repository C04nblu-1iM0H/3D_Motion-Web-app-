'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify';

import {validateForm} from '../../utils/validationForm';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/app/components/Header/Header';
import './button.scss';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
        setTimeout(() => router.push('/pages/Login'),5000);
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
      <Header />
      <ToastContainer/>
      <form onSubmit={handleSubmit} >
        <div>
            <label htmlFor="email">Email:</label>
            <input
            type="text"
            id="email"
            value={email}
            onChange={handleEmail}
            autoComplete="email"
            />
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input
            type="password"
            id="password"
            value={password}
            onChange={handlePassword}
            autoComplete="current-password"
            />
        </div>
        <button type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Sign Up'}</button>
      </form>
    </>
  );
} 