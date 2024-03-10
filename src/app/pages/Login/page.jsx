'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify';

import {validateForm} from '../../utils/validationForm';
import 'react-toastify/dist/ReactToastify.css';
import Header from "@/app/components/Header/Header";

export default function Login() {
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
          const response = await axios.post('/api/signin', {email, password});
          if (response.status === 200) {
            toast.success("Вы успешно авторизовались", { icon: "👍" });
            router.push('/profile'); // Перенаправление на страницу профиля
          }else{
            toast.error("Не удалось выполнить вход. Проверьте свои данные и попробуйте еще раз");
          }
        } catch (error) {
            console.error(error);
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
                <button type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Sign In'}</button>
            </form>
        </>

    );
}